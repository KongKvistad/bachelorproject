<template>
    <main class="left-col-container" v-if="ownsPage && data.pageUserData">
    <section class="topRow">
        
    </section>
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
                :phone="data.pageUserData.phone"
                :email="data.pageUserData.email"
                :editable="ownsPage"
                />
                <About
                :description="data.pageUserData.about"
                :name="data.pageUserData.name"
                
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
                                        <button class="button mr-4" @click="toggleCard(card)" >se utlysning</button>
                                        <button :disabled="!compCanPrio" class="button" @click="$router.push('/applicants/' + card.id)" >se søkere</button>
                                   
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
                                  
                                        <button class="button" @click="toggleCard(card)" >se utlysning</button>
                                   
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
                <b-col>
                    <Modal 
                        v-if="showEditor"
                        @close="showEditor = false"
                    >
                        <template v-slot:content>
                            
                            <vue-editor style="margin-top: 2em;" v-model="cardData.application"/>
                            <button @click="$store.dispatch('savePrioCart', userProfile.id)" class="button w-25 float-right mt-4" >lagre</button>
                           
                        </template>
                    </Modal>
                    <Priorities
                    @appOpen="toggleCard"
                    v-if="!placeOffered"
                    />

                    
                        <Contract
                        v-else
                        @removeOffers="removeOffers"
                        v-for="place in placeOffered"
                        :key="place.id"
                        :offer="place"
                        />
                    
                    
                </b-col>
                <b-col v-if="!placeOffered">
                    <b-row class="mt-5 px-4">
                        <button @click.prevent="$store.dispatch('savePrioCart', userProfile.id)" class="button prio ml-auto">Godkjenn</button>
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
            :email="data.pageUserData.email"
            :editable="ownsPage"
            />
            <About
            :description="data.pageUserData.about"
            :name="data.pageUserData.name"
            
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
          placeOffered: false
          
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

    findPost(id){
        
        let match = this.cart.find(x => x.id == id)
        match.to = match.to ? match.to : false
        match.from = match.from ?match.from: false
        if(!this.placeOffered){
            this.placeOffered = [match]
        } else {
            this.placeOffered.push(match)
        }
        
        
    },
    checkForOffers(val){
        if(val == 'student'){
          
            //check if student has any places offered          
            getData(false, 'company_priorities').then( res => {
                
                    
                    res.forEach(x => { 
                        let id = x.id
                        let hit = Object.values(x.praksis).filter(y => y.id == this.userProfile.id)

                        if(hit.length > 0){
                            this.findPost(id)
                            
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
    // runs only if user is student - check if they've already recieved offers
    this.checkForOffers(this.userProfile.role)
    
    // check flags in order to know if companies can prioritize
    // makes button available if true
    getDoc('state_flags', 'companies_can_prioritize').then( res => {
        this.compCanPrio = res.state
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
