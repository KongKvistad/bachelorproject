<template>
<div class="container-fluid" v-if="ownsPage && data.pageUserData">

    <!--Denne modalen er for knapp til bedrift for å lage ny utlysning--->
    <Modal 
        v-if="showNew"
        @close="toggleEditor"
    >
    <template v-slot:content>
        <EditorWrapper 
            :collection="activeChoice"
            :access="'new'"
            @closed="showNew = !showNew"/>
    </template>
    </Modal>

    <div class="container">

        <!--Info boks til student om hva profilen gjør-->
        <div class="row student-infobox" v-if="data.pageUserData.role == 'student' && activeChoice == 'default'">
            <div class="danger-icon"><b-icon icon="exclamation-octagon"></b-icon></div>
            <div class="col-md-12">
                <p>Dette er profilen din, som andre også kan se. 
                Profilen erstatter behovet for å laste opp en CV, og det er derfor viktig at du oppdaterer den med
                en beskrivelse av deg selv, hva du foretrekker å jobbe med, samt noen kvalifikasjoner
                du anser som relevant. Du kan også legge ved linker til relevant informasjon og arbeid.</p>
            </div>
        </div>
    

    <!-- <section class="main profile"> -->
        <div class="row" style="margin-top: 40px;">
            <div class="sideMenu col-md-2">
                <SideMenu
                :menuOptions="[{
                    param: '/default',
                    text: 'Min profil'
                },
                {
                    param: '/praksis',
                    text: 'Min praksis'
                },
                {
                    param: '/prosjekt',
                    text: 'Min bachelor'
                }]"
                :id="'/' + this.$route.params.id"
                base="/profile"
                v-if="data.pageUserData.role == 'student'"
                />
                <div class="deadline" v-if="data.pageUserData.role=='student' && activeChoice=='praksis' || data.pageUserData.role=='student' && activeChoice=='prosjekt'">
                    <div class="attention"><b-icon icon="exclamation-octagon"></b-icon></div>
                    <p>Frist for å søke:</p>
                    <p>18. september</p>
                </div>
                <SideMenu
                :menuOptions="[{
                    param: '/default',
                    text: 'Vår profil'
                },
                {
                    param: '/praksis',
                    text: 'Vår praksis'
                },
                {
                    param: '/prosjekt',
                    text: 'Vår bachelor'
                },
                {
                    param: '/historikk',
                    text: 'Vår historikk'
                }]"
                :id="'/' + this.$route.params.id"
                base="/profile"
                v-else-if="data.pageUserData.role == 'company'"
                />
            </div>

            <div class="col-md-10" v-if="activeChoice == 'default'"> 
                <div class="row">
                    <ContactColumn
                        :img="data.pageUserData.image_url"
                        :name="data.pageUserData.contact ? data.pageUserData.contact : data.pageUserData.name"
                        :study="data.pageUserData.study"
                        :phone="data.pageUserData.phone"
                        :email="data.pageUserData.email"
                        :editable="ownsPage"
                    />
                    <About
                        :description="data.pageUserData.about"
                        :name="data.pageUserData.name"
                        :study="data.pageUserData.study"
                        :wanted_work="data.pageUserData.wanted_work"
                        
                    />
                </div>
            </div>

            <!--Vår praksis for bedrift---------------------------------->
            <div class="col-md-10" v-else-if="activeChoice == 'praksis' && data.pageUserData.role == 'company'">
                <Modal 
                    v-if="showEditor"
                    @close="showEditor = false"
                >
                <template v-slot:content>
                    <EditorWrapper 
                        :collection="activeChoice"
                        :access="'owner'"
                        :data="cardData"/>
                </template>
                </Modal>
                    
                <div class="row">
                    <div class="col-md-12">
                        <h1>Praksis</h1>
                        <p>Dette er dine utlysninger. Aktive utlysninger er tilgjengelig for studenter i samarbeid.
                            Før en utlysning publiseres og gjøres tilgjengelig må den godkjennes av emneansvarlig. 
                        </p>
                        <h2 style="margin-top:30px;">Aktive utlysninger:</h2>
                        <div v-if="dataFetched" key="praksis" class="cards">
                            <div v-if="data.praksis.approved.length !== 0">
                                <Card2 
                                v-for="card in data.praksis.approved"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                >
                                <template v-slot:button>
                                        <button :disabled="!compCanPrio" class="primary-button button" @click="$router.push('/applicants/' + card.id)" >Se søkere</button>
                                        <button class="secondary-button button mr-4" @click="toggleCard(card)" >Se utlysning</button>
                                </template>
                                </Card2>  
                            </div>    
                            <div v-else>
                                <p>Du har ingen aktive utlysninger</p>
                            </div> 
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <h2 style="margin-top:30px;">Avventer godkjenning:</h2>
                        <div v-if="dataFetched" key="praksis"  class="cards">
                            <div v-if="data.praksis.denied.length !== 0">
                                <Card2 
                                v-for="card in data.praksis.denied"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                >
                                <template v-slot:button>
                                    <button class="primary-button button" @click="toggleCard(card)" >Se utlysning</button>
                                </template>
                                </Card2>   
                            </div>
                            <div v-else>
                                <p>Du har ingen utlysninger som venter på godkjenning</p>
                                <button class="primary-button" @click.prevent="toggleModal('opened')" style="margin-left:0;">Lag en ny utlysning</button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>

        <!--Vår bachelor for bedrift--------------------------------->
        <div class="col-md-10" v-else-if="activeChoice == 'prosjekt' && data.pageUserData.role == 'company'">
            <div class="row">
                <div class="col-md-12">
                    <h1>Bachelor</h1>
                    <p>Dette er dine utlysninger. Aktive utlysninger er tilgjengelig for studenter i samarbeid.
                        Før en utlysning publiseres og gjøres tilgjengelig må den godkjennes av emneansvarlig. 
                    </p>
                    <h2 style="margin-top:30px;">Aktive utlysninger:</h2>
                    <div v-if="data.prosjekt" key="prosjekt" class="cards">
                        <div v-if="data.prosjekt.approved.length !== 0">
                            <Card2 
                            v-for="card in data.prosjekt.approved"
                            :key="card.title"
                            collection="prosjekt"
                            :cardData="card" 
                            />
                        </div>  
                        <div v-else>
                            <p>Du har ingen aktive utlysninger</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <h2 style="margin-top:30px;">Avventer godkjenning:</h2>
                    <div key="prosjekt" class="cards">
                    
                        <div v-if="data.prosjekt.denied.length !== 0">
                            <Card2 
                            v-for="card in data.prosjekt.denied"
                            :key="card.title"
                            collection="prosjekt"
                            :cardData="card" 
                            />
                        </div>
                        <div v-else>
                            <p>Du har ingen utlysninger som venter på godkjenning</p>
                            <button class="primary-button" @click.prevent="toggleModal('opened')" style="margin-left:0;">Lag en ny utlysning</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!---Historikk for bedrift--------------------------->
        <div class="col-md-10" v-else-if="activeChoice == 'historikk'"> 
            <h1>Historikk</h1>
        </div>

        <!----Min praksis for student--------------------------------------->
        <div class="col-md-10" v-else-if="(activeChoice == 'praksis' || activeChoice == 'prosjekt') && data.pageUserData.role == 'student'">
           <b-container >
            <b-row cols="1">
                <div class="row">
                    <div class="col-md-12">
                        <h1>{{ activeChoice }}</h1>
                        <p>Dette er dine prioriteringer. Du kan endre rekkefølgen ved å
                            bruke pilene til høyre. Hvis du endrer rekkefølge må du huske å lagre
                            rekkefølgen. Husk også at du må skrive èn søknad til hver prioritering innen
                            fristen.
                        </p>
                    </div>
                </div>

                   
                <div class="row" style="margin-top: 30px;">
                    <h3 class="mb-5 " v-if="placeOffered && !compCanPrio && pairComplete">Din {{activeChoice}}-plass:</h3>
                    <div class="col-md-12">
                        <Modal 
                            v-if="showEditor"
                            @close="showEditor = false"
                        >
                        <template v-slot:content>
                            <vue-editor style="margin-top: 2em;" v-model="cardData.application"/>
                            <div class="modal-buttons">
                                <button @click="saveApp" class="primary-button">Lagre</button>
                                <button @click.prevent="showEditor = !showEditor" class="secondary-button">Avbryt</button>
                            </div>
                        </template>
                        </Modal>

                        <b-col class="mt-4"
                        v-if="compCanPrio"
                        >
                        <h3 class="w-50 mx-auto">Bedriftene prioriterer for sesongen.</h3>
                        <p class="w-50 mx-auto">Du kan ikke endre dine prioriteringer eller søknader nå.<br>
                        Det betyr at fristen er utløpt, og du må vente på svar.</p>
                        </b-col>
                        
                        <Priorities
                        @appOpen="toggleCard"
                        @deleteApp="deleteCard"
                        @prioChanged="prioChange = !prioChange"
                        v-else-if="!compCanPrio && !pairComplete"

                        />
                            
                        <Contract
                        v-else-if="placeOffered && pairComplete"
                        @removeOffers="removeOffers"
                        v-for="place in placeOffered"
                        :key="place.id"
                        :offer="place"
                        />
                        <h3
                        v-else-if="!placeOffered && pairComplete"
                        >Beklager! Du har havnet i reste-liste</h3>
                    </div>
                </div>

                <b-col v-if="!compCanPrio && !pairComplete">
                    <b-row class="mt-5 px-4">
                        <button :disabled="!prioChange" @click.prevent="rePrioritize" class="primary-button button prio ml-auto">Lagre rekkefølge på prioriteringer</button>
                        
                    </b-row>
                </b-col>

            </b-row>
            </b-container>         
        </div>

        
        </div>
    </div>
