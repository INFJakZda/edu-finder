<template>
  <div>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/"
        class="section">Strona główna</nuxt-link>
      <i class="right angle icon divider"/>
      <nuxt-link 
        to="/messages" 
        class="section">Wiadomości</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">Konwersacja</div>
    </div>
    <div v-if="messages.length !== 0">
      <div 
        v-for="(message, key) in messages" 
        :key="key">
        <Message
          :avatar_id="avatarId(message)"
          :date="message.timestamp"
          :message="message.text" />
      </div>
    </div>
    <div v-else>
      <div class="ui placeholder segment">
        <div class="ui icon header">
          <i class="envelope outline icon"/>
          Brak historii konwersacji z tym użytkownikiem.
        </div>
      </div>
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
    this.recipientUserId = parseInt(this.$route.params.id, 10)
    this.fetchConversation()
  },
  methods: {
    avatarId(message) {
      if (message.sender === null) {
        return null
      }

      return message.sender.avatarId
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
