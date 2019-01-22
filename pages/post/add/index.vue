<template>
  <Add :postdata="postsData"/>  
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

<style>
</style>
