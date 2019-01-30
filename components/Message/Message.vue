<template>
  <div class="ui feed">
    <div class="event">
      <div class="label">
        <img :src="getAvatarUri(avatar_id)">
      </div>
      <div class="content">
        <div class="summary">
          {{ message }}
        </div>
        <div class="date">
          {{ prettyDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { AvatarHandlerMixin } from '~/mixins/AvatarHandler.js'

export default {
  mixins: [AvatarHandlerMixin()],
  props: {
    avatar_id: {
      type: Number,
      required: false,
      default: null
    },
    message: {
      type: String,
      required: false,
      default: ''
    },
    date: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    prettyDate() {
      moment.locale('pl')
      console.log(moment.locale())
      return moment(this.date)
        .add(1, 'hour')
        .fromNow()
    }
  }
}
</script>
