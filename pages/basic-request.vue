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
  layout: 'text-container',
  data: function() {
    return {
      api_endpoint: '/api/values',
      title: 'Basic backend request',
      values: undefined
    }
  },
  computed: {
    getValues() {
      return this.values === undefined ? 'Brak danych.' : this.values.join('\n')
    }
  },
  methods: {
    async fetchValues() {
      this.values = await this.$axios.$get(this.api_endpoint)
    }
  }
}
</script>
