<template>
  <section>
    <Message
      v-if="errorStatus !== 404"
      :list="errorMessages"
      :visible="errorApiResponse"
      header="Errors occured!"
      type="error"
      icon="exclamation"
      closeable />

    <Message
      v-if="errorStatus === 404"
      header="User not found"
      message="Please check your email and password and try again."
      type="error"
      icon="exclamation"
      closeable />

    <h2 class="ui top attached header">Login</h2>
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
import FormInput from '~/components/FormInput.vue'
import { FormErrorHandlerMixin } from '~/mixins/FormErrorHandler.js'

export default {
  components: {
    Message,
    FormInput
  },
  mixins: [FormErrorHandlerMixin(['Email', 'Password'])],
  data: function() {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login: function() {
      this.$axios
        .$post('/api/account/signin', this.input)
        .then(token => {
          console.log(token)
        })
        .catch(this.errorHandler)
    }
  }
}
</script>
