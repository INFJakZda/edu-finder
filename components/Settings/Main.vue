<template>
  <div>
    <sui-menu 
      pointing 
      secondary>
      <a
        is="sui-menu-item"
        v-for="item in items"
        :key="item.id"
        :content="item.desc"
        :active="item.link === userData.loadedComponent"
        @click="redirect(item)"
      />
    </sui-menu>

    <sui-segment>
      <component 
        :is="activecomp" 
        :user="userData"
        @submit="onSubmited" 
        @refresh="onRefresh" />
    </sui-segment>
  </div>
</template>

<script>
import Contact from './UserContactEntries'
import Bio from './UserDetails'
import Education from './UserEducationEntries'
import Skill from './UserSkillEntries'

import { categories } from '~/static/categories.json'

export default {
  name: 'TabularMenuExample',
  components: {
    Contact,
    Bio,
    Education,
    Skill
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: categories
    }
  },
  computed: {
    activecomp() {
      return this.items.find(ob => ob.link === this.userData.loadedComponent)
        .desc
    }
  },
  methods: {
    redirect(item) {
      this.$router.push('/settings/' + item.link)
    },
    onSubmited(post) {
      this.$emit('submit', post)
    },
    onRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>
