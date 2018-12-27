<template>
  <div>
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
