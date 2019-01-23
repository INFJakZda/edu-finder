<template>
  <div>
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
