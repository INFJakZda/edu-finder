<template>
  <div>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <nuxt-link 
        to="/search-skillentry" 
        class="section">Korepetytorzy</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">{{ entry.user.username }}</div>
    </div>

    <div class="ui grid container">
      <div class="sixteen wide mobile ten wide tablet ten wide computer column">
        <User
          :user="entry.user"
          :entry="entry"
          @refreshdev="update"/>
      </div>
      <div 
        class="dev-center sixteen wide mobile six wide tablet six wide computer column">
        <h3 class="ui dividing header">Informacje o {{ entry.user.username }}:</h3>

        <sui-segment>
          <Education
            :list="entry.user.educationEntries"/>
        </sui-segment>

        <sui-segment>
          <Contact
            :user="entry.user" />
        </sui-segment>

        <button 
          class="ui button right floated"
          @click="sendMessage">
          Napisz do {{ entry.user.username }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import Education from '~/components/SkillEntry/Education.vue'
import User from '~/components/SkillEntry/Card.vue'
import Contact from '~/components/SkillEntry/Contact.vue'

export default {
  components: {
    Education,
    User,
    Contact
  },
  data() {
    return {
      active: 'Uczelnie',
      items: ['Uczelnie', 'Korepetycje', 'Friends']
    }
  },
  methods: {
    isActive(name) {
      return this.active === name
    },
    select(name) {
      this.active = name
    },
    update() {
      this.$axios
        .$get(`/api/skillentry/${this.entry.id}`)
        .then(data => {
          this.entry = data
        })
        .catch(e => console.log(e))
    },
    sendMessage() {
      this.$router.push(`/messages/conversations/${this.entry.user.id}`)
    }
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/skillentry/${context.params.entryid}`)
      .then(data => {
        return {
          entry: data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style scoped>
.ui.grid {
  margin-top: 0px !important;
}
</style>
