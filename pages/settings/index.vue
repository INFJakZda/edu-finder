<template>
  <div>
    <p>This is a secure page!</p>
    <Code :data="userDetails"/>
    <button 
      class="ui primary button" 
      @click="setDetails">Get user details</button>
    <div>
      <Main />
    </div>
  </div>
</template>

<script>
import Code from '~/components/dev/Code.vue'
import Main from '~/components/Settings/Main'

export default {
  components: {
    Code,
    Main
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails
    }
  },
  methods: {
    setDetails() {
      this.$store.dispatch('setUserData')
    }
  }
}
</script>
