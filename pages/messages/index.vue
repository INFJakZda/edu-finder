<template>
  <ConversationList :conversations="conversations" />
</template>

<script>
import ConversationList from '~/components/Message/ConversationList.vue'

export default {
  components: { ConversationList },
  data: function() {
    return {
      conversations: [],
      fetchError: false
    }
  },
  computed: {
    getConversationList() {
      return this.conversations
    }
  },
  created() {
    this.$axios
      .$get('/api/message/conversations')
      .then(response => {
        this.conversations = response
      })
      .catch(() => {
        this.fetchError = true
      })
  }
}
</script>
