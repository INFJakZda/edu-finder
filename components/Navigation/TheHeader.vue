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
          <i class="dropdown icon"/>
          <div class="menu">
            <a 
              class="ui item"
              @click="logout">Logout</a>
            <a 
              class="ui item"
              @click="$router.push('/settings/details')">
              Settings
            </a>
          </div>
        </div>
        <div 
          v-if="!loggedIn" 
          class="ui simple dropdown item">
          <i class="user plus icon"/>
          Moje konto
          <i class="dropdown icon"/>
          <div class="menu">
            <a 
              class="ui item"
              @click="$router.push('/register-form')">
              Sign up
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
  data() {
    return {
      imgSrc: null
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.$state.loggedIn
    }
  },
  watch: {
    loggedIn: function() {
      console.log('LOGGING DEBUG')
      this.logoUpdate()
    }
  },
  created() {
    this.logoUpdate()
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/')
    },
    logoUpdate() {
      if (this.$store.state.auth.user) {
        this.$axios
          .$get(`/api/user/${this.$store.state.auth.user.id}/details`)
          .then(userData => {
            this.imgSrc = userData.avatarId
              ? `https://loli-server.azurewebsites.net/api/picture/${
                  userData.avatarId
                }`
              : 'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png'
          })
          .catch(e => console.log(e))
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
