<template>
  <div>
    <p>eductaions</p>
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
      return this.$store.getters.userEducationEntries
    }
  }
}
</script>

<style>
</style>
