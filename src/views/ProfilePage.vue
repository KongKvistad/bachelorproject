<template>
    <main class="left-col-container" v-if="ownsPage && data.pageUserData">

    <div class="container">
        <div class="row student-infobox" v-if="data.pageUserData.role == 'student' && activeChoice == 'default'">
            <div class="danger-icon"><b-icon icon="exclamation-octagon"></b-icon></div>
            <div class="col-md-12">
                <p>Dette er profilen din, som andre også kan se. 
                Profilen erstatter behovet for å laste opp en CV, og det er derfor viktig at du oppdaterer den med
                en beskrivelse av deg selv, hva du foretrekker å jobbe med, samt noen kvalifikasjoner
                du anser som relevant. Du kan også legge ved linker til relevant informasjon og arbeid.</p>
            </div>
        </div>
    </div>

    <section class="main profile">
        
        <section>
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

        </section>
        <section v-if="activeChoice == 'default'"> 
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
        </section>

        <section v-else-if="activeChoice == 'praksis' && data.pageUserData.role == 'company'">
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
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Praksis</h1>
                            <h2>Godkjente:</h2>
                            <div v-if="dataFetched" key="praksis" class="cards">
                            
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
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <h2>Ikke godkjente:</h2>
                            <div v-if="dataFetched" key="praksis"  class="cards">
                             
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
                        </div>
                    </div>

                    
                </div>
            </div> 
            
        </section>

        <section v-else-if="activeChoice == 'prosjekt' && data.pageUserData.role == 'company'">
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Bachelor</h1>
                            <h2>Godkjente:</h2>
                            <div v-if="data.prosjekt" key="prosjekt" class="cards">
                            
                                <Card2 
                                v-for="card in data.prosjekt.approved"
                                :key="card.title"
                                collection="prosjekt"
                                :cardData="card" 
                                />
                                    
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <h2>Ikke godkjente:</h2>
                            <div key="prosjekt" class="cards">
                            
                                <Card2 
                                v-for="card in data.prosjekt.denied"
                                :key="card.title"
                                collection="prosjekt"
                                :cardData="card" 
                                />
                                    
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div> 
        </section>

        <section v-else-if="activeChoice == 'historikk'"> 
            <h1>Historikk</h1>
        </section>

        <section v-else-if="(activeChoice == 'praksis' || activeChoice == 'prosjekt') && data.pageUserData.role == 'student'">
           <b-container >
            <b-row cols="1">
                <div class="row">
                    <div class="col-md-12">
                        <h1>{{ activeChoice }}</h1>
                        <p>Dette er dine prioriteringer. Du kan endre rekkefølgen ved å
                            bruke pilene til høyre. Husk at du må skrive èn søknad til hver prioritering innen
                            fristen, samt oppdatere profilen din.
                        </p>
                    </div>
                </div>
                <b-col class="mt-4">
                    <h3 class="mb-5 " v-if="placeOffered && !compCanPrio && pairComplete">Din {{activeChoice}}-plass:</h3>
                    <Modal 
                        v-if="showEditor"
                        @close="showEditor = false"
                    >
                        <template v-slot:content>
                            
                            <vue-editor style="margin-top: 2em;" v-model="cardData.application"/>
                            <div class="modal-buttons">
                                <button @click="$store.dispatch('savePrioCart', userProfile.id)" class="primary-button">Lagre</button>
                                <button class="secondary-button">Avbryt</button>
                            </div>
                        </template>
                    </Modal>
                    <b-col class="mt-4"
                    v-if="compCanPrio"
                    >
                    <h3 class="w-50 mx-auto">Du er i karantene</h3>
                    <p class="w-50 mx-auto"> Bedriftene prioriterer for sesongen.<br>
                    Det betyr at fristen er uløpt, og du må vente på svar</p>
                    </b-col>
                    
                    <Priorities
                    @appOpen="toggleCard"
                    @deleteApp="deleteCard"
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
                    >beklager! du har havnet i reste-liste</h3>
                    
                </b-col>
                <b-col v-if="!compCanPrio && !pairComplete">
                    <b-row class="mt-5 px-4">
                        <button @click.prevent="$store.dispatch('savePrioCart', userProfile.id)" class="primary-button button prio ml-auto">Godkjenn</button>
                    </b-row>
                </b-col>

            </b-row>
            </b-container>
             
            
            
                        
            
        </section>

        

    </section>
    </main>

    <!-- if profile is owner by someone who's not the owner-->
    <main v-else-if="!ownsPage && data.pageUserData" class="left-col-container">
    <section class="topRow">
        
    </section>
    <section class="main profile">
        <section>
            <b-icon-arrow-left font-scale="3" class="backArrow" @click="$router.go(-1)" /> 
        </section>
        <section> 
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
        </section>
    </section>
    </main>
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
        //this.$store.dispatch('savePrioCart', this.userProfile.id)
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
    }
    
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
