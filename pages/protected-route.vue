<template>
  <div>
    <p>This is a secure page!</p>
    <Code :data="$auth.$state" />
    <button @click="$auth.logout()">Logout</button>
  </div>
</template>

<script>
import Code from '~/components/dev/Code.vue'

export default {
  layout: 'text-container',
  middleware: 'auth',
  components: {
    Code
  }
}
</script>
