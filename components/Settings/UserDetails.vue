<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="submitForm">
      <h4 class="ui dividing header">User datails info</h4>
      <div class="field">
        <label>User Name</label>
        <input
          v-model="user.username"
          type="text"
          name="shipping[first-name]"
          placeholder="Nick"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          v-model="user.email"
          type="text"
          name="shipping[email]"
          placeholder="example@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Bio</label>
        <textarea
          v-model="user.bioText"
          rows="4"
          placeholder="Tell us few word about you :)"
        />
      </div>

      <div class="field">
        <label>City</label>
        <sui-dropdown
          v-model="user.cityId"
          :options="user.availableCities"
          :placeholder="user.city ? user.city.name : ''"
          search
          selection
        />
      </div>

      <button 
        class="ui button" 
        tabindex="0"
      >Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      current: null
    }
  },
  computed: {
    city() {
      return {}
    }
  },
  created() {
    this.user.cityId = this.user.cityId ? this.user.cityId.toString() : ''
  },
  methods: {
    submitForm() {
      let post = {
        username: this.user.username,
        email: this.user.email,
        cityId: +this.user.cityId,
        bioText: this.user.bioText,
        id: +this.$store.state.auth.user.id
      }
      this.$emit('submit', post)
    }
  }
}
</script>

<style>
</style>
