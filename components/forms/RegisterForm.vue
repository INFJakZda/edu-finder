<template>
  <section>
    <form class="ui form">

      <Message
        :list="errorMessages"
        :visible="errorApiResponse"
        header="Wystąpiły błędy"
        type="error"
        icon="exclamation"
        closeable />

      <FormInput
        :model.sync="input.username"
        :error="isPropertyInErrorState('Username')"
        :change="() => setPropertyDirty('Username')"
        label="Nazwa użytkownika"
        name="Username"
        type="text"
        placeholder="Nazwa użytkownika"
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
        label="Potwierdź email"
        name="ConfirmEmail"
        type="text"
        placeholder="Email"
        required />

      <FormInput
        :model.sync="input.password"
        :error="isPropertyInErrorState('Password')"
        :change="() => setPropertyDirty('Password')"
        label="Hasło"
        name="Password"
        type="password"
        placeholder="Hasło"
        required />

      <FormInput
        :model.sync="input.confirmPassword"
        :error="isPropertyInErrorState('ConfirmPassword')"
        :change="() => setPropertyDirty('ConfirmPassword')"
        label="Potwierdź hasło"
        name="ConfirmPassword"
        type="password"
        placeholder="Hasło"
        required />

      <button
        class="ui button primary"
        @submit.prevent
        @click.prevent="register()">Zarejestruj</button>
    </form>
  </section>
</template>

<script>
import Message from '~/components/Message.vue'
import FormInput from '~/components/FormInput.vue'
import { FormErrorHandlerMixin } from '~/mixins/FormErrorHandler.js'

export default {
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
  data() {
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
    register() {
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
