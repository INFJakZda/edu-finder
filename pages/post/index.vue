<template>
  <div>
    <div 
      v-if="!(postsData.posts.length > 0)"
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
      <div class="ui menu borderless dev-color">
        <div class="item">
          <h3 class="header">
            Dodane posty
          </h3>
        </div>
        <div class="right item">
          <button 
            class="positive ui button"
            @click="$router.push('/post/add')">
            <i class="add icon"/>
            Dodaj nowy post
          </button>
        </div>
      </div>
      
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
