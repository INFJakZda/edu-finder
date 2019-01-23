<template lang="html">
  <div class="ui divided items">
    <div 
      class="ui image dev-image">
      <div class="ui black ribbon label">
        <span class="dev-inline"><i class="user icon"/> {{ entry.user.username }} </span>
      </div>
      <img :src="imgSrc">
    </div>
      
    <div class="content">

      <div class="header">{{ entry.title }}</div>

      <div class="meta">
        <span class="dev-inline"><i class="graduation cap icon"/> {{ entry.skillLevel.name }} </span>
        <span class="dev-inline"><i class="globe icon"/> {{ entry.category.name }} </span>
        <span class="dev-inline"><i class="home icon"/> {{ entry.city.name }} </span>
          
      </div>

      <div class="description">
        <p>{{ entry.text }}</p>
      </div>

      <div class="extra">
          
        <div 
          v-for="(tag, idx) in entry.tags"
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
            <sui-dropdown-item @click="deletePost(entry.id)">
              <sui-icon name="delete" />Usuń
            </sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown>

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
    entry: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return this.$store.getters.imgSrc
    }
  },
  methods: {
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
