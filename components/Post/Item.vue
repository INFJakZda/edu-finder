<template lang="html">
  <div class="ui divided items">
    <div 
      v-for="post in posts"
      :key="post.id"
      class="item">

      <div class="image">
        <img :src="imgSrc">
      </div>
      
      <div class="content">

        <a class="header">{{ post.title }}</a>

        <div class="meta">
          <span><i class="user icon"/>{{ post.author.username }}</span>
          <span><i class="graduation cap icon"/>{{ post.skillLevel.name }}</span>
          <span><i class="globe icon"/>{{ post.category.name }}</span>
          <span><i class="home icon"/>{{ post.city.name }}</span>
          
        </div>

        <div class="description">
          <p>{{ post.text }}</p>
        </div>

        <div class="extra">
          
          <div 
            v-for="(tag, idx) in post.tags"
            :key="idx"
            class="ui label">{{ tag }}</div>

          <div class="ui right floated compact menu">
            <div class="ui simple dropdown item">
              opcje
              <i class="dropdown icon"/>
              <div class="menu">
                <div class="item"><i class="edit icon"/> Edytuj post</div>
                <div 
                  class="item"
                  @click="deletePost(post.id)"><i class="delete icon"/> Usuń post</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemGroupExample',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return this.$store.getters.imgSrc
    }
  },
  methods: {
    deletePost(id) {
      this.$axios
        .$delete(`/api/post/${id}`)
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
.dev-border {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
    0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}
</style>
