<template>
  <div>
    <p>{{ loadedData }}</p>
    <button 
      class="ui primary button"
      style="margin: 20px"
      @click="setData"
    >Get user details</button>
    <!-- <div>
      <Main />
    </div> -->
  </div>
</template>

<script>
import Main from '~/components/Settings/Main'

export default {
  components: {
    Main
  },
  methods: {
    setData() {
      this.$store.dispatch('getUserDetails')
      this.$store.dispatch('getUserEducationEntries')
      this.$store.dispatch('getUserContactEntries')
      this.$store.dispatch('getUserSkillEntries')
    }
  },
  asyncData(context) {
    return context.app.$axios
      .$get('/api/user/3/' + context.params.tab)
      .then(data => {
        return {
          loadedData: {
            data,
            tab: context.params.tab
          }
        }
      })
      .catch(e => context.error(e))
  }
}
</script>
