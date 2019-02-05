<template>
  <div class="ui card dev-margin-top">
    <div class="content">
      <div class="right floated meta">{{ prettyPrintTimestamp }}</div>
      <img 
        :src="imgSrc" 
        class="ui avatar image"> {{ user.username }}
    </div>
    
    <div class="content">
      <a class="header">{{ entry.title }}</a>
      
      <div class="description">
        <truncate
          :length="250"
          :text="entry.text"
          clamp=" ..." 
          less=" Zwiń"/>
      </div>
      
      <div class="extra dev-margin-top-bottom">
        <div class="dev-inline"><i class="map marker alternate icon"/> Miasto: {{ entry.city.name }}, </div>
        <div class="dev-inline"><i class="graduation cap icon"/> Poziom: {{ entry.skillLevel.name }}, </div>
        <div class="dev-inline"><i class="globe icon"/> Kategoria: {{ entry.category.name }} </div>
      </div>
      
      <div 
        v-for="(tag, idx) in entry.tags"
        :key="idx"
        class="ui label">{{ tag }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import truncate from 'vue-truncate-collapsed'

export default {
  components: {
    truncate
  },
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

<style scoped>
.dev-margin-top {
  margin-top: 10px !important;
}
.ui.cards > .card,
.ui.card {
  width: 100% !important;
}
.dev-margin-top-bottom {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}
</style>
