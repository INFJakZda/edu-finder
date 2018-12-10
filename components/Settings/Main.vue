<template lang="html">
  <sui-grid>
    <sui-grid-column :width="4">
      <sui-menu 
        fluid 
        vertical 
        tabular>
        <a
          is="sui-menu-item"
          v-for="item in items"
          :key="item"
          :content="item"
          :active="isActive(item)"
          @click="select(item)"
        />
      </sui-menu>
    </sui-grid-column>
    
    <sui-grid-column 
      :width="12" 
      stretched>
      <sui-segment>
        <component :is="active"/>
      </sui-segment>
    </sui-grid-column>
  </sui-grid>
</template>

<script>
import Contact from './UserContactEntries'
import Bio from './UserDetails'
import Education from './UserEducationEntries'
import Skill from './UserSkillEntries'

export default {
  name: 'TabularMenuExample',
  components: {
    Contact,
    Bio,
    Education,
    Skill
  },
  props: {
    userDetails: {
      type: Object,
      default: () => {},
      required: false
    },
    userEducationEntries: {
      type: Object,
      default: () => {},
      required: false
    },
    userContactEntries: {
      type: Object,
      default: () => {},
      required: false
    },
    userSkillEntries: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      items: ['Bio', 'Education', 'Contact', 'Skill'],
      active: 'Bio'
    }
  },
  methods: {
    isActive(name) {
      return this.active === name
    },
    select(name) {
      this.active = name
    }
  }
}
</script>
