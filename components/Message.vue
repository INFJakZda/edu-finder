<template>
  <div :class="['ui', visibleClass, ...attachedClasses, iconClassMessage, type, 'message']">
    <i
      v-if="closable"
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
      validator: function(value) {
        return ['positive', 'info', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    icon: {
      type: String,
      default: () => '',
      required: false
    },
    closable: {
      type: Boolean,
      default: () => false,
      required: false
    },
    attached: {
      type: String,
      default: () => '',
      required: false,
      validator: function(value) {
        return ['bottom', 'top', ''].indexOf(value) !== -1
      }
    },
    visible: {
      type: Boolean,
      default: () => true,
      required: false
    }
  },
  computed: {
    isHeaderSet: function() {
      return this.header.length !== 0
    },
    isMessageSet: function() {
      return this.message.length !== 0
    },
    isListSet: function() {
      return this.list.length !== 0
    },
    isIconSet: function() {
      return this.icon.length !== 0
    },
    attachedClasses: function() {
      if (this.attached.length !== 0) return ''
      return [this.attached, this.attached]
    },
    visibleClass: function() {
      return this.visible ? 'visible' : 'hidden'
    },
    iconClassMessage: function() {
      return this.icon.length !== 0 ? 'icon' : ''
    }
  },
  methods: {
    close: function() {
      this.visible = false
    }
  }
}
</script>
