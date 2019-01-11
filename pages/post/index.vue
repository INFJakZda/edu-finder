<template>
  <div>
    <button @click="addedPost = !addedPost" />
    <div 
      v-if="addedPost"
      class="ui placeholder segment">
      <div class="ui icon header">
        <!-- <i class="pdf file outline icon"/> -->
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
      <Item />
    </div>
  </div>
</template>

<script>
import Item from '~/components/Post/Item.vue'

export default {
  components: {
    Item
  },
  data() {
    return {
      addedPost: 0
    }
  },
  methods: {
    addPost() {
      return 0
    }
  }
}
</script>

<style>
</style>
