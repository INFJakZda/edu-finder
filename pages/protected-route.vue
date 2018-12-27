<template>
  <div>
    <p>This is a secure page!</p>
    <Code :data="$auth.$state" />
    <button
      class="ui primary button"
      @click="$auth.logout()">Logout</button>
  </div>
</template>

<script>
import Code from '~/components/dev/Code.vue'

export default {
  middleware: 'auth',
  components: {
    Code
  }
}
</script>
