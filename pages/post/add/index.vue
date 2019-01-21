<template>
  <div>
    <div class="ui top attached tabular menu">
      <div class="active item">Dodaj nowy post</div>
    </div>
    <div class="ui bottom attached active tab segment">
      <div class="ui equal width form">
        <div class="field">
          <label>Tytuł postu</label>
          <input
            v-model="post.title"
            type="text"
            name="Tytuł postu"
            placeholder="Tytuł..."
          >
        </div>
        <div class="field">
          <label>Opis postu</label>
          <input
            v-model="post.text"
            type="text"
            name="Opis postu"
            placeholder="Dodaj opis do postu..."
          >
        </div>
        <button 
          class="ui button"
          @click="addPost">
          <i class="add icon"/>
          Dodaj nowy post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        authorId: this.$auth.user.id,
        author: {},
        cityId: 0,
        city: {},
        categoryId: 0,
        category: {},
        skillLevelId: 0,
        skillLevel: {},
        timestamp: null,
        title: '',
        text: '',
        tags: []
      }
    }
  },
  methods: {
    addPost() {
      this.$axios
        .$post('/api/post', this.post)
        .then(() => {
          this.$router.push('/post/add')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
