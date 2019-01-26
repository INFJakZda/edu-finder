<template>
  <div class="dev-margin">
    <TheHeader /> 
    <nuxt/>
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
.ui.menu {
  margin: 0px;
}
</style>
