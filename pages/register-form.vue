<template>
  <form class="ui form">
    <div class="required field">
      <label>Username</label>
      <input
        v-model="username"
        type="text"
        name="username"
        placeholder="Username">
    </div>
    <div class="required field">
      <label>E-mail</label>
      <input
        v-model="email"
        type="text"
        name="email"
        placeholder="E-mail">
    </div>
    <div class="required field">
      <label>Confirm E-mail</label>
      <input
        v-model="confirmEmail"
        type="text"
        name="confirm-email"
        placeholder="E-mail">
    </div>
    <div class="required field">
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Password">
    </div>
    <div class="required field">
      <label>Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="password"
        name="confirm-password"
        placeholder="Password">
    </div>
    <button
      class="ui button primary"
      @submit.prevent
      @click.prevent="register()">Register</button>
  </form>
</template>

<script>
import Code from '~/components/Code.vue'

export default {
  layout: 'text-container',
  components: {
    Code
  },
  data: function() {
    return {
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      error: false,
      error_message: '',
      response: null
    }
  },
  methods: {
    register: function() {
      this.$axios
        .$post('/api/account/register', {
          username: this.username,
          email: this.email,
          confirmEmail: this.confirmEmail,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        .then(response => response.json())
        .then(response => {
          this.response = response
        })
        .catch(error => {
          this.error_message = 'Unknown error'

          if (error.response) {
            if (error.response.data) {
              this.error_message =
                'errorMessage' in error.response.data
                  ? error.response.data.errorMessage
                  : 'Unknown error'
            }
          }

          this.error = true
        })
    }
  }
}
</script>
