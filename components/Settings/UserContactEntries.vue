<template>
  <div>
    <h4 class="ui dividing header">Zdefiniuj swoje kontakty!</h4>
    <div 
      v-for="contact in contacts"
      :key="contact.value"
      class="ui fluid action labeled input dev-contact">
      <div  
        class="ui label">
        <i 
          :class="contact.text === 'Inne' ? 'user circle' : contact.text.toLowerCase()"
          class="icon"/>
        {{ contact.text }}
      </div>
      <input
        v-model="contact.description"
        placeholder="dodaj konto" 
        type="text"
        @keyup="contact.originalDesc === contact.description ? contact.change = 0 : contact.change = 1" >
      <sui-button
        v-if="contact.filled"
        class="dev-button-delete"
        basic 
        negative
        size="mini"
        @click="deleteContact(contact)">Usuń</sui-button>
      <sui-button
        v-else
        class="dev-button-delete"
        basic 
        positive
        size="mini"
        @click="addContact(contact)">Dodaj</sui-button>
      <sui-button
        v-if="contact.change && contact.filled"
        class="dev-button-delete"
        basic 
        color="yellow"
        size="mini">Zmień</sui-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contacts: []
    }
  },
  watch: {
    user: function() {
      this.onInit()
      console.log('sfdsf')
    }
  },
  created() {
    this.onInit()
  },
  methods: {
    onInit() {
      this.contacts = this.user.availableContactTypes.slice()
      this.contacts.forEach(avail => {
        avail.description = ''
        avail.change = 0
        avail.originalDesc = ''
        avail.filled = 0
        this.user.contactEntries.forEach(cont => {
          if (cont.contactTypeId == +avail.value) {
            avail.description = cont.text
            avail.originalDesc = cont.text
            avail.filled = 1
            avail.contactId = cont.id
          }
        })
      })
    },
    addContact(contact) {
      this.$axios
        .$post('/api/contactEntry', {
          id: 0,
          userId: +this.$store.state.auth.user.id,
          user: {},
          contactTypeId: +contact.value,
          contactType: {},
          text: contact.description
        })
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    },
    deleteContact(contact) {
      this.$axios
        .$delete(`/api/contactEntry/${contact.contactId}`)
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.dev-contact {
  margin: 20px 0;
}
</style>
