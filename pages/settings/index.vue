<template>
  <div>
    <p>This is a secure page!</p>
    <button 
      class="ui primary button"
      style="margin: 20px"
      @click="setData"
    >Get user details</button>
    <div>
      <Main />
    </div>
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
  }
}
</script>
