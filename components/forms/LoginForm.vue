<template>
  <section>
    <Message
      v-if="errorStatus !== 404"
      :list="errorMessages"
      :visible="errorApiResponse"
      header="Wystąpiły błędy"
      type="error"
      icon="exclamation"
      closeable />

    <Message
      v-if="errorStatus === 404"
      header="Nie znaleziono użytkownika"
      message="Sprawdź hasło oraz adres email i spróbuj ponownie."
      type="error"
      icon="exclamation"
      closeable />

    <h2 class="ui top attached header">Logowanie</h2>
    <div class="ui attached segment">
      <form class="ui form">
        <FormInput
          :model.sync="input.email"
          :error="isPropertyInErrorState('Email')"
          :change="() => setPropertyDirty('Email')"
          label="Email"
          name="Email"
          type="text"
          placeholder="Email" />

        <FormInput
          :model.sync="input.password"
          :error="isPropertyInErrorState('Password')"
          :change="() => setPropertyDirty('Password')"
          label="Hasło"
          name="Password"
          type="password"
          placeholder="Hasło" />

        <button
          class="fluid ui button primary"
          @submit.prevent
          @click.prevent="login()">Zaloguj</button>
      </form>
    </div>
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
  mixins: [FormErrorHandlerMixin(['Email', 'Password'])],
  data() {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('local', {
        data: this.input
      })
    }
  }
}
</script>
