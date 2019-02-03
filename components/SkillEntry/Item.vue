<template lang="html">
  <div 
    class="item"
    @click="$router.push(`/search-skillentry/${entry.id}`)">
    <div 
      class="ui image dev-image">
      <div class="ui black ribbon label">
        <span class="dev-inline"><i class="user icon"/> {{ entry.user.username }} </span>
      </div>
      <img 
        :src="imgSrc" 
        class="dev-image">
    </div>
        
    <div class="content">

      <div class="header">{{ entry.title }}</div>

      <div class="meta">
        <span class="dev-inline"><i class="graduation cap icon"/> {{ entry.skillLevel.name }} </span>
        <span class="dev-inline"><i class="globe icon"/> {{ entry.category.name }} </span>
        <span 
          v-if="entry.price"
          class="dev-inline"><i class="balance scale icon"/> {{ entry.price }} zł/godz </span>
      </div>

      <div 
        class="description"
        @click.stop>
        <truncate
          :length="150"
          :text="entry.details"
          clamp=" ..." 
          less=" Zwiń"/>
      </div>
    </div>
  </div>
</template>

<script>
import Add from '~/components/Post/Add'
import truncate from 'vue-truncate-collapsed'

export default {
  name: 'ItemGroupExample',
  components: {
    Add,
    truncate
  },
  props: {
    entry: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      if (this.entry.user.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.entry.user.avatarId
        }`
      } else {
        return `http://cdn.onlinewebfonts.com/svg/img_210318.png`
      }
    }
  },
  methods: {
    refreshdev() {
      this.open = !this.open
      this.$emit('refreshdev')
    }
  }
}
</script>

<style scoped>
.dev-inline {
  display: inline-block;
}
.dev-image {
  max-width: 150px !important;
  max-height: 150px !important;
}
</style>
