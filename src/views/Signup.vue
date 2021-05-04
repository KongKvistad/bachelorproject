<template>
    <section id="signup">

      <h1>Opprett bruker for din bedrift</h1>
      <div>
        <p>Registrer deg for å delta i praksissordningen ved Institutt for design ved NTNU Gjøvik</p>
        <p>Har du allerede en bruker? <a href="login">Logg inn</a> isteden.</p>
      </div>
        <form class="signUpForm"  @submit.prevent>
          <div class="field full">
            <label for="business">Navn på bedrift</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Super Company" id="business" />
          </div>
          <div class="field full">
            <label for="email">E-post</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="deg@mail.com" id="email" />
          </div>
          <div class="field">
            <label for="pass">Passord</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="******" id="pass" />
          </div>
          <div class="field">
            <label for="conf_pass">Bekreft passord</label>
            <input v-model.trim="signupForm.conf_pass" type="password" placeholder="******" id="conf_pass" />
          </div>
          <div class="field">
            <label for="contact">Navn på kontaktperson</label>
            <input v-model.trim="signupForm.contact" type="text" placeholder="Ola Nord" id="contact" />
          </div>
          <div class="field">
            <label for="phone">Tlf kontaktperson</label>
            <input v-model.trim="signupForm.phone" type="text" placeholder="41352465" id="phone" />
          </div>
          
           <div class="field select">
            <label for="industry">Bransje</label>
            <v-select v-on:input="e => signupForm.selected = e" id="industry" :placeholder="signupForm.selected" :options = "signupForm.options"></v-select>
          </div>
          <div class="field">
            <label for="location">Lokasjon</label>
            <input v-model.trim="signupForm.location" type="text" placeholder="Hamar" id="location" />
          </div>
           <div class="field full">
           <label for="upload">Last opp bilde/logo</label>
            <ImgUpload id="upload" v-on:imgUpload="imageUploaded"/>
           </div>
          <div class="field full">
            <label for="about">Om bedriften</label>
            <textarea v-model.trim="signupForm.about" type="text" placeholder="Beskrivelse av bedriften" id="about" />
          </div>
         
          <div>
          <input type="checkbox" name="" id="">
          Jeg bekrefter at ved å klikke på "Registrer bruker" godtar jeg <a>vilkår og betingelser</a>
          </div>
          <button class="button" @click="signup()">Registrer bruker</button>

        </form>
        <div class="col-md-12 d-flex justify-content-center">
          <p class="text-underline"><a href="login">Tilbake til innlogging</a></p>
        </div>
        </section>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'

export default {
  components: {
  ImgUpload
},
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
        image_url: '',
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
      this.$store.dispatch('signup', this.signupForm).then(() => {
        this.$router.push("/")
      })
    },
    imageUploaded(val){ 
      console.log(val)
      let url = val[0];
      this.signupForm.image_url = url;
    },
  }
}
</script>
