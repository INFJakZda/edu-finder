<template>
  <div>
    <p>ski</p>
  </div>
</template>

<script>
export default {
  computed: {
    userDetails() {
      return this.$store.getters.userSkillEntries
    }
  }
}
</script>

<style>
</style>
