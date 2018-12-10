<template>
  <div>
    <p>contactetries</p>
  </div>
</template>

<script>
export default {
  computed: {
    userDetails() {
      return this.$store.getters.userContactEntries
    }
  }
}
</script>

<style>
</style>
