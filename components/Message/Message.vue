<template>
  <div class="ui feed">
    <div class="event">
      <div class="label">
        <img src="http://simpleicon.com/wp-content/uploads/add-user.png">
      </div>
      <div class="content">
        <div class="date">
          {{ prettyDate }}
        </div>
        <div class="summary">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
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
      return moment(this.date).fromNow()
    }
  }
}
</script>
