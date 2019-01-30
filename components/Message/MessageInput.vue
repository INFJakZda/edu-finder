<template>
  <div>
    <div class="ui divider" />
    <form class="ui reply form">
      <div class="field">
        <textarea
          v-model="currentMessage" />
      </div>
      <Button 
        :modifiers="['primary', 'large', 'right', 'floated']" 
        icon="edit" 
        text="Wyślij wiadomość"
        @submit.prevent
        @click="sendMessage()" />
    </form>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    userId: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      required: false,
      default: () => ''
    },
    submitCallback: {
      type: Function,
      required: false,
      default: () => new Function()
    }
  },
  data: function() {
    return {
      currentMessage: this.model
    }
  },
  watch: {
    currentMessage(value) {
      this.$emit('update:model', value)
    }
  },
  methods: {
    sendMessage() {
      let messageData = this.createMessage(this.currentMessage, this.userId)
      this.$axios.$post('/api/message', messageData)
      this.submitCallback()
      this.clearMessage()
    },
    clearMessage() {
      this.currentMessage = ''
    },
    createMessage(message, receiverId) {
      return {
        id: 0,
        senderId: this.$auth.user.id,
        sender: {},
        receiverId: receiverId,
        receiver: {},
        text: message,
        timestamp: new Date().toISOString()
      }
    }
  }
}
</script>
