<template>
  <div class="ui card">
    <div class="content">
      <div class="right floated meta">14h</div>
      <img 
        :src="imgSrc" 
        class="ui avatar image"> {{ user.username }}
    </div>
    <div class="content">
      <a class="header">{{ entry.title }}</a>
      <div class="meta">
        <span class="date">{{ prettyPrintTimestamp }}</span>
      </div>
      <div class="description">
        {{ entry.text }}.
      </div>
      <div 
        v-for="(tag, idx) in entry.tags"
        :key="idx"
        class="ui label">{{ tag }}</div>
    </div>
    <div class="content">
      <span class="right floated">
        <i class="heart outline like icon"/>
        17 likes
      </span>
      <i class="comment icon"/>
      3 rekomendacje
    </div>
    <div class="extra content">
      <div class="ui large transparent left icon input">
        <i class="heart outline icon"/>
        <input 
          type="text" 
          placeholder="Add Comment...">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      if (this.user.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.user.avatarId
        }`
      } else {
        return `http://cdn.onlinewebfonts.com/svg/img_210318.png`
      }
    },
    prettyPrintTimestamp() {
      return moment(this.entry.timestamp).fromNow()
    }
  }
}
</script>

<style>
</style>
