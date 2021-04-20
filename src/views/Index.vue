<!-- Landingsside. har annet random innhold per nå, men skal bli til inofrmasjons-siden-->
<template>
  <div id="dashboard" class="main">
    <div class="container-fluid">
      <div class="container">
        <div class="row indexIntro">
          <div class="col-md-6">
            <h1>NTNU BeNet</h1>
            <p>NTNU BeNet er et bedriftsnettverk som tilbyr praksisformidling og administrasjon av praksisopphold. 
              Tjenesten krever lite interaksjon fra deg som arbeidsgiver, og gjør det lettere for studenter å skaffe 
              og koordinere praksisplass eller bachelor-oppgave.</p>
            <p>Foreløpig er NTNU BeNet et internt bedriftsnettverk for Institutt for design på NTNU Gjøvik, men i 
              dagens digitale situasjon er det helt åpent for bedrifter fra andre kommuner og fylker. I tillegg er 
              det er et stort antall studenter på Gjøvik som er innflyttere, og som derfor har flere muligheter.</p>
          </div>

          <div class="col-md-6">
            <img class="img_about_1" src="../assets/images/job-search.svg" alt="Student som sitter ved en pult og søker på jobber på datamaskinen">
          </div>
        </div>

        <div class="row indexIntro">
          <div class="col-md-6 d-flex align-items-center mobile-second">
            <img class="img_about_2" src="../assets/images/about_img_2.svg" alt="Illustrasjon av student som leser en bok sittende">
          </div>

          <div class="col-md-6 align-self-center">
            <h2>Hvordan fungerer det?</h2>
            <p>Du som bedrift er ansvarlig for å ta i mot studenten eller de studentene som skal ha praksisplass hos dere. 
              Det første som skjer er at du må lage en utlysning, som beskriver hva praksisperioden vil inneholde. Dette er 
              noe studentene skal se, før de prioriterer 3 valgfrie bedrifter, ved å skrive søknader. </p>
            <p>Når de har gjort det, vil du få en oversikt over alle som har søkt til deg, samt lese deres søknader og få 
              tilgang til de gjeldene studentenes profil. Deres profil inneholder en digital CV og relevant informasjon om 
              studenten. Deretter må du som bedrift også prioritere dine søkere fra èn til tre, innen en gitt frist.</p>
          </div>
        </div>

         <div class="row indexEnd">
          <div class="col-md-6">
            <h2>Målsettinger</h2>
            <p>NTNU BeNet har som formål å legge til rette for at studentene kan få en praksisperiode som er gull 
              verdt. Det er et mål at alle studenter som har praksis, enten det er et obligatorisk fag eller et valgfag, 
              skal finne en bedrift som passer. Like så er det stor verdi for bedrifter å ha en praksisstudent hos seg, 
              da det bidrar til nytenkning og gode innspill fra nye perspektiver. </p>
          </div>
          
          <div class="col-md-6">
            <h2>Fordeler</h2>
            <p>NTNU BeNet har som formål å legge til rette for at studentene kan få en praksisperiode som er gull 
              verdt. Det er et mål at alle studenter som har praksis, enten det er et obligatorisk fag eller et valgfag, 
              skal finne en bedrift som passer. Like så er det stor verdi for bedrifter å ha en praksisstudent hos seg, 
              da det bidrar til nytenkning og gode innspill fra nye perspektiver. </p>
          </div>
        </div>
        <div class="row" v-show="!authorized">
          <div class="col-md-12 d-flex justify-content-end">
                <button class="primary-button">Registrer</button>
            </div>
        </div>
        
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
