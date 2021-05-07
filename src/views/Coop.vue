<!-- Page for samarbeid. Sidemeny er mappet til navigasjon,
 så man kan laste f.eks coop/praksis med riktig menyelement valgt-->
<template>
    
    <main> <!--class="left-col-container" -->
    <Modal 
     v-if="showUserAlert"
     @close="toggleModal" 
   
     >
      <template v-slot:content>
        <h3>Oops!</h3>
        <p>Du må logge inn eller registrere deg før du kan publisere en utlysning!</p>
      </template>
    </Modal>
    <Modal 
     v-if="showEditor"
     @close="toggleEditor"
   >
   <template v-slot:content>
     <EditorWrapper 
        :collection="activeChoice"
        :access="'new'"
        @closed="showEditor = !showEditor"/>
   </template>
   </Modal>
    <!-- <section class="topRow blue">
        <div>
            <h1>{{activeChoice}}</h1>
            <button @click.prevent="toggleModal('opened')">Ny utlysning</button>
        </div>
        <div class="heading-underline"></div>
    </section> -->

<div class="container-fluid">
    <div class="container padding-top50">
        <div class="row">
            <!-- <section> -->
            <div class="col-md-2 sideMenu">
                <SideMenu
                :menuOptions="[{
                    param: '/praksis',
                    text: 'Praksis',
                    tabix:'0'
                },
                {
                    param: '/prosjekt',
                    text: 'Bachelor'
                }//,
                //{
                //    param: '/bedrifter',
                //    text: 'Bedrifter'
                //}
                ]"
                base="/coop"
                />
               <div class="deadline" v-if="userProfile.role==='student'">
                   <div class="attention"><b-icon icon="exclamation-octagon"></b-icon></div>
                   <p>Frist for å søke:</p>
                   <p>18. september</p>
               </div>
               <div class="deadline" v-if="userProfile.role==='company'">
                   <div class="attention"><b-icon icon="exclamation-octagon"></b-icon></div>
                   <p>Frist for å utlyse plass:</p>
                   <p>20. januar</p>
               </div>
            </div>
            <!-- </section> -->
            <!-- <section> --> 
            <div class="col-md-10">
                <!-- <div class="secRow"> --> 
                <div class="row">
                    <div class="col-6">
                            <h1 v-if="activeChoice=='prosjekt'">Bachelor</h1>
                            <h1 v-else-if="activeChoice=='praksis'">Praksis</h1>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <button class="primary-button" @click.prevent="toggleModal('opened')">Ny utlysning</button>
                    </div>
                </div>
                <div class="row">
                    <div v-if="userProfile.role==='student'" class="col-md-12">
                        <p class="coopIntro">Finn en praksisplass eller et bachelorprosjekt!</p>
                        <p>
                            Bruk menyen til venstre for å navigere. Husk at du som student må prioritere max
                            tre bedrifter til praksis om du ikke finner en på egenhånd. Prioriteringene dine finner du
                            i din oversikt.
                        </p>
                    </div>
                    <div v-if="userProfile.role==='company'" class="col-md-12">
                        <p class="coopIntro"></p>
                        <p>
                            Bruk menyen til venstre for å navigere. Du som bedrift kan lage egne utlysninger
                            for praksis eller bachelorprosjekt ved å bruke knappen oppe til høyre.
                        </p>
                    </div>
                    <div v-if="userProfile.role==='admin'" class="col-md-12">
                        <p class="coopIntro">Aktive utlysninger i BeNet</p>
                        <p>
                            Bruk menyen til venstre for å navigere. 
                        </p>
                    </div>
                </div>
                <div class="row"> <!-- <div class="secRow"> --> 
                    <div class="col-md-12" id="search-field">
                        <input v-model.trim="search" placeholder="Søk..."/>
                    </div>
                </div>

                <transition name="fade">
                    <div key="praksis" v-if="activeChoice=='praksis'">
                        <Card 
                            collection="praksis"
                        /> 
                    </div>

                    <div key="prosjekt" v-else-if="activeChoice=='prosjekt'">
                        <Card 
                            collection="prosjekt"
                        />
                    </div>
                    
                    <!-- <div key="bedrifter" v-else-if="activeChoice=='bedrifter'">
                        <Card 
                            collection="users"
                        />
                    </div> -->

                </transition>
            </div> <!-- </section> -->
        </div>
    </div> 
</div>
    
    </main>
</template>

<script>

//Modal er en pop-up component. skal brukes opp der man trenger popups

import Modal from '@/components/Modal'
import EditorWrapper from '@/components/EditorWrapper'
import SideMenu from '@/components/SideMenu'
import Card from '@/components/Card'
import { mapState } from 'vuex'
    
export default {
  name:"Coop",
  components: {
      Modal,
      EditorWrapper,
      Card,
      SideMenu
  },
  props: ["user"],
  data(){
      return {
      showUserAlert: false,
      showEditor: false
      }
  },
  computed:{
      ...mapState(['userProfile']),
      
      activeChoice(){
          return this.$route.params.type
      }
  },
  methods: {
      
      toggleModal(val) {
        if(val == "opened"){
            if(!this.userProfile.id){
                this.showUserAlert = !this.showUserAlert
            } else {
                this.showEditor = true
            }
        } else {
            this.showUserAlert = !this.showUserAlert
        }
        
      },
      toggleEditor(){
          this.showEditor = false;
      },
      
  },
  
}
</script>
