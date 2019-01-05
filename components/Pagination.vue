<template>
  <div class="ui pagination menu">
    <a 
      v-if="arrows" 
      :class="{ disabled: !isPreviousActive, item: true }"
      @click.prevent="() => previousPage()">
      <icon :icon="['fas', 'arrow-left']" />
    </a>
    <a 
      v-for="(item, key) in getIds"
      :class="{ item: true, active: item.isActive, disabled: item.isDisabled }" 
      :key="key"
      @click.prevent="() => setPage(item.page)">
      {{ item.page }}
    </a>
    <a 
      v-if="arrows" 
      :class="{ disabled: !isNextActive, item: true }" 
      @click.prevent="() => nextPage()">
      <icon :icon="['fas', 'arrow-right']" />
    </a>
  </div>
</template>

<script>
import { isFunction } from 'lodash'

export default {
  props: {
    pages: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: false,
      default: 1
    },
    size: {
      type: Number,
      required: false,
      default: 5
    },
    arrows: {
      type: Boolean,
      required: false,
      default: true
    },
    callback: {
      type: Function,
      required: false,
      default: () => new Function()
    }
  },
  data: function() {
    return {
      page: this.activePage
    }
  },
  computed: {
    isPreviousActive() {
      return this.page > 1
    },
    isNextActive() {
      return this.page < this.pages
    },
    getIds() {
      let v = []
      let centroid = Math.floor(this.size / 2)
      let start = this.page <= centroid ? 1 : this.page - centroid
      for (let id = start; id < start + this.size; ++id) {
        v.push({
          page: id,
          isActive: this.isActive(id),
          isDisabled: !this.isValid(id)
        })
      }
      return v
    }
  },
  watch: {
    page(value) {
      if (!this.disabled) {
        this.$emit('update:activePage', value)
      }
    }
  },
  methods: {
    isValid(id) {
      return id >= 1 && id <= this.pages
    },
    isActive(id) {
      return id == this.page
    },
    setPage(id) {
      if (this.isValid(id)) {
        this.page = id

        if (isFunction(this.callback)) {
          this.callback(this.page)
        }
      }
    },
    nextPage() {
      if (this.page < this.pages) {
        this.setPage(this.page + 1)
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.setPage(this.page - 1)
      }
    }
  }
}
</script>
