<template>
  <div 
    class="item"
    @click="$router.push(`/search-post/${post.id}`)">
    <div 
      class="ui image dev-image">
      <div class="ui black ribbon label">
        <span class="dev-inline"><i class="user icon"/> {{ post.author.username }} </span>
      </div>
      <img :src="imgSrc">
    </div>
        
    <div class="content">

      <div class="header">{{ post.title }}</div>

      <div class="meta">
        <span class="dev-inline"><i class="graduation cap icon"/> {{ post.skillLevel.name }} </span>
        <span class="dev-inline"><i class="globe icon"/> {{ post.category.name }} </span>
      </div>

      <div class="description">
        <p>{{ post.text }}</p>
      </div>

      <div class="extra">
        <div 
          v-for="(tag, idx) in post.tags"
          :key="idx"
          class="ui label">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
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
      if (this.post.author.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.post.author.avatarId
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

<style>
</style>
