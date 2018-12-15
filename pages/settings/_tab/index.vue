<template>
  <div>
    <Main :userData="loadedDetails" />
  </div>
</template>

<script>
import Main from '~/components/Settings/Main'

export default {
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
        '/api/user/' +
          context.store.state.auth.user.id +
          '/' +
          context.params.tab
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
  }
}
</script>
