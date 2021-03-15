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
                text: 'Min profil'
            },
            {
                param: '/praksis',
                text: 'Min praksis'
            },
            {
                param: '/prosjekt',
                text: 'Min bachelor'
            },
            {
                param: '/historikk',
                text: 'Min historikk'
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

        <section v-else-if="activeChoice == 'praksis'">
            <div class="container-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Praksis</h1>
                            <h2>Godkjente:</h2>
                            <div key="praksis" v-if="pageUserData.role == 'company'">

                                <Card 
                                    collection="praksis"
                                />
                                    
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h2>Ikke godkjente:</h2>
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

        <section v-else-if="activeChoice == 'prosjekt'"> 
            <h1>Bachelor</h1>
            <Priorities/>
            <button @click.prevent="$store.commit('savePrioCart')" class="button prio">Godkjenn</button>
        </section>

        <section v-else-if="activeChoice == 'historikk'"> 
            <h1>Historikk</h1>

            <Priorities/>
            <button @click.prevent="$store.commit('savePrioCart')" class="button prio">Godkjenn</button>
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
import { getDoc } from "@/utils/get.js"
import SideMenu from '@/components/SideMenu'
import ContactColumn from '@/components/ContactColumn.vue'
import About from '@/components/About.vue'
import Priorities from '@/components/Priorities.vue'
import Card from '@/components/Card.vue'

export default {
  name:"ProfilePage",
  components: {
      SideMenu,
      ContactColumn,
      About,
      Priorities,
      Card
  },
  data(){
      return {
          pageUserData: false
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


  }
  

}
</script>
