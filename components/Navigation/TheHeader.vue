<template>
  <div class="dev-header-container">
    <div class="ui secondary menu">
      <a 
        class="active item" 
        @click="$router.push('/')">Home</a>
      <div class="right menu">
        <a 
          v-if="!loggedIn" 
          class="ui item"
          @click="$router.push('/register-form')">
          Sign up
        </a>
        <a 
          v-if="!loggedIn" 
          class="ui item"
          @click="$router.push('/login-form')">
          Log-in
        </a>
        <a 
          v-if="loggedIn" 
          class="ui item"
          @click="logout">Logout</a>
        <a 
          v-if="loggedIn" 
          class="ui item"
          @click="$router.push('/settings/details')">
          Settings
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    loggedIn() {
      return this.$auth.$state.loggedIn
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dev-header-container {
  padding: 10px;
}
</style>
