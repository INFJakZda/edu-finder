<template>
  <div>
    <p>eductaions</p>
  </div>
</template>

<script>
export default {
  computed: {
    userDetails() {
      return this.$store.getters.userEducationEntries
    }
  }
}
</script>

<style>
</style>
