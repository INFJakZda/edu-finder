<template>
  <div class="item">
    <div class="right floated content">
      <sui-button
        basic 
        negative
        size="mini"
        @click.native="toggle">Usuń</sui-button>
    </div>
    <i
      :class="contact.contactType.name === 'Email' ? 'mail' : contact.contactType.name === 'Skype' ? 'skype' : 'phone'"
      class="big middle aligned icon"/>
    <div class="content">
      <div class="header">{{ contact.text }}</div>
      <div class="description">{{ contact.contactType.name }}</div>
    </div>

    <Modal 
      :open="open"
      @deletemodal="toggle"
      @deleteitem="deleteContact()">
      {{ contact.contactType.name }} - {{ contact.text }}
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/Settings/Items/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    classObject: function() {
      return {
        phone: this.contact.text === 'Email',
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    deleteContact() {
      this.$axios
        .$delete(`/api/contactEntry/${this.contact.id}`)
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
