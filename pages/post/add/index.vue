<template>
  <div>
    <div class="ui top attached tabular menu">
      <div class="active item">Dodaj nowy post</div>
    </div>
    <div class="ui bottom attached active tab segment">
      <div class="ui equal width form">
        
        <div class="fields">
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
            <label>Miasto</label>
            <sui-dropdown
              v-model="post.cityId"
              :options="postsData.availableCities"
              placeholder="Wybierz miasto"
              search
              selection
            />
          </div>
        </div>
        
        <div class="field">
          <label>Opis postu</label>
          <textarea
            v-model="post.text"
            rows="2"
            name="Opis postu"
            placeholder="Dodaj opis do postu..."
          />
        </div>

        <div class="fields">
          <div class="field">
            <label>Wybierz Kategorię</label>
            <sui-dropdown
              v-model="post.categoryId"
              :options="postsData.availableCategories"
              placeholder="Wybierz kategorie..."
              search
              selection
            />
          </div>
          <div class="field">
            <label>Poziom zaawansowania</label>
            <sui-dropdown
              v-model="post.skillLevelId"
              :options="postsData.availableSkillLevels"
              placeholder="Wybierz poziom..."
              search
              selection
            />
          </div>
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
        cityId: '',
        city: {},
        categoryId: '',
        category: {},
        skillLevelId: '',
        skillLevel: {},
        timestamp: null,
        title: '',
        text: '',
        tags: ['test']
      }
    }
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
  },
  methods: {
    addPost() {
      this.post.timestamp = new Date()
      this.$axios
        .$post('/api/post', this.post)
        .then(() => {
          this.$router.push('/post')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
