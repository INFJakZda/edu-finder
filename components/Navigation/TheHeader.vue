<template>
  <div class="ui large borderless menu">
    <div class="ui container">
      <a 
        class="header item"
        @click="$router.push('/')">
        <img 
          class="logo dev-logo" 
          src="https://images-eu.ssl-images-amazon.com/images/I/71Ie8rLruiL.png"
      >Edu Student</a>

      <div class="right menu">
      
        <a 
          class="ui item dev-visible"
          @click="$router.push('/search-skillentry')">
        <i class="address card outline icon"/>Szukaj korepetycji</a>
        
        <a 
          class="ui item dev-visible"
          @click="$router.push('/search-post')">
        <i class="bullhorn icon"/>Szukaj ogłoszenia</a>
      
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
              class="ui item dev-mob-visible"
              @click="$router.push('/search-skillentry')">
            <i class="address card outline icon"/>Szukaj korepetycji</a>
            
            <a 
              class="ui item dev-mob-visible"
              @click="$router.push('/search-post')">
            <i class="bullhorn icon"/>Szukaj ogłoszenia</a>
            
            <a 
              class="ui item"
              @click="$router.push('/post')">
            <i class="pencil icon"/>Ogłoszenia</a>
            <a 
              class="ui item"
              @click="$router.push('/messages')">
            <i class="envelope icon"/>Wiadomości</a>
            <a 
              class="ui item"
              @click="$router.push('/settings/details')">
            <i class="cogs icon"/>Profil</a>
            <div class="divider"/>
            <a 
              class="ui item"
              @click="logout">
            <i class="power off icon"/>Wyloguj</a>
          </div>
        </div>
        <div 
          v-if="!loggedIn" 
          class="ui simple dropdown item">
          <img 
            :src="imgSrc" 
            class="ui avatar image">
          <i class="dropdown icon"/>
          <div class="menu">
            <a 
              class="ui item dev-mob-visible"
              @click="$router.push('/search-skillentry')">
            <i class="address card outline icon"/>Szukaj korepetycji</a>
            <a 
              class="ui item dev-mob-visible"
              @click="$router.push('/search-post')">
            <i class="bullhorn icon"/>Szukaj ogłoszenia</a>
            <a 
              class="ui item"
              @click="$router.push('/register-form')">
            <i class="sign-in icon"/>Rejestracja</a>
            <a 
              class="ui item"
              @click="$router.push('/login-form')">
            <i class="play icon"/>Logowanie</a>
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
      if (this.$auth) {
        if (this.$auth.loggedIn) {
          return this.$auth.loggedIn
        }
      }
      return false
    },
    imgSrc() {
      return this.$store.getters.imgSrc
    },
    userName() {
      return this.$auth.user.username
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
      if (this.$auth.loggedIn) {
        this.$store.dispatch('getUserImg', this.$auth.user.id)
      } else {
        this.$store.dispatch('rmUserImg')
      }
    }
  }
}
</script>

<style scoped>
.dev-logo {
  padding-right: 10px;
}
@media only screen and (max-width: 767px) {
  .dev-visible {
    display: none !important;
  }
}
@media only screen and (min-width: 767px) {
  .dev-mob-visible {
    display: none !important;
  }
}
</style>
