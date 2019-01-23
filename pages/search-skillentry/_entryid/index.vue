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
    <div>
      {{ entry }}
    </div>
  </div>
</template>

<script>
export default {
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
</style>
