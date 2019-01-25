<template>
  <sui-list-item>
    <div class="item">
      <div class="right floated content">
        <sui-button
          basic 
          negative
          size="mini"
          @click.native="toggle">Usuń</sui-button>
      </div>
    </div>
    <sui-list-icon 
      name="university" 
      size="large" 
      vertical-align="middle" />
    <sui-list-content>
      <sui-list-header>{{ education.university ? education.university.name : '' }}</sui-list-header>
      <sui-list-description>
        <span v-if="education.yearEnd">{{ education.yearStart }} - {{ education.yearEnd }},</span>
        <span v-else>Rozpoczęcie: {{ education.yearStart }},</span>
        <span>{{ education.department ? education.department.name : '' }}</span>
      </sui-list-description>
    </sui-list-content>
    <Modal 
      :open="open"
      @deletemodal="toggle"
      @deleteitem="deleteDepartment(education.id)">
      {{ education.university ? education.university.name : '' }}, {{ education.department ? education.department.name : '' }}
      <span v-if="education.yearEnd">{{ education.yearStart }} - {{ education.yearEnd }},</span>
      <span v-else>Rozpoczęcie: {{ education.yearStart }},</span>
    </Modal>
  </sui-list-item>
</template>

<script>
import Modal from '~/components/Settings/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    education: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    deleteDepartment(id) {
      this.toggle()
      this.$axios
        .$delete(`/api/educationEntry/${id}`)
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
