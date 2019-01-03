<template>
  <div>
    <TheHeader /> 
    <div class="ui main text container dev-margin">
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
<style>
.dev-margin {
  padding-bottom: 20px;
}
</style>
