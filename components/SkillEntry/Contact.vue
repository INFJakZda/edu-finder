<template>
  <div>
    <h4 class="ui dividing header">Zdefiniowane kontakty:</h4>
    <div class="ui relaxed divided list">
      <div 
        v-for="contact in user.contactEntries" 
        :key="contact.id"
        class="item">
        <i
          :class="contact.contactType.name === 'Email' ? 'mail' : contact.contactType.name === 'Skype' ? 'skype' : 'phone'"
          class="large middle aligned icon"/>
        <div class="content">
          <div class="header">{{ contact.text }}</div>
          <div class="description">{{ contact.contactType.name }}</div>
        </div>
      </div>
    </div>

    <sui-segment v-if="user.contactEntries.length === 0">
      <h5 
        class="ui header">Nie ma zdefiniowanych kontaktów</h5>
    </sui-segment>
    
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.dev-contact {
  margin: 20px 0;
}
</style>
