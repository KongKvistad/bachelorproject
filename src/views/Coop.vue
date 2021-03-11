<!-- Page for samarbeid. Sidemeny er mappet til navigasjon,
 så man kan laste f.eks coop/praksis med riktig menyelement valgt-->
<template>
    
    <main class="left-col-container">
    <Modal 
     v-if="showUserAlert"
     @close="toggleModal" 
     content="Du må logge inn eller registrere deg før du kan publisere en utlysning!"/>
    <EditorWrapper 
    :collection="activeChoice"
    :access="'new'"
    v-if="showEditor"
    @closeEditor="toggleEditor" />
    <section class="topRow blue">
        <div>
            <h1>Utlysninger</h1>
            <button @click.prevent="toggleModal('opened')">Ny utlysning</button>
        </div>
    </section>
    <section class="main">   
    <section>
        <SideMenu
        :menuOptions="[{
            param: '/praksis',
            text: 'Praksis'
        },
        {
            param: '/prosjekt',
            text: 'Prosjekter'
        },
        {
            param: '/bedrifter',
            text: 'Bedrifter'
        }]"
        base="/coop"
         />
    </section>
    <section>
        <div class="secRow">
            <div>
                <h2>{{activeChoice}}</h2>
                <input v-model.trim="search"/>
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
            <div key="bedrifter" v-else-if="activeChoice=='bedrifter'">
          
                <Card 
                    collection="users"
                />

            </div>
        </transition>
    </section>
    </section>
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
