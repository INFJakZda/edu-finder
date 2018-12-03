<template>
  <div :class="['ui', visibleClass, ...attachedClasses, iconClassMessage, type, 'message']">
    <i
      v-if="closeable"
      class="close icon"
      @click.prevent="close()" />
    <i
      v-if="isIconSet"
      :class="['icon', icon ]" />
    <div class="content">
      <div
        v-if="isHeaderSet"
        class="header">{{ header }}</div>
      <p v-if="isMessageSet">{{ message }}</p>
      <p v-if="isListSet">
        <ul
          v-for="(item, key) in list"
          :key="key"
          class="list">
          <li>{{ item }}</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import { includes } from 'lodash'

export default {
  props: {
    header: {
      type: String,
      default: () => '',
      required: false
    },
    message: {
      type: String,
      default: () => '',
      required: false
    },
    list: {
      type: Array,
      default: () => [],
      required: false
    },
    type: {
      type: String,
      default: () => 'info',
      required: false,
      validator: v => includes(['positive', 'info', 'warning', 'error'], v)
    },
    icon: {
      type: String,
      default: () => '',
      required: false
    },
    closeable: {
      type: Boolean,
      default: () => false,
      required: false
    },
    attached: {
      type: String,
      default: () => '',
      required: false,
      validator: v => includes(['bottom', 'top', ''], v)
    },
    visible: {
      type: Boolean,
      default: () => true,
      required: false
    }
  },
  computed: {
    isHeaderSet() {
      return this.header.length !== 0
    },
    isMessageSet() {
      return this.message.length !== 0
    },
    isListSet() {
      return this.list.length !== 0
    },
    isIconSet() {
      return this.icon.length !== 0
    },
    attachedClasses() {
      return this.attached.length !== 0 ? [this.attached, 'attached'] : ''
    },
    visibleClass() {
      return this.visible ? 'visible' : 'hidden'
    },
    iconClassMessage() {
      return this.icon.length !== 0 ? 'icon' : ''
    }
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>
