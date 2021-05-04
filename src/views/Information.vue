<!-- Informasjon/hjelpe side-->
<template>
  <div id="dashboard" class="main">
    <div class="container-fluid">
      <div class="container">
        <div class="row indexIntro">
          <div class="col-md-6 mobile-second">
            <h1>Informasjon</h1>
            <p>På denne siden finner du informasjon om hva det er forventet av deg som student i BeNet.
                Lenger ned finner du for for eksempel ofte stilte spørsmål som forhåpentligvis vil svare
                deg på det du lurer på. Finner du ikke svaret du er ute etter kan du ta kontakt med emneansvarlig.
            </p>
          </div>

          <div class="col-md-6 help-image">
            <img src="../assets/images/question.png" alt="Student som sitter ved en pult og søker på jobber på datamaskinen">
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 align-self-center">
            <h2>Spørsmål og svar</h2>
            
          <details>
            <summary> Hvor mange bedrifter kan jeg prioritere?</summary>
            <p>Du kan prioritere tre stk i løsningen</p>
          </details>
          <details>
            <summary> Hvordan sender jeg CV til bedriften?</summary>
            <p>Profilen din fungerer som din CV, slik at du slipper å sende søknad til alle tre
              bedriftene du vil søke på. Derfor er det viktig at du fyller ut profilen din med
              relevant informasjon. Hvis du vil kan du også legge ved lenker til relevante sider, 
              slik som for eksempel LinkedIn.
            </p>
          </details>
          <details>
            <summary> Hva burde jeg skrive på min profil?</summary>
            <p>Det viktigste du burde ha med er dine kvalifikasjoner! Husk at for at bedriften skal velge deg,
              vil de se etter kvalifikasjoner de verdsetter i sin bedrift.
            </p>
          </details>
          </div>
        </div>

<!--           <p aria-hidden="true" v-if="show">Du kan prioritere tre bedrifter</p>
            </div>
                <p>Hva gjør jeg etter at jeg har prioritert?</p>
                <p>Hva skal jeg ha med i søknaden?</p>
                <p>Når er søknadsfristen?</p> -->
            
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '@/firebase.js'

export default {
  components: {
  },
  data() {
    return {
      post: {
        content: ''
      },
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts']),
    authorized: () => {return auth.currentUser !== null}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
