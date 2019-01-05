<template>
  <div>
    <Main 
      :userData="loadedDetails" 
      @refresh="onRefresh" />
  </div>
</template>

<script>
import Main from '~/components/Settings/Main'
import { categories } from '~/static/categories.json'

export default {
  validate({ params }) {
    return categories.find(ob => ob.link === params.tab)
  },
  middleware: 'auth',
  components: {
    Main
  },
  asyncData(context) {
    return context.app.$axios
      .$get(
        `/api/user/${context.store.state.auth.user.id}/${context.params.tab}`
      )
      .then(userData => {
        return {
          loadedDetails: {
            ...userData,
            loadedComponent: context.params.tab
          },
          savedComponent: context.params.tab
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    onRefresh() {
      this.$axios
        .$get(
          `/api/user/${this.$store.state.auth.user.id}/${this.savedComponent}`
        )
        .then(userData => {
          this.loadedDetails = {
            ...userData,
            loadedComponent: this.savedComponent
          }
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
