<template>
  <div class="ui menu">
    <div class="ui container">
      <a 
        class="header item"
        @click="$router.push('/')">
        <img 
          class="logo dev-logo" 
          src="https://images-eu.ssl-images-amazon.com/images/I/71Ie8rLruiL.png"
      >Edu Finder</a>
      <div class="right menu">
        <div 
          v-if="loggedIn" 
          class="ui simple dropdown item">
          <img 
            :src="imgSrc" 
            class="ui avatar image">
          {{ userName }}
          <i class="dropdown icon"/>
          <div class="menu">
            <a 
              class="ui item"
              @click="$router.push('/settings/details')">
              <i class="cogs icon"/>Settings
            </a>
            <div class="divider"/>
            <a 
              class="ui item"
              @click="logout">
            <i class="power off icon"/>Logout</a>
          </div>
        </div>
        <div 
          v-if="!loggedIn" 
          class="ui simple dropdown item">
          <img 
            :src="imgSrc" 
            class="ui avatar image">
          Moje konto
          <i class="dropdown icon"/>
          <div class="menu">
            <a 
              class="ui item"
              @click="$router.push('/register-form')">
              <i class="sing-in icon"/>Sign up
            </a>
            <a 
              class="ui item"
              @click="$router.push('/login-form')">
              Log-in
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    imgSrc() {
      return this.$store.getters.imgSrc
    },
    userName() {
      return this.$store.state.auth.user.username
    }
  },
  watch: {
    loggedIn: function() {
      this.updateUser()
    }
  },
  created() {
    this.updateUser()
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$store.dispatch('rmUserImg')
      this.$router.push('/')
    },
    updateUser() {
      if (this.$store.state.auth.loggedIn) {
        this.$store.dispatch('getUserImg', this.$store.state.auth.user.id)
      } else {
        this.$store.dispatch('rmUserImg')
      }
    }
  }
}
</script>

<style scoped>
.dev-header-container {
  padding: 10px;
}

.dev-logo {
  padding-right: 10px;
}
</style>
