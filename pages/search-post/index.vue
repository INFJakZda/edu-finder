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
                :options="postData.availableCategories"
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
                v-model="selectedCity"
                :menu-header="menuHeader"
                :search-in-menu="searchInMenu"
                :options="postData.availableCities"
                text="Wybierz miasto"
                icon="map marker"
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
                :options="postData.availableSkillLevels"
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
      <div class="active section">Studenci</div>
    </div>

    <div class="ui link items">
      <Item 
        v-for="post in postData.posts"
        :key="post.id" 
        :post="post"
        :data="postData"
        @refreshdev="refreshdev"/>
    </div>
  </div>
</template>

<script>
import Item from '~/components/Student/Item.vue'

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
      .$get(`/api/post`)
      .then(postData => {
        return {
          postData
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    refreshdev() {
      this.$axios
        .$get(`/api/post`)
        .then(data => {
          this.postData = data
        })
        .catch(e => console.log(e))
    },
    update() {
      this.$axios
        .$get(`/api/post/`, {
          params: {
            categoryId: this.selectedCategory,
            cityId: this.selectedCity,
            skillLevelId: this.selectedLevel
          }
        })
        .then(data => {
          this.postData = data
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
