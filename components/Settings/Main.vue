<template>
  <div>
    <sui-menu
      class="dev-font"
      pointing 
      secondary>
      <a
        is="sui-menu-item"
        v-for="item in items"
        :key="item.id"
        :content="item.name"
        :active="item.link === userData.loadedComponent"
        @click="redirect(item)"
      />
    </sui-menu>

    <sui-segment>
      <component 
        :is="activecomp" 
        :user="userData"
        @refreshdev="onrefreshdev" />
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
    onrefreshdev() {
      this.$emit('refreshdev')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .dev-font {
    font-size: 0.96rem;
  }
}
</style>
