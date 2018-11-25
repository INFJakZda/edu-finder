<template>
  <div class="ui middle aligned centered grid">
    <div class="row">
      <Code :data="response" />
    </div>
    <div class="row">
      <div class="five wide column">
        <div
          v-if="error"
          class="ui bottom attached error message">
          <i class="ban icon"/> {{ error_message }}
        </div>
        <h2 class="ui top attached header">Login</h2>
        <div class="ui attached segment">
          <form class="ui form">
            <div class="field">
              <label>E-mail</label>
              <input
                v-model="email"
                type="text"
                name="email"
                placeholder="E-mail">
            </div>
            <div class="field">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                name="password"
                placeholder="Password">
            </div>
            <button
              class="fluid ui button primary"
              @submit.prevent
              @click.prevent="login()">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Code from '~/components/Code.vue'

export default {
  components: {
    Code
  },
  data: function() {
    return {
      email: '',
      password: '',
      error: false,
      error_message: '',
      response: null
    }
  },
  methods: {
    login: function() {
      this.$axios
        .$post('/api/account/signin', {
          email: this.email,
          password: this.password
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

      console.log('Login action triggered!')
    }
  }
}
</script>
