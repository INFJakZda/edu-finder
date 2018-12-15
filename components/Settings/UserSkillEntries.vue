<template>
  <div>
    <p>ski</p>
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
      return this.$store.getters.userSkillEntries
    }
  }
}
</script>

<style>
</style>
