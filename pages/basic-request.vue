<template>
  <section>
    <h1>{{ title }}</h1>
    <pre>{{ getValues }}</pre>
    <button
      class="ui primary button"
      @click="fetchValues()">Fetch values!</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Basic backend request',
      values: undefined
    }
  },
  computed: {
    getValues() {
      return this.values === undefined ? 'No data yet.' : this.values.join('\n')
    }
  },
  methods: {
    async fetchValues() {
      this.values = await this.$axios.$get('/api/values')
    }
  }
}
</script>
