<template>
  <div>

    <table class="ui celled table">
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
                fluid
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
                fluid
                button
                class="icon"
              />
            </div>
          </td>
          <td>
            <div class="dev-center">
              <sui-dropdown
                v-model="priceMax"
                :menu-header="menuHeader"
                :search-in-menu="searchInMenu"
                :options="price"
                allow-additions
                text="Cena maksymalna"
                icon="balance scale"
                floating
                labeled
                fluid
                button
                class="icon"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div 
      class="ui right floated small primary button"
      @click="update">
      Filtruj
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
      price: Array.from({ length: 14 }, (v, k) => {
        return {
          value: (k * 10 + 20).toString(),
          text: (k * 10 + 20).toString() + ' zł/godz'
        }
      }),
      priceMax: null,
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
            skillLevelId: this.selectedLevel,
            priceMax: this.priceMax
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
</style>
