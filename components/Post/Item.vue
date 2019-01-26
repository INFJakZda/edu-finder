<template lang="html">
  <div class="ui items">
    <Post 
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :postdata="postdata"
      @refreshdev="$emit('refreshdev')"/>
  </div>
</template>

<script>
import Post from '~/components/Post/Post.vue'

export default {
  name: 'ItemGroupExample',
  components: {
    Post
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    postdata: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
