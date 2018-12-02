<template>
  <div :class="{ field: true, error, required }">
    <label>{{ label }}</label>
    <input
      v-model="input"
      :type="type"
      :name="name"
      :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: () => '',
      required: true
    },
    label: {
      type: String,
      default: () => '',
      required: false
    },
    type: {
      type: String,
      default: () => 'text',
      required: false,
      validator: function(value) {
        return ['text', 'password'].indexOf(value) !== -1
      }
    },
    placeholder: {
      type: String,
      default: () => '',
      required: false
    },
    error: {
      type: Boolean,
      default: () => false,
      required: false
    },
    required: {
      type: Boolean,
      default: () => false,
      required: false
    }
  },
  data: function() {
    return {
      input: this.model
    }
  },
  watch: {
    input: function(value) {
      this.$emit('update:model', value)
    }
  }
}
</script>
