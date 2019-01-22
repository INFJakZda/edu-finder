<template lang="html">
  <div class="ui divided items">
    <div 
      v-for="post in posts"
      :key="post.id"
      class="item">

      <div class="ui image dev-image">
        <div class="ui black ribbon label">
          <span class="dev-inline"><i class="user icon"/> {{ post.author.username }} </span>
        </div>
        <img :src="imgSrc">
      </div>
      
      <div class="content">

        <div class="header">{{ post.title }}</div>

        <div class="meta">
          <span class="dev-inline"><i class="graduation cap icon"/> {{ post.skillLevel.name }} </span>
          <span class="dev-inline"><i class="globe icon"/> {{ post.category.name }} </span>
          <span class="dev-inline"><i class="home icon"/> {{ post.city.name }} </span>
          
        </div>

        <div class="description">
          <p>{{ post.text }}</p>
        </div>

        <div class="extra">
          
          <div 
            v-for="(tag, idx) in post.tags"
            :key="idx"
            class="ui label">{{ tag }}</div>

          <sui-dropdown
            class="teal ui right floated"
            text="Opcje"
            button
            floating
            direction="upward"
          >
            <sui-dropdown-menu>
              <sui-dropdown-item @click.native="toggle"><sui-icon name="edit" />Edycja</sui-dropdown-item>
              <sui-dropdown-item @click="deletePost(post.id)">
                <sui-icon name="delete" />Usuń
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>

          <sui-modal v-model="open">
            <sui-modal-header>Wprowadź zmiany</sui-modal-header>
            <sui-modal-content scrolling>
              <Add 
                :postdata="postdata" 
                :postinfo="post"
                @refresh="refresh"
                @cancel="toggle"/>
            </sui-modal-content>
          </sui-modal>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Add from '~/components/Post/Add'

export default {
  name: 'ItemGroupExample',
  components: {
    Add
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
  },
  data() {
    return {
      open: false
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
    },
    toggle() {
      this.open = !this.open
    },
    refresh() {
      this.open = !this.open
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.dev-border {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
    0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}
.dev-inline {
  display: inline-block;
}
.dev-image {
  max-width: 150px !important;
  max-height: 150px !important;
}
</style>
