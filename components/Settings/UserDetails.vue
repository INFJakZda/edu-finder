<template>
  <div>
    <p>details</p>
  </div>
</template>

<script>
export default {
  computed: {
    userDetails() {
      return this.$store.getters.userDetails
    }
  }
}
</script>

<style>
</style>
