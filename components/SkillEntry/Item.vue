<template lang="html">
  <div 
    class="item dev-border"
    @click="$router.push(`/search-skillentry/${entry.id}`)">
    <div 
      class="ui image dev-image">
      <div class="ui black ribbon label">
        <span class="dev-inline"><i class="user icon"/> {{ entry.user.username }} </span>
      </div>
      <img :src="imgSrc">
    </div>
        
    <div class="content">

      <div class="header">{{ entry.title }}</div>

      <div class="meta">
        <span class="dev-inline"><i class="graduation cap icon"/> {{ entry.skillLevel.name }} </span>
        <span class="dev-inline"><i class="globe icon"/> {{ entry.category.name }} </span>
      </div>

      <div class="description">
        <p>{{ entry.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Add from '~/components/Post/Add'

export default {
  name: 'ItemGroupExample',
  components: {
    Add
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
      return `https://loli-server.azurewebsites.net/api/picture/${
        this.entry.user.avatarId
      }`
    }
  },
  methods: {
    refresh() {
      this.open = !this.open
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.dev-border {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
    0px 2px 10px 0px rgba(34, 36, 38, 0.15) !important;
  background: #fff !important;
  -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15) !important;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15) !important;
  border-radius: 0.28571429rem !important;
  border: 1px solid rgba(34, 36, 38, 0.15) !important;
}
.dev-inline {
  display: inline-block;
}
.dev-image {
  max-width: 150px !important;
  max-height: 150px !important;
}
.dev-padding {
  padding: 10px 10px !important;
}
</style>
