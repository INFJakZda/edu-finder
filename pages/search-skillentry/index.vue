<template>
  <div>

    <table class="ui celled table dev-visible">
      <tbody>
        <tr>
          <td>
            <div class="dev-center">
              <sui-dropdown
                v-model="selectedCategory"
                :menu-header="menuHeader"
                :search-in-menu="searchInMenu"
                :options="entryData.availableCategories"
                text="Wybierz kategorię"
                icon="globe"
                floating
                labeled
                button
                class="icon"
              />
            </div>
          </td>
          <td>
            <div class="dev-center">
              <sui-dropdown
                v-model="selectedLevel"
                :menu-header="menuHeader"
                :search-in-menu="searchInMenu"
                :options="entryData.availableSkillLevels"
                text="Wybierz poziom"
                icon="graduation cap"
                floating
                labeled
                button
                class="icon"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div 
      class="ui right floated small primary button dev-visible"
      @click="update">
      Filtruj
    </div>

    <div 
      class="ui right floated small primary button dev-mob-visible">
      Filtry
    </div>

    <div class="ui breadcrumb">
      <nuxt-link 
        to="/" 
        class="section">Strona startowa</nuxt-link>
      <i class="right angle icon divider"/>
      <div class="active section">Korepetytorzy</div>
    </div>
    <div class="ui link items">
      <Item 
        v-for="entry in entryData.skillEntries"
        :key="entry.id" 
        :entry="entry"
        :data="entryData"
        @refreshdev="refreshdev"/>
    </div>
  </div>
</template>

<script>
import Item from '~/components/SkillEntry/Item.vue'

export default {
  components: {
    Item
  },
  data() {
    return {
      menuHeader: {
        icon: '',
        content: 'Header'
      },
      searchInMenu: {
        icon: 'search',
        iconPosition: 'left'
      },
      selectedCategory: null,
      selectedCity: null,
      selectedLevel: null
    }
  },
  asyncData(context) {
    return context.app.$axios
      .$get(`/api/skillentry`)
      .then(entryData => {
        return {
          entryData
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    refreshdev() {
      this.$axios
        .$get(`/api/skillentry`)
        .then(data => {
          this.entryData = data
        })
        .catch(e => console.log(e))
    },
    update() {
      this.$axios
        .$get(`/api/skillentry/`, {
          params: {
            categoryId: this.selectedCategory,
            cityId: this.selectedCity,
            skillLevelId: this.selectedLevel
          }
        })
        .then(data => {
          this.entryData = data
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.dev-center {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.dev-inline {
  display: inline;
}
.dev-color {
  background: #eeeeee90;
}
@media only screen and (max-width: 767px) {
  .dev-visible {
    display: none;
  }
}
@media only screen and (min-width: 767px) {
  .dev-mob-visible {
    display: none;
  }
}
</style>
