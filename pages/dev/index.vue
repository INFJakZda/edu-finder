<template>
  <Code :data="getAuthData()" />
</template>

<script>
import Code from '~/components/dev/Code.vue'

export default {
  components: { Code },
  methods: {
    getAuthData() {
      if (this.$auth) {
        return this.$auth.user
      }

      return {}
    }
  }
}
</script>
