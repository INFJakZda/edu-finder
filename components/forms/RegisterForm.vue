<template>
  <section>
    <form class="ui form">

      <Message
        :list="errorMessages"
        :visible="errorsOccured"
        header="Errors occured!"
        type="error"
        icon="exclamation"
        closable />

      <TextField
        :model.sync="username"
        :error="isFieldUsernameIncorrect"
        label="Username"
        name="Username"
        type="text"
        placeholder="Username"
        required />

      <TextField
        :model.sync="email"
        :error="isFieldEmailIncorrect"
        label="Email"
        name="Email"
        type="text"
        placeholder="Email"
        required />

      <TextField
        :model.sync="confirmEmail"
        :error="isFieldConfirmEmailIncorrect"
        label="Confirm Email"
        name="Confirm Email"
        type="text"
        placeholder="Email"
        required />

      <TextField
        :model.sync="password"
        :error="isFieldPasswordIncorrect"
        label="Password"
        name="Password"
        type="password"
        placeholder="Password"
        required />

      <TextField
        :model.sync="confirmPassword"
        :error="isFieldConfirmPasswordIncorrect"
        label="Confirm Password"
        name="Password"
        type="password"
        placeholder="Password"
        required />

      <button
        class="ui button primary"
        @submit.prevent
        @click.prevent="register()">Register</button>
    </form>
  </section>
</template>

<script>
import Message from '~/components/Message.vue'
import TextField from '~/components/form-elements/TextField.vue'
import {
  formErrorHandler,
  isFieldIncorrect
} from '~/helpers/form-error-handler.js'

export default {
  layout: 'text-container',
  components: {
    Message,
    TextField
  },
  data: function() {
    return {
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      errors: []
    }
  },
  computed: {
    errorMessages: function() {
      return this.errors.map(error => error.message)
    },
    errorsOccured: function() {
      return this.errors.length !== 0
    },
    isFieldUsernameIncorrect: function() {
      const errors = this.errors
      return isFieldIncorrect(errors, 'Username')
    },
    isFieldEmailIncorrect: function() {
      const errors = this.errors
      return isFieldIncorrect(errors, 'Email')
    },
    isFieldConfirmEmailIncorrect: function() {
      return this.confirmEmail.length !== 0 && this.confirmEmail !== this.email
    },
    isFieldPasswordIncorrect: function() {
      const errors = this.errors
      return isFieldIncorrect(errors, 'Password')
    },
    isFieldConfirmPasswordIncorrect: function() {
      return (
        this.confirmPassword.length !== 0 &&
        this.confirmPassword !== this.password
      )
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
          console.log(JSON.stringify(response))
        })
        .catch(error =>
          formErrorHandler(
            error,
            null,
            error => {
              this.errors.push(error)
              console.log(JSON.stringify(error))
            },
            () => (this.errors = [])
          )
        )
    }
  }
}
</script>
