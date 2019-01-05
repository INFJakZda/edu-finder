<template>
  <div class="ui vertical basic buttons">
    <button 
      :class="upButtonClass" 
      @click.prevent="up()"><icon 
        :icon="['fas', 'chevron-up']" 
        :class="upIconClass" /></button>
    <span class="ui basic label">
      {{ value + voteState | padding }}
    </span>
    <button 
      :class="downButtonClass" 
      @click.prevent="down()"><icon 
        :icon="['fas', 'chevron-down']" 
        :class="downIconClass" /></button>
  </div>
</template>

<style>
.active-rating {
  color: #0e6eb8;
}
</style>

<script>
import { includes, pad, isFunction } from 'lodash'

export default {
  filters: {
    padding(v) {
      return pad(v, 8, '\xA0')
    }
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 0
    },
    vote: {
      type: Number,
      required: false,
      default: 0,
      validator: v => includes([-1, 0, 1], v)
    },
    voteCallback: {
      type: Function,
      required: false,
      default: () => new Function()
    }
  },
  data: function() {
    return {
      voteState: this.vote
    }
  },
  computed: {
    baseButtonClass() {
      return ['ui', 'massive', 'labeled', 'button']
    },
    upButtonClass() {
      return this.voteState == 1
        ? this.baseButtonClass.concat(['disabled'])
        : this.baseButtonClass
    },
    downButtonClass() {
      return this.voteState == -1
        ? this.baseButtonClass.concat(['disabled'])
        : this.baseButtonClass
    },
    upIconClass() {
      return this.voteState == 1 ? ['active-rating'] : []
    },
    downIconClass() {
      return this.voteState == -1 ? ['active-rating'] : []
    }
  },
  methods: {
    up() {
      if (this.voteState < 1) {
        this.voteState += 1

        if (isFunction(this.voteCallback)) {
          this.voteCallback(this.voteState)
        }
      }
    },
    down() {
      if (this.voteState > -1) {
        this.voteState -= 1

        if (isFunction(this.voteCallback)) {
          this.voteCallback(this.voteState)
        }
      }
    }
  }
}
</script>
