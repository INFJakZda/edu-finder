<template>
  <div>
    <div 
      v-if="postsData.posts"
      class="ui placeholder segment">
      <div class="ui icon header">
        <i class="address card outline icon"/>
        Nie masz dodanego żadnego postu.
      </div>
      <button 
        class="positive ui button"
        @click="$router.push('/post/add')">
        <i class="add icon"/>
        Dodaj nowy post
      </button>
    </div>
    <div v-else>
      <Item :posts="postsData.posts"/>
    </div>
  </div>
</template>

<script>
import Item from '~/components/Post/Item.vue'

export default {
  middleware: 'auth',
  components: {
    Item
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/user/${context.store.state.auth.user.id}/posts`)
      .then(postsData => {
        return {
          postsData
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style>
</style>
