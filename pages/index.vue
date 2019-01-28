<template>
  <div>
    <div class="ui grid massive message dev-mobile">
      <div class="ui container dev-container">
        <div class="row dev-row">
          <div class="h1 ui huge header dev-header">
            Znajdź korepetycje!
          </div>
          <p 
            v-if="!loggedIn" 
            class="dev-font">
            Aby skorzystać z pełni możliwości platformy załóż konto w jednym prostym kroku. Umożliwi to dodawanie postów, kontakt z innymi użytkownikami oraz dużo więcej...
          </p>
          <p 
            v-if="loggedIn"
            class="dev-font">
            Pamiętaj aby ułatwić znalezienie twoich potrzeb powinieneś wprowadzić jak najwięcej informacji o sobie. Pochwal się swoimi umiejętnościami oraz ukończoną edukacją ;)
          </p>
          <nuxt-link
            v-if="!loggedIn"
            to="/register-form" 
            class="ui large green button">Załóż konto &raquo;</nuxt-link>
          <nuxt-link
            v-if="loggedIn"
            to="/settings/details" 
            class="ui large green button">Wprowadź dane &raquo;</nuxt-link>
        </div>
      </div>
    </div>
    <div class="ui hidden divider"/>
    <div class="ui container">
      <div class="ui stackable grid">
        <div class="three column row">
          <div class="column">
            <h1 class="ui header">
              Znajdź korepetytora
            </h1>
            <p>
              Możesz wyszukać korepetytora z naszej bazy użytkowników. Wprowadź konkretne parametry wuszukiwania i skontaktuj się z korepetytorem. 
            </p>
            <nuxt-link 
              to="/search-skillentry"
              class="ui small primary button">
              Znajdź korepetycje &raquo;
            </nuxt-link>
          </div>
          <div class="column">
            <h1 class="ui header">
              Znajdź studenta
            </h1>
            <p>
              W naszej bazie jest mnóstwo osób potrzebujących pomocy, możesz wyszukać w konkretnych kategoriach oraz skontaktować się z nimi.
            </p>
            <nuxt-link 
              to="/search-post"
              class="ui small primary button">
              Znajdź uczniów &raquo;
            </nuxt-link>
          </div>
          <div 
            v-if="!loggedIn" 
            class="column">
            <h1 class="ui header">
              Dla posiadających konto
            </h1>
            <p>
              Jeżeli posiadasz już konto możesz się zalogować, aby skorzystać z pełni usług. Pamiętaj o wprowadzeniu informacji o twoim doświadczeniu.
            </p>
            <nuxt-link 
              to="/login-form"
              class="ui small primary button">
              Zaloguj się &raquo;
            </nuxt-link>
          </div>
          <div 
            v-if="loggedIn" 
            class="column">
            <h1 class="ui header">
              Dodaj nowy post
            </h1>
            <p>
              Aby umożliwić innym znalezienie twoich potrzeb poinformuj o tym. Wprowadź pełne informacje na temat tego czego potrzebujesz. Daj się znaleźć!
            </p>
            <nuxt-link 
              to="/post"
              class="ui small primary button">
              Dodaj post &raquo;
            </nuxt-link>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="ui divider"/>
            <footer>
              &copy; 2019 Politechnika Poznańska.
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  computed: {
    loggedIn() {
      if (this.$auth) {
        if (this.$auth.loggedIn) {
          return this.$auth.loggedIn
        }
      }
      return false
    }
  }
}
</script>

<style scoped>
.ui.form .inline.fields {
  margin: 0.5em;
}
.ui.grid.message {
  background-color: #eeeeee90;
  box-shadow: none;
  border-radius: 0;
}
.ui.grid.message .row {
  margin-top: 2em;
  margin-bottom: 2em;
}
.ui.menu {
  margin: 0px;
}
.ui.message {
  margin: 0px;
  padding: 0px;
}
@media only screen and (max-width: 767px) {
  .dev-row {
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }
  .dev-container {
    margin-left: 0em !important;
    margin-right: 0em !important;
  }
  .dev-header {
    font-size: 36px !important;
  }
  .dev-font {
    font-size: 20px !important;
  }
}
</style>
