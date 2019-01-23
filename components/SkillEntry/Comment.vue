<template>
  <div class="comment">
    <a class="avatar">
      <img :src="imgSrc">
    </a>
    <div class="content">
      <a class="author">{{ data.author.username }}</a>
      <div class="metadata">
        <span class="date">Dziś o 11:24</span>
        <div class="rating">
          <i class="star icon"/>
          {{ data.rating }}/{{ data.rating }}
        </div>
      </div>
      <div class="text">
        {{ data.comment }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      if (this.data.author.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.data.author.avatarId
        }`
      } else {
        return `http://cdn.onlinewebfonts.com/svg/img_210318.png`
      }
    }
  }
}
</script>

<style>
</style>
