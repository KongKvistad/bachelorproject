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
        <ul class="menu">
        <li @click="setActive('praksis')" :class="styleActive('praksis')">Praksis</li>
        <li @click="setActive('prosjekt')" :class="styleActive('prosjekt')">Prosjekt</li>
        </ul>
    </section>
    <section>
        <div class="secRow">
            <div>
                <h1>{{activeChoice}}</h1>
                <input v-model.trim="search"/>
            </div>
        </div>
        <transition name="fade">
            <div key="praksis" class="contentList" v-if="activeChoice=='praksis'">
                <div class="test1"/> 
                <div class="container-fluid">
                    <div class="container">
                        
                            <Card 
                                collection="praksis"
                            />
                        
                    </div>
                </div>
            </div>
            <div key="prosjekt" class="contentList" v-else>
                <div class="test2"/>
                <div class="container-fluid">
                    <div class="container">
                        
                            <Card 
                                collection="prosjekt"
                                
                            />
                        
                    </div>
                </div>
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
import Card from '@/components/Card'
import { mapState } from 'vuex'
    
export default {
  name:"Coop",
  components: {
      Modal,
      EditorWrapper,
      Card
  },
  data(){
      return {
      activeChoice: this.$route.params.type,
      showUserAlert: false,
      showEditor: false
      }
  },
  computed:{
      ...mapState(['userProfile']),
  },
  methods: {
      styleActive(value){
          if(this.activeChoice == value){
              return 'active'
          }else {
              return ''
          }  
        
      },
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
      setActive(value){
          this.$router.push("/coop/" +value)
        
      }
  },
  watch:{
      //en watcher som følger med på endringer i URI'en og setter aktivt menyelement i henhold.
      '$route.params.type': function( val ){
          this.activeChoice = val
      }
  }
}
</script>
