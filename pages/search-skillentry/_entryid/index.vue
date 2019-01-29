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
          :entry="entry" />
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
          sdfsdgs
        </sui-segment>
      </div>
    </div>

    <User
      :user="entry.user"
      :entry="entry" />
    
    <div class="ui large comments">
      <h4 class="ui dividing header">Rekomendacje:</h4>
      <Comment 
        v-for="rec in entry.recommendations"
        :key="rec.id" 
        :data="rec"/>
    </div>

    <Education
      :list="entry.user.educationEntries"/>
    
  </div>
</template>

<script>
import Details from '~/components/SkillEntry/Details.vue'
import Education from '~/components/SkillEntry/Education.vue'
import Comment from '~/components/SkillEntry/Comment.vue'
import User from '~/components/SkillEntry/Card.vue'

export default {
  components: {
    Details,
    Education,
    Comment,
    User
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
