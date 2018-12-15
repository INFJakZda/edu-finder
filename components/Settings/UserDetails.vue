<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="submitForm">
      <h4 class="ui dividing header">User datails info</h4>
      <div class="field">
        <label>User Name</label>
        <input
          v-model="userDetails.username"
          type="text"
          name="shipping[first-name]"
          placeholder="Nick"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          v-model="userDetails.email"
          type="text"
          name="shipping[email]"
          placeholder="example@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Bio</label>
        <textarea
          v-model="userDetails.bioText"
          rows="4"
          placeholder="Tell us few word about you :)"
        />
      </div>

      <div class="field">
        <label>City</label>
        <sui-dropdown
          v-model.number="cityUser"
          :options="userDetails.availableCities"
          :placeholder="userDetails.city.name"
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
  data() {
    return {
      current: null
    }
  },
  computed: {
    userDetails: {
      get() {
        return this.$store.getters.userDetails
      },
      set(value) {
        this.$store.commit('setUserDetails', value)
      }
    },
    cityUser: {
      get() {
        return this.$store.getters.userDetails.cityId
      },
      set(value) {
        this.$store.commit('setUserCity', value)
      }
    }
  },
  methods: {
    submitForm() {
      let post = {
        ...this.$store.getters.userDetails,
        id: 3
      }
      console.log(post)
    }
  }
}
</script>

<style>
</style>
