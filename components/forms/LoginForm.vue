<template>
  <section>
    <Message
      :list="errorMessages"
      :visible="errorsOccured"
      header="Errors occured!"
      type="error"
      icon="exclamation"
      closable />

    <h2 class="ui top attached header">Login</h2>
    <div class="ui attached segment">
      <form class="ui form">
        <TextField
          :model.sync="email"
          :error="isFieldEmailIncorrect"
          label="Email"
          name="Email"
          type="text"
          placeholder="Email" />

        <TextField
          :model.sync="password"
          :error="isFieldPasswordIncorrect"
          label="Password"
          name="Password"
          type="password"
          placeholder="Password" />

        <button
          class="fluid ui button primary"
          @submit.prevent
          @click.prevent="login()">Login</button>
      </form>
    </div>
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
  components: {
    Message,
    TextField
  },
  data: function() {
    return {
      email: '',
      password: '',
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
    isFieldEmailIncorrect: function() {
      const errors = this.errors
      return isFieldIncorrect(errors, 'Email')
    },
    isFieldPasswordIncorrect: function() {
      const errors = this.errors
      return isFieldIncorrect(errors, 'Password')
    }
  },
  methods: {
    login: function() {
      this.$axios
        .$post('/api/account/signin', {
          email: this.email,
          password: this.password
        })
        .then(token => {
          this.response = token
        })
        .catch(error =>
          formErrorHandler(
            error,
            'User does not exist, check your email and password.',
            error => {
              this.errors.push(error)
              console.log(error)
            },
            () => (this.errors = [])
          )
        )
    }
  }
}
</script>
