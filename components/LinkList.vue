<template>
  <section>
    <h1 v-if="title !== undefined">{{ title }}</h1>
    <ul>
      <div
        v-for="(item, key) in items"
        :key="key"
        class="ui list">
        <div class="item">
          <nuxt-link
          :to="item.link">{{ item.name }}</nuxt-link>{{ item.description !== undefined ? ' - ' + item.description : '' }}
        </div>
      </div>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => undefined,
      required: false
    },
    items: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>
