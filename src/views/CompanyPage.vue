<template>
    <main class="left-col-container">
    <section class="topRow">
        
    </section>
    <section class="main">
    <section>
        <ul class="menu">
            <li @click="setActive('min profil')" :class="styleActive('praksis')">Praksis</li>
            <li @click="setActive('praksis')" :class="styleActive('praksis')">Prosjekt</li>
            <li @click="setActive('prosjekt')" :class="styleActive('prosjekt')">Bedrifter</li>
        </ul> 
    </section>
    <section> 
        <h1>{{isUser}}</h1>
    </section>
    </section>
    </main>
</template>

<script>

//work in progress
import { mapState } from 'vuex'

export default {
  name:"CompanyPage",
  computed: {
    ...mapState(['userProfile']),

    isUser(){
        return this.userProfile.id == this.$route.params.id ? true : false
    }
  },
  methods:{
    setActive(value){
          this.$router.push("/profile/"+ this.$route.params.id + "/" + value)
        
      },
      styleActive(value){
          if(this.activeChoice == value){
              return 'active'
          }else {
              return ''
          }
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
