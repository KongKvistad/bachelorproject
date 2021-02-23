<template>
    <section id="signup">
        <form  @submit.prevent>
          <div class="field full">
            <label for="business">Navn på bedrift</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="business" />
          </div>
          <div class="field full">
            <label for="email">Mail</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="Savvy Apps" id="email" />
          </div>
          <div class="field">
            <label for="pass">Passord</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="Savvy Apps" id="pass" />
          </div>
          <div class="field">
            <label for="conf_pass">Bekreft passord</label>
            <input v-model.trim="signupForm.conf_pass" type="password" placeholder="Savvy Apps" id="conf_pass" />
          </div>
          <div class="field">
            <label for="contact">Kontaktperson</label>
            <input v-model.trim="signupForm.contact" type="text" placeholder="Savvy Apps" id="contact" />
          </div>
          <div class="field">
            <label for="phone">Kontakt TLF</label>
            <input v-model.trim="signupForm.phone" type="text" placeholder="Savvy Apps" id="phone" />
          </div>
          
           <div class="field select">
            <label for="industry">Bransje</label>
            <v-select v-on:input="e => signupForm.selected = e" id="industry" :placeholder="signupForm.selected" :options = "signupForm.options"></v-select>
          </div>
          <div class="field">
            <label for="location">lokasjon</label>
            <input v-model.trim="signupForm.location" type="text" placeholder="Savvy Apps" id="location" />
          </div>
          <div class="field full">
            <label for="about">Om bedriften</label>
            <textarea v-model.trim="signupForm.about" type="text" placeholder="Savvy Apps" id="about" />
          </div>
         
          <button @click="signup()">Registrer</button>
        </form>
        </section>
</template>

<script>


export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
        conf_pass: '',
        contact: '',
        phone: '',
        location: '',
        about: '',
        role: 'company',
        selected: 'IT',
        options: [
        "IT",
        "Helse",
        "Forsvar"
        ]
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', this.signupForm)
    }
  }
}
</script>
