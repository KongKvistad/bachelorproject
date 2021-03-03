<template>
  <div class="container-fluid">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <div class="container">
      <div class="row">
        <h1>Logg inn</h1>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="row justify-content-center col2">
        <form v-if="showLoginForm" @submit.prevent>
          <div class="row">
            <div class="col-6">
              <label for="email1">Epost</label>
              <input v-model.trim="loginForm.email" type="text" placeholder="deg@email.com" id="email1" />
            </div>
            <div class="col-6">
              <label for="password1">Passord</label>
              <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
              <a @click="togglePasswordReset()">Glemt passord</a>
            </div>
          </div>
          <div class="row">
          <div class="col-12">
          <button @click="login()" class="button">Logg inn</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>
