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
      <component :is="activecomp"/>
    </sui-segment>
  </div>
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
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [
        { id: 1, desc: 'Bio', link: 'details' },
        { id: 2, desc: 'Education', link: 'educationentries' },
        { id: 3, desc: 'Contact', link: 'contactentries' },
        { id: 4, desc: 'Skill', link: 'skillentries' }
      ]
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
    }
  }
}
</script>
