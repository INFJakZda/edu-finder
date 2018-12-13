<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent>
      <h4 class="ui dividing header">User datails info</h4>
      <div class="field">
        <label>User Name</label>
        <input
          :value="userDetails.username"
          type="text"
          name="shipping[first-name]"
          placeholder="Nick"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          :value="userDetails.email"
          type="text"
          name="shipping[email]"
          placeholder="example@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Bio</label>
        <textarea
          :value="userDetails.bioText"
          rows="4"
          placeholder="Tell us few word about you :)"/>
      </div>
      
      <div class="field">
        <label>City</label>
        <sui-dropdown
          :options="cities"
          :value="userDetails.city.name"
          fluid
          placeholder="Select City"
          search
          selection
        />
      </div>

      <div 
        class="ui button" 
        tabindex="0">Submit</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        { key: 'AL', value: 'AL', text: 'Poznań' },
        { key: 'AK', value: 'AK', text: 'Warszawa' },
        { key: 'AZ', value: 'AZ', text: 'Wrocław' },
        { key: 'AR', value: 'AR', text: 'Kraków' }
      ]
    }
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails
    }
  }
}
</script>

<style>
</style>
