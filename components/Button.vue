<template>
  <button 
    :class="computedClasses" 
    @click.prevent="click()">
    <icon
      v-if="icon !== null"
      :icon="['fas', icon]"/>
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    modifiers: {
      type: Array,
      required: false,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    computedClasses() {
      const base = ['ui', 'button']
      let disabled = this.disabled === true ? ['disabled'] : []
      let loading = this.loading ? ['loading'] : []
      return base
        .concat(this.modifiers)
        .concat(disabled)
        .concat(loading)
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
