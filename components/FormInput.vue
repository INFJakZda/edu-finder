<template>
  <div :class="{ field: true, error, required, disabled }">
    <label>{{ label }}</label>
    <input
      v-model="input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @focus.prevent="onFocus()"
      @blur.prevent="onBlur()"
      @change.prevent="onChange()">
    <aside v-if="displayErrors">
      <small class="helper">
        <div class="ui list">
          <div
            v-for="(error, key) in errorList"
            :key="key"
            class="item right arrow icon">
            {{ error }}
          </div>
        </div>
      </small>
    </aside>
  </div>
</template>

<script>
import '~/assets/styles/form-helper-text.css'
import { isFunction, includes } from 'lodash'

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
      validator: v => includes(['text', 'password'], v)
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
    },
    disabled: {
      type: Boolean,
      default: () => false,
      required: false
    },
    loading: {
      type: Boolean,
      default: () => false,
      required: false
    },
    focus: {
      type: Function,
      default: () => null,
      required: false
    },
    blur: {
      type: Function,
      default: () => null,
      required: false
    },
    change: {
      type: Function,
      default: () => null,
      required: false
    },
    errorList: {
      type: Array,
      default: () => [],
      required: false
    },
    constraints: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      input: this.model
    }
  },
  computed: {
    displayErrors() {
      return this.errorList.length !== 0
    }
  },
  watch: {
    input(value) {
      this.$emit('update:model', value)
    }
  },
  methods: {
    onFocus() {
      if (isFunction(this.focus)) {
        this.focus()
      }
    },
    onBlur() {
      // TODO: if constraints are provided, validate field constraints
      if (isFunction(this.blur)) {
        this.blur()
      }
    },
    onChange() {
      if (isFunction(this.change)) {
        this.change()
      }
    }
  }
}
</script>
