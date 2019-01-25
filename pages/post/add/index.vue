<template>
  <div>
    <div class="ui breadcrumb dev-margin">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <nuxt-link 
        to="/post" 
        class="section">Twoje posty</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">Dodaj post</div>
    </div>
    <Add :postdata="postsData"/>
  </div>
</template>

<script>
import Add from '~/components/Post/Add'

export default {
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/user/${context.store.state.auth.user.id}/posts`)
      .then(postsData => {
        return {
          postsData
        }
      })
      .catch(e => context.error(e))
  },
  components: {
    Add
  }
}
</script>

<style scoped>
.dev-margin {
  margin-bottom: 15px !important;
}
</style>
