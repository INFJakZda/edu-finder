<template>
  <section>
    <form class="ui form">

      <Message
        :list="errorMessages"
        :visible="errorApiResponse"
        header="Errors occured!"
        type="error"
        icon="exclamation"
        closeable />

      <FormInput
        :model.sync="input.username"
        :error="isPropertyInErrorState('Username')"
        :change="() => setPropertyDirty('Username')"
        label="Username"
        name="Username"
        type="text"
        placeholder="Username"
        required />

      <FormInput
        :model.sync="input.email"
        :error="isPropertyInErrorState('Email')"
        :change="() => setPropertyDirty('Email')"
        label="Email"
        name="Email"
        type="text"
        placeholder="Email"
        required />

      <FormInput
        :model.sync="input.confirmEmail"
        :error="isPropertyInErrorState('ConfirmEmail')"
        :change="() => setPropertyDirty('ConfirmEmail')"
        label="Confirm Email"
        name="ConfirmEmail"
        type="text"
        placeholder="Email"
        required />

      <FormInput
        :model.sync="input.password"
        :error="isPropertyInErrorState('Password')"
        :change="() => setPropertyDirty('Password')"
        label="Password"
        name="Password"
        type="password"
        placeholder="Password"
        required />

      <FormInput
        :model.sync="input.confirmPassword"
        :error="isPropertyInErrorState('ConfirmPassword')"
        :change="() => setPropertyDirty('ConfirmPassword')"
        label="Confirm Password"
        name="ConfirmPassword"
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
import FormInput from '~/components/FormInput.vue'
import { FormErrorHandlerMixin } from '~/mixins/FormErrorHandler.js'

export default {
  layout: 'text-container',
  components: {
    Message,
    FormInput
  },
  mixins: [
    FormErrorHandlerMixin([
      'Username',
      'Email',
      'Password',
      'ConfirmEmail',
      'ConfirmPassword'
    ])
  ],
  data: function() {
    return {
      input: {
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    register: function() {
      this.$axios
        .$post('/api/account/register', this.input)
        .then(response => response.json())
        .then(response => {
          console.log(JSON.stringify(response))
        })
        .catch(this.errorHandler)
    }
  }
}
</script>
