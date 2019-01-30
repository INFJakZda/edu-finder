<template>
  <div>
    <h2>Wiadomości</h2>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona główna</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">Wiadomości</div>
    </div>
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
      if (text >= 140) {
        return text.slice(0, 140) + ' ...'
      }

      return text
    }
  }
}
</script>
