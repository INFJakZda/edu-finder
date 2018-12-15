<template>
  <div>
    <p>contactetries</p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userDetails() {
      return this.$store.getters.userContactEntries
    }
  }
}
</script>

<style>
</style>
