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
                :name="data.pageUserData.contact"
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
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Praksis</h1>
                            <h2>Godkjente:</h2>
                            <div key="praksis" class="cards">
                            
                                <Card2 
                                v-for="card in data.praksis.approved"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                >
                                <template v-slot:button>
                                  
                                        <button class="button" @click="$router.push('/applicants/' + card.id)" >se søkere</button>
                                   
                                </template>
                                </Card2>
                                    
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <h2>Ikke godkjente:</h2>
                            <div key="praksis"  class="cards">
                            
                                <Card2 
                                v-for="card in data.praksis.denied"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                >
                                <template v-slot:button>
                                  
                                        <button class="button">se utlysning</button>
                                   
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
                            <div key="prosjekt" class="cards">
                            
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

        <section v-else-if="activeChoice == 'praksis' && data.pageUserData.role == 'student'">
           <b-container >
            <b-row cols="1">
                <b-col>
                <Priorities/>
                </b-col>
                <b-col>
                <button @click.prevent="$store.dispatch('savePrioCart', userProfile.id)" class="button prio">Godkjenn</button>
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
            :name="data.pageUserData.contact"
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
import { getDoc, filterByField } from "@/utils/get.js"
import gateKeeper from "@/utils/gatekeeper.js"
import SideMenu from '@/components/SideMenu'
import ContactColumn from '@/components/ContactColumn.vue'
import About from '@/components/About.vue'
import Priorities from '@/components/Priorities.vue'
import Card2 from '@/components/Card2.vue'
import store from '../store'
export default {
  name:"ProfilePage",
  components: {
      SideMenu,
      ContactColumn,
      About,
      Priorities,
      Card2
  },
  data(){
      return {
          data: false
          
          
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
    

    
  },
  watch:{
      
      //need to watch in addition to fetching on compenent creation,
      //in case user us the owner of the page
      ownsPage(newVal, oldVal){
          
        if(newVal != oldVal){
            gateKeeper(newVal, this.$route.params.id).then(res =>{
                this.data = {...res}
            })
        }
    },  
  },
  methods:{
    
  },
  
 beforeCreate(){
     let ownsPage = store.state.userProfile.id
     console.log(ownsPage)
 },
 created(){
    gateKeeper(this.ownsPage, this.$route.params.id).then(res =>{
                this.data = {...res}
    })
  }
  
  

}
</script>
