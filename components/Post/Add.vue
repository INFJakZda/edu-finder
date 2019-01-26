<template>
  <div>
    <div 
      v-if="!postinfo" 
      class="ui top attached tabular menu">
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
              :options="postdata.availableCities"
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
            <label>Kategoria</label>
            <sui-dropdown
              v-model="post.categoryId"
              :options="postdata.availableCategories"
              placeholder="Wybierz kategorie..."
              search
              selection
            />
          </div>
          <div class="field">
            <label>Poziom zaawansowania</label>
            <sui-dropdown
              v-model="post.skillLevelId"
              :options="postdata.availableSkillLevels"
              placeholder="Wybierz poziom..."
              search
              selection
            />
          </div>
        </div>
        <div class="field">
          <label>Tagi</label>
          <sui-dropdown
            :options="tags"
            v-model="post.tags"
            multiple
            fluid
            placeholder="Wybierz tagi"
            search
            selection
            allow-additions
            @keyup="autoComplete()"
          />
        </div>

        <button
          v-if="!postinfo"
          :class="{ disabled: !active || !(post.title && post.text && post.cityId && post.categoryId && post.skillLevelId) }"
          class="ui blue button"
          @click="addPost">
          <i class="add icon"/>
          Dodaj nowy post
        </button>

        <button
          v-if="postinfo"
          :class="{ disabled: !active || !(post.title && post.text && post.cityId && post.categoryId && post.skillLevelId) }"
          class="ui blue button"
          @click="putPost">
          <i class="save icon"/>
          Zatwierdź
        </button>

        <button
          v-if="postinfo"
          class="ui right floated red button"
          @click="$emit('cancel')">
          <i class="cancel icon"/>
          Anuluj
        </button>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postinfo: {
      type: Object,
      required: false,
      default: null
    },
    postdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      post: this.postinfo
        ? { ...this.postinfo }
        : {
            authorId: this.$auth.user.id,
            author: {},
            cityId: null,
            city: {},
            categoryId: null,
            category: {},
            skillLevelId: null,
            skillLevel: {},
            timestamp: null,
            title: '',
            text: '',
            tags: []
          },
      tags: [],
      helper: [],
      active: false
    }
  },
  watch: {
    post: {
      handler() {
        this.active = true
      },
      deep: true
    }
  },
  created() {
    if (this.postinfo) {
      this.active = false
      this.post.cityId = this.post.cityId.toString()
      this.post.categoryId = this.post.categoryId.toString()
      this.post.skillLevelId = this.post.skillLevelId.toString()
    }
  },
  methods: {
    addPost() {
      this.post.timestamp = new Date()
      this.post.cityId = this.post.cityId ? this.post.cityId : 0
      this.post.categoryId = this.post.categoryId ? this.post.categoryId : 0
      this.post.skillLevelId = this.post.skillLevelId
        ? this.post.skillLevelId
        : 0
      this.$axios
        .$post('/api/post', this.post)
        .then(() => {
          this.$router.push('/post')
        })
        .catch(e => console.log(e))
    },
    putPost() {
      this.post.timestamp = new Date()
      this.$axios
        .$put(`/api/post/${this.post.id}`, this.post)
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    },
    autoComplete() {
      if (this.$children[3].filter.length > 0) {
        this.$axios
          .$get('/api/tag', { params: { term: this.$children[3].filter } })
          .then(response => {
            this.helper = []
            this.post.tags.forEach(ele => {
              this.helper.push({
                key: ele,
                text: ele,
                value: ele
              })
            })
            this.tags = this.helper.slice()
            response.forEach(ele => {
              this.tags.push({
                key: ele.name,
                text: ele.name,
                value: ele.name
              })
            })
          })
      }
    }
  }
}
</script>

<style>
</style>
