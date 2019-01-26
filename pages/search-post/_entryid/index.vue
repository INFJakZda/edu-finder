<template>
  <div>
    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <nuxt-link 
        to="/search-post" 
        class="section">Studenci</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">{{ entry.user.username }}</div>
    </div>
    <div class="ui items">
      <Details 
        :entry="entry"
        :data="{}"/>
    </div>
    
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

export default {
  components: {
    Details
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/post/${context.params.entryid}`)
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
</style>
