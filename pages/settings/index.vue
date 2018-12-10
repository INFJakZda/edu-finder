<template>
  <div>
    <p>This is a secure page!</p>
    <button 
      class="ui primary button" 
      @click="setData">Get user details</button>
    <div>
      <Main
        :userDetails="userDetails"
        :userEducationEntries="userEducationEntries"
        :userContactEntries="userContactEntries"
        :userSkillEntries="userSkillEntries"
      />
    </div>
  </div>
</template>

<script>
import Main from '~/components/Settings/Main'

export default {
  components: {
    Main
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails
    },
    userEducationEntries() {
      return this.$store.getters.userEducationEntries
    },
    userContactEntries() {
      return this.$store.getters.userContactEntries
    },
    userSkillEntries() {
      return this.$store.getters.userSkillEntries
    }
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
