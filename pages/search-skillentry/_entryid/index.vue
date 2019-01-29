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
      <div class="sixteen wide mobile seven wide tablet seven wide computer column">
        <User
          :user="entry.user"
          :entry="entry"
          @refreshdev="update"/>
      </div>
      <div 
        class="dev-center sixteen wide mobile nine wide tablet nine wide computer column">
        <sui-menu 
          pointing 
          secondary>
          <a
            is="sui-menu-item"
            v-for="item in items"
            :active="isActive(item)"
            :key="item"
            :content="item"
            @click="select(item)"
          />
        </sui-menu>

        <sui-segment>
          <Education
            :list="entry.user.educationEntries"/>
        </sui-segment>

        <sui-segment>
          <Contact
            :user="entry.user" />
        </sui-segment>
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
