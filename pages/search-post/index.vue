<template>
  <div>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">Studenci</div>
    </div>
    <div class="ui link items">
      <Item 
        v-for="post in postData.posts"
        :key="post.id" 
        :post="post"
        :data="postData"
        @refreshdev="refreshdev"/>
    </div>
  </div>
</template>

<script>
import Item from '~/components/Student/Item.vue'

export default {
  components: {
    Item
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/post`)
      .then(postData => {
        return {
          postData
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    refreshdev() {
      this.$axios
        .$get(`/api/post`)
        .then(data => {
          this.postData = data
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.dev-center {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.dev-inline {
  display: inline;
}
.dev-color {
  background: #eeeeee90;
}
</style>
