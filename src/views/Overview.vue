<!-- skal bli til oversikt for admin. følger samme route/sidemeny-mapping som f.eks Coop.-->
<template>
<main class="left-col-container">
    <section class="topRow">
       
    </section>
    <section class="main">   
    <section>
        <ul class="menu">
        <li @click="setActive('overordnet')" :class="styleActive('overordnet')">Overordnet</li>
        <li @click="setActive('nye avtaler')" :class="styleActive('nye avtaler')">Nye avtaler</li>
        </ul>
    </section>
    <section>
        <div class="secRow">
            <div>
                <h1>{{activeChoice}}</h1>
            </div>
        </div>
        <transition name="fade">
            <grid :cols="cols" :sort="true" :rows="rows"></grid>
        </transition>
    </section>
    </section>
    </main>
</template>


<script>
// grid er en vue-component som enkelt lager tables.
// tar props som kolonner og rader.

import Grid from 'gridjs-vue'
import {multipleCols} from '@/utils/get.js'
export default {
  name: "Overview",
   components: {
      Grid
    },
  
data() {
    return {
        activeChoice: this.$route.params.type,
        cols: ['Status', 'Navn', 'Year', 'Color'],
        rows: [
        ['Ford', 'Fusion', '2011', 'Silver'],
        ['Chevrolet', 'Cruz', '2018', 'White']
    ]
    }
},
  methods: {
     styleActive(value){
          if(this.activeChoice == value){
              return 'active'
          }else {
              return ''
          }  
        
      },
      setActive(value){
          this.$router.push("/overview/" +value)
        
      }
  },
  // data fra DB burde lastes inn i created, fordi dette skjer før selve komponenten mountes.
  // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  created(){
      multipleCols(1, ['praksis', 'prosjekt']).then(res => {
          console.log(res.flat())
      })
  },
  watch:{
      //en watcher som følger med på endringer i URI'en og setter aktivt menyelement i henhold.
      '$route.params.type': function( val ){
          this.activeChoice = val
      }
  }
}
</script>
