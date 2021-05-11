<!-- Landingsside. har annet random innhold per nå, men skal bli til inofrmasjons-siden-->
<template>
  <div id="dashboard" class="main">
    <div class="container-fluid">
      <div class="container">
        <div class="row indexIntro">
          <div class="col-md-6">
            <h1>NTNU BeNet</h1>
            <p>NTNU BeNet er et bedriftsnettverk som tilbyr praksisformidling og administrasjon av praksisopphold. 
              Tjenesten krever lite interaksjon fra arbeidsgiver, og gjør det lettere for studenter å skaffe 
              og koordinere praksisplass.</p>
            <p>Foreløpig er NTNU BeNet et internt bedriftsnettverk for Institutt for design på NTNU Gjøvik, men i 
              dagens digitale situasjon er det helt åpent for bedrifter fra andre kommuner og fylker.</p>
              <span v-show="!authorized"><a href="/login"><button class="primary-button" style="margin-left:0;">Kom i gang <b-icon icon="arrow-right"></b-icon></button></a></span>
              <span v-show="authorized"><a href="/coop/praksis"><button class="primary-button" style="margin-left:0;">Finn eller utlys praksisplass <b-icon icon="arrow-right"></b-icon></button></a></span>
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
            <p>Bedrifter som vil delta er ansvarlig for å ta i mot studenten eller de studentene som skal ha praksis. 
              Det første som skjer er at en bedrift må utlyse en plass, som beskriver hva praksisperioden vil inneholde. Dette er 
              noe studentene skal se, før de prioriterer 3 valgfrie bedrifter ved å skrive søknader til samtlige. </p>
            <p>Bedriftene vil deretter få en oversikt over alle som har søkt til, samt lese deres søknader og få 
              tilgang til de gjeldene studentenes profil. Deres profil inneholder en digital CV og relevant informasjon om 
              studenten. Deretter må bedriften også prioritere søkere innen en gitt frist.</p>
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
        <!-- <div class="row" v-show="!authorized">
          <div class="col-md-12 d-flex justify-content-end">
                <a href="/signup"><button class="primary-button">Opprett en bruker for din bedrift</button></a>
            </div>
        </div> -->
        
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
