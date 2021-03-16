<template>
    <main class="left-col-container" v-if="ownsPage">
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
            v-if="pageUserData.role == 'student'"
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
            v-else-if="pageUserData.role == 'company'"
            />

        </section>
        <section v-if="activeChoice == 'default'"> 
            <ContactColumn
                :img="pageUserData.image_url"
                :name="pageUserData.contact"
                :phone="pageUserData.phone"
                :email="pageUserData.email"
                :editable="ownsPage"
                />
                <About
                :description="pageUserData.about"
                :name="pageUserData.name"
                
                />
        </section>

        <section v-else-if="activeChoice == 'praksis' && pageUserData.role == 'company'">
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Praksis</h1>
                            <h2>Godkjente:</h2>
                            <div key="praksis" class="cards">
                            
                                <Card2 
                                v-for="card in approvedPraksisPosts"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                />
                                    
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <h2>Ikke godkjente:</h2>
                            <div key="praksis" class="cards">
                            
                                <Card2 
                                v-for="card in deniedPraksisPosts"
                                :key="card.title"
                                collection="praksis"
                                :cardData="card" 
                                />
                                    
                            </div>
                        </div>
                    </div>

                    <div class="row">
                <div class="col-md-12">
                    <Priorities/>
                    <button @click.prevent="$store.dispatch('savePrioCart', userProfile.id)" class="button prio">Lagre</button>
                </div>
            </div>
                </div>
            </div> 
            
        </section>

        <section v-else-if="activeChoice == 'prosjekt' && pageUserData.role == 'company'">
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Bachelor</h1>
                            <h2>Godkjente:</h2>
                            <div key="prosjekt" class="cards">
                            
                                <Card2 
                                v-for="card in approvedProsjektPosts"
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
                                v-for="card in deniedProsjektPosts"
                                :key="card.title"
                                collection="prosjekt"
                                :cardData="card" 
                                />
                                    
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <Priorities/>
                            <button @click.prevent="$store.commit('savePrioCart')" class="button prio">Godkjenn</button>
                        </div>
                    </div>
                </div>
            </div> 
        </section>

        <section v-else-if="activeChoice == 'historikk'"> 
            <h1>Historikk</h1>
        </section>

    </section>
    </main>
    <!-- if profile is owner by someone who's not the owner-->
    <main v-else class="left-col-container">
    <section class="topRow">
        
    </section>
    <section class="main profile">
        <section>
            <img class="backArrow" @click="$router.go(-1)" src="../assets/images/Left-Arrow-90.png"/>
        </section>
        <section> 
            <ContactColumn
            :img="pageUserData.image_url"
            :name="pageUserData.contact"
            :phone="pageUserData.phone"
            :email="pageUserData.email"
            :editable="ownsPage"
            />
            <About
            :description="pageUserData.about"
            :name="pageUserData.name"
            
            />
        </section>
    </section>
    </main>
</template>

<script>

//work in progress
import { mapState } from 'vuex'
import { getDoc, filterByField } from "@/utils/get.js"
import SideMenu from '@/components/SideMenu'
import ContactColumn from '@/components/ContactColumn.vue'
import About from '@/components/About.vue'
import Priorities from '@/components/Priorities.vue'
import Card2 from '@/components/Card2.vue'

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
          pageUserData: false,
          approvedPraksisPosts: [],
          deniedPraksisPosts: [],
          approvedProsjektPosts: [],
          deniedProsjektPosts: []
      }
  },
  computed: {
    ...mapState(['userProfile']),

    activeChoice(){
          return this.$route.params.type
    },

    ownsPage(){
        return this.userProfile.id == this.$route.params.id ? true : false
    }

    
  },
  methods:{
    
  },
  created(){
    getDoc("users", this.$route.params.id).then(res => {
        this.pageUserData = res
    })

    filterByField("praksis", "created_by", this.$route.params.id).then(res => {
        this.approvedPraksisPosts = res.filter(x => x.approved == true)
        this.deniedPraksisPosts = res.filter(x => x.approved == false)
    })
    
    filterByField("prosjekt", "created_by", this.$route.params.id).then(res => {
        this.approvedProsjektPosts = res.filter(x => x.approved == true)
        this.deniedProsjektPosts = res.filter(x => x.approved == false)
    })
        

  }
  

}
</script>
