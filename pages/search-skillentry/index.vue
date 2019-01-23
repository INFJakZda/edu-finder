<template>
  <div>
    <div class="ui menu borderless dev-color">
      <div class="item">
        <h3 class="header">
          Dodane posty <i class="level down alternate icon"/>
        </h3>
      </div>
      <div class="right item">
        <button 
          class="positive ui button"
          @click="$router.push('/post/add')">
          <i class="add icon"/>
          Dodaj post
        </button>
      </div>
    </div>
      
    <Item 
      v-for="entry in entryData.skillEntries"
      :key="entry.id" 
      :entry="entry"
      :data="entryData"
      @refresh="refresh"/>
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
    refresh() {
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