</div>

    <!-- if profile is viewed by someone who's not the owner----------------------------->
    <div v-else-if="!ownsPage && data.pageUserData" class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <b-icon-arrow-left font-scale="3" class="backArrow" @click="$router.go(-1)" /> <br>
                </div>
            </div>

        <div class="row justify-content-center"> 
            
            <ContactColumn
            :img="data.pageUserData.image_url"
            :name="data.pageUserData.contact ? data.pageUserData.contact : data.pageUserData.name "
            :phone="data.pageUserData.phone"
            :study="data.pageUserData.study"
            :email="data.pageUserData.email"
            :editable="ownsPage"
            />
            
            <About
            :description="data.pageUserData.about"
            :name="data.pageUserData.name"
            :study="data.pageUserData.study"
            :wanted_work="data.pageUserData.wanted_work"
            />
            
        </div>
        </div>
    </div>

</template>

<script>

//work in progress
import { mapState } from 'vuex'
import { getDoc, filterByField, getData } from "@/utils/get.js"
import gateKeeper from "@/utils/gatekeeper.js"
import SideMenu from '@/components/SideMenu'
import ContactColumn from '@/components/ContactColumn.vue'
import About from '@/components/About.vue'
import Priorities from '@/components/Priorities.vue'
import Card2 from '@/components/Card2.vue'
import store from '../store'
import EditorWrapper from '@/components/EditorWrapper'
import Contract from '@/components/Contract'
import Modal from '@/components/Modal'
import { VueEditor } from "vue2-editor"
export default {
  name:"ProfilePage",
  components: {
      SideMenu,
      ContactColumn,
      About,
      Priorities,
      Card2,
      Modal,
      EditorWrapper,
      VueEditor,
      Contract
  },
  data(){
      return {
          data: false,
          showEditor : false,
          cardData: false,
          compCanPrio: false,
          dataFetched: false,
          placeOffered: false,
          pairComplete: false,
          prioChange: false,
          showNew: false
          
      }
  },
  computed: {
    ...mapState(['userProfile']),

    activeChoice(){
          return this.$route.params.type
    },

    ownsPage(){
        return this.userProfile.id == this.$route.params.id ? true : false
    },

    role(){
        return this.userProfile.role
    },
    
    cart(){
            return this.$store.getters.getPrioCart("praksis")
        }
    
  },
  watch:{
      
      //need to watch in addition to fetching on component creation,
      //in case user us the owner of the page and the owner state refreshes (async)
    ownsPage(newVal, oldVal){
        
        if(newVal != oldVal){
            gateKeeper(newVal, this.$route.params.id).then(res =>{
                this.data = {...res}
                this.dataFetched = true
                this.$forceUpdate();
            })
        }
    },

    role(val){
        
            this.checkForOffers(val)
        
    },
   
    

   
  },
  methods:{
    saveApp(){
        this.$store.dispatch('savePrioCart', this.userProfile.id)
        this.$toast.success('Søknad er lagret', {
        position: "top",
        });
        this.showEditor = !this.showEditor
    },
    rePrioritize(){
        this.$store.dispatch('savePrioCart', this.userProfile.id)
        this.$toast.success('Omprioritering er lagret', {
        position: "top",
        }); 
    },

    removeOffers(choice){
        this.placeOffered = [choice]
        console.log(choice)
    },
    toggleCard(card){
        console.log(card)
        this.showEditor = true
        this.cardData = card
    },
    deleteCard(card){
        this.$store.commit('removeFromCart', {type: this.activeChoice, data: card})
        this.$store.dispatch('savePrioCart', this.userProfile.id)
        this.$toast.success('Prioritering er fjernet', {
        position: "top",
        }); 
    },

    findPost(hit){
        if(!this.placeOffered){
        //there can only be one offer
        hit = hit[0]
        let match = this.cart.find(x => x.id == hit.comp)
        
        // match.to = match.to ? match.to : false
        // match.from = match.from ?match.from: false
        this.placeOffered = [match]
        }
         else {
            void(0)
        }

        
    },
    checkForOffers(val){
        if(val == 'student'){
            
          
            //check if student has any places offered          
            getData(false, 'matches').then( res => {
                
                    
                    res.forEach(x => { 
                        let hit = x.result.filter(y => y.stud == this.userProfile.id)
                        
                        if(hit.length > 0){
                            this.findPost(hit)
                            
                        }
 
                    })
                 
                
            })
        } 
    },
    toggleModal(val) {
        if(val == "opened"){
            if(!this.userProfile.id){
                this.showUserAlert = !this.showUserAlert
            } else {
                this.showNew = true
            }
        } else {
            this.showUserAlert = !this.showUserAlert
        }
        
      },
      toggleEditor(){
          this.showNew = false;
      },
      
  },
    
  
  
 beforeCreate(){
     let ownsPage = store.state.userProfile.id
 },
 created(){
    
    
   
    getData(false, 'state_flags').then( res => {
         // check flags in order to know if companies can prioritize
         // makes button available if true
        this.compCanPrio = res.find(x => x.id == 'companies_can_prioritize').state
        // check flags in order to know if pairings have been made
        // present offers if true
        this.pairComplete = res.find(x => x.id == 'pairing_complete').state

        if(this.pairComplete){
            // runs only if user is student - check if they've already recieved offers
            this.checkForOffers(this.userProfile.role)
        }
    })
     

     //get data depending on role, etc
    gateKeeper(this.ownsPage, this.$route.params.id).then(res =>{
                
                this.data = {...res}
                this.dataFetched = true
            
    })
  },

  mounted(){
      
      
  }
  
  

}
</script>
