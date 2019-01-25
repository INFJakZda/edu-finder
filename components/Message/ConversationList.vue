<template>
  <div>
    <h2>Skrzynka odbiorcza</h2>
    <div 
      v-for="(conversation, key) in conversations" 
      :key="key" 
      class="ui list">
      <div class="item" >
        <div class="right floated content">
          <div 
            class="ui button" 
            @click.prevent="() => $router.push(`/messages/conversations/${getOtherUser(conversation).id}`)">Odpowiedz</div>
        </div>
        <div class="content">
          <a 
            class="header" 
            @click.prevent="() => $router.push(`/users/${getOtherUser(conversation).id}`)">{{ getOtherUser(conversation).username }}</a>
          <div class="description">
            {{ messagePreview(conversation.text) }}
          </div>
          <div class="description">
            {{ prettyPrintTimestamp(conversation.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Button from '~/components/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    conversations: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  methods: {
    getOtherUser(conversation) {
      return conversation.senderId == this.$auth.user.id
        ? conversation.receiver
        : conversation.sender
    },
    prettyPrintTimestamp(ts) {
      return moment(ts).fromNow()
    },
    messagePreview(text) {
      return text.slice(0, 140) + ' ...'
    }
  }
}
</script>
