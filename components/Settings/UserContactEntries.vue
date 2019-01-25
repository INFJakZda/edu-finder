<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="addContact">
      <h4 class="ui dividing header">Zdefiniuj swoje kontakty!</h4>

      <div class="two fields">

        <div class="field">
          <label>Typ</label>
          <sui-dropdown
            v-model="type"
            :options="user.availableContactTypes"
            placeholder="Wybierz rodzaj kontaktu"
            selection
          />
        </div>

        <div class="field">
          <label>Nazwa / numer</label>
          <input
            v-model="contact"
            :type="type === '1' ? 'number' : type === '2' ? 'email' : 'text'" 
            placeholder="dodaj konto">
        </div>
      </div>
      
      <button 
        :class="{disabled: !(contact && type)}" 
        class="ui green button"
        tabindex="0"
      >Dodaj</button>
    </form>

    <h4 class="ui dividing header">Zdefiniowane kontakty:</h4>
    <div class="ui large relaxed divided list">
      <Contact
        v-for="item in user.contactEntries" 
        :key="item.id"
        :contact="item"
        @refreshdev="$emit('refreshdev')"/>
    </div>
    <sui-segment v-if="user.contactEntries.length === 0">
      <h5 
        class="ui header">Nie dodałeś żadnego kontaktu</h5>
    </sui-segment>
    

  </div>
</template>

<script>
import Contact from '~/components/Settings/Items/Contact.vue'

export default {
  components: {
    Contact
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contact: '',
      type: null
    }
  },
  watch: {
    type: function() {
      this.contact = ''
    }
  },
  methods: {
    addContact() {
      this.$axios
        .$post('/api/contactEntry', {
          id: 0,
          userId: +this.$auth.user.id,
          user: {},
          contactTypeId: +this.type,
          contactType: {},
          text: this.contact
        })
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    },
    changeContact(contact) {
      this.$axios
        .$put(`/api/contactEntry/${contact.contactId}`, {
          id: contact.contactId,
          userId: +this.$auth.user.id,
          user: {},
          contactTypeId: +contact.value,
          contactType: {},
          text: contact.description
        })
        .then(() => {
          this.$emit('refreshdev')
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
