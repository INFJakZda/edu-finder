<template>
  <div>
    <sui-list 
      divided 
      relaxed>

      <sui-list-item 
        v-for="education in user" 
        :key="education.id">
        <sui-list-icon 
          name="university" 
          size="large" 
          vertical-align="middle" />
        <sui-list-content>
          <sui-list-header>{{ education.university ? education.university.name : 'CHUUJ' }}</sui-list-header>
          <sui-list-description>{{ education.department ? education.department.name : "CHOOY" }}</sui-list-description>
        </sui-list-content>
      </sui-list-item>

    </sui-list>
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
