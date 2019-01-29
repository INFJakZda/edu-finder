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
      <div class="active section">{{ entry.author.username }}</div>
    </div>
    <div class="ui card">
      <div class="content">
        <div class="right floated meta">14h</div>
        <img 
          :src="imgSrc" 
          class="ui avatar image"> {{ entry.author.username }}
      </div>
      <div class="content">
        <span class="right floated">
          <i class="heart outline like icon"/>
          17 likes
        </span>
        <i class="comment icon"/>
        3 rekomendacje
      </div>
      <div class="extra content">
        <div class="ui large transparent left icon input">
          <i class="heart outline icon"/>
          <input 
            type="text" 
            placeholder="Add Comment...">
        </div>
      </div>
    </div>
    
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
  },
  computed: {
    imgSrc() {
      if (this.entry.author.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.entry.author.avatarId
        }`
      } else {
        return `http://cdn.onlinewebfonts.com/svg/img_210318.png`
      }
    }
  }
}
</script>

<style scoped>
</style>
