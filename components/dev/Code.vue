<template>
  <pre>{{ prettyPrintedData }}</pre>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => undefined,
      required: false
    }
  },
  computed: {
    prettyPrintedData() {
      return this.data !== null ? JSON.stringify(this.data, null, 2) : ''
    }
  }
}
</script>
