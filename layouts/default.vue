<template>
  <div class="dev-margin">
    <TheHeader /> 
    <div class="ui main text container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>

<style scoped>
.dev-margin {
  padding-bottom: 30px;
}
</style>
