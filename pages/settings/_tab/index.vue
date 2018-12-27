<template>
  <div>
    <Main 
      :userData="loadedDetails" 
      @submit="onSubmited" />
  </div>
</template>

<script>
import Main from '~/components/Settings/Main'
import { categories } from '~/static/categories.json'

export default {
  validate({ params }) {
    return categories.find(ob => ob.link === params.tab)
  },
  components: {
    Main
  },
  data() {
    return {
      active: 'Education'
    }
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
          }
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    onSubmited(postData) {
      this.$axios
        .$post(
          `/api/user/${this.$store.state.auth.user.id}/${
            this.loadedDetails.loadedComponent
          }`,
          postData
        )
        .then(() => {})
        .catch(e => console.log(e))
    }
  }
}
</script>
