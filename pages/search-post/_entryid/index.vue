<template>
  <div>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <nuxt-link 
        to="/search-post" 
        class="section">Studenci</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">{{ entry.author.username }}</div>
    </div>
    <User
      :user="entry.author" 
      :entry="entry"/>
    
  </div>
</template>

<script>
import User from '~/components/User/Card.vue'

export default {
  components: {
    User
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/post/${context.params.entryid}`)
      .then(data => {
        return {
          entry: data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style scoped>
</style>
