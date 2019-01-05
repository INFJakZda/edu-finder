<template>
  <div 
    v-if="messages.length !== 0" 
    :class="classes">
    <div class="ui list">
      <div
        v-for="(message, key) in messages"
        :key="key"
        class="item right arrow icon">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => []
    },
    modifiers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    classes() {
      return ['ui', 'pointing', 'basic', 'label'].concat(this.modifiers)
    }
  }
}
</script>
