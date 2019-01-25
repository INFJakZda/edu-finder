<template>
  <div class="item">
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
          class="blue ui right floated"
          text="Opcje"
          button
          floating
          direction="upward"
        >
          <sui-dropdown-menu>
            <sui-dropdown-item @click.native="toggle"><sui-icon name="edit" />Edycja</sui-dropdown-item>
            <sui-dropdown-item @click="openDelete = !openDelete">
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
              @refreshdev="refreshdev"
              @cancel="toggle"/>
          </sui-modal-content>
        </sui-modal>

        <Modal 
          :open="openDelete"
          @deletemodal="openDelete = !openDelete"
          @deleteitem="deletePost(post.id)">
          {{ post.title }}
        </Modal>

      </div>
    </div>
  </div>
</template>

<script>
import Add from '~/components/Post/Add'
import Modal from '~/components/Settings/Items/Modal.vue'

export default {
  components: {
    Add,
    Modal
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    postdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false,
      openDelete: false
    }
  },
  methods: {
    deletePost(id) {
      this.$axios
        .$delete(`/api/post/${id}`)
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    },
    toggle() {
      this.open = !this.open
    },
    refreshdev() {
      this.open = !this.open
      this.$emit('refreshdev')
    }
  }
}
</script>

<style scoped>
.dev-inline {
  display: inline-block;
}
.dev-image {
  max-width: 150px !important;
  max-height: 150px !important;
}
</style>
