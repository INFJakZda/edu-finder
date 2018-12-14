<template>
  <button
    @click="onClick()"
    :class="{ primary, secondary }">
    {{ text }}
  </button>
</template>

<script>
import { isFunction } from 'lodash'

export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    primary: {
      type: Boolean,
      required: false,
      default: false
    },
    secondary: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    click: {
      type: Function,
      required: false,
      default: null
    }
  },
  methods: {
    onClick() {
      if (isFunction(this.click)) {
        this.click()
      }
    }
  }
}
</script>
