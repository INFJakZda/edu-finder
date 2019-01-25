<template>
  <div>
    <div 
      v-for="(message, key) in messages" 
      :key="key">
      <Message
        :date="message.timestamp"
        :message="message.text" />
    </div>
    <MessageInput 
      :user-id="recipientUserId" 
      :model="currentMessage"
      :submit-callback="rerender()" />
  </div>
</template>

<script>
import Message from '~/components/Message/Message.vue'
import MessageInput from '~/components/Message/MessageInput.vue'

export default {
  components: {
    Message,
    MessageInput
  },
  data: function() {
    return {
      messages: [],
      currentMessage: '',
      recipientUserId: undefined,
      fetchError: false
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.recipientUserId = parseInt(this.$route.params.id, 10)
    this.fetchConversation()
  },
  methods: {
    sendMessage() {
      return null
    },
    rerender() {
      this.fetchConversation()
    },
    fetchConversation(size = 20, index = 0) {
      this.$axios
        .$get(
          `/api/message/with/${
            this.recipientUserId
          }?size=${size}&index=${index}`
        )
        .then(response => {
          this.messages = response.reverse()
        })
        .catch(() => {
          this.fetchError = true
        })
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>
