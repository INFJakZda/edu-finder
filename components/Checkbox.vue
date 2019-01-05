<template>
  <div :class="getClasses">
    <input 
      v-model="input"
      :disabled="disabled"
      type="checkbox">
    <label>{{ text }}</label>
  </div>
</template>
  

<script>
import { includes } from 'lodash'

export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    model: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: '',
      validator: v => includes(['', 'radio', 'slider', 'toggle'], v)
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      input: this.model
    }
  },
  computed: {
    getClasses() {
      return ['ui']
        .concat(this.disabled ? ['disabled'] : [])
        .concat(this.type)
        .concat(['checkbox'])
    }
  },
  watch: {
    input(value) {
      if (!this.disabled) {
        this.$emit('update:model', value)
      }
    }
  }
}
</script>
