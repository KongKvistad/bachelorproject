<!-- skal bli til oversikt for admin. følger samme route/sidemeny-mapping som f.eks Coop.-->
<template>
<main class="left-col-container">
    <section class="topRow">
       
    </section>
    <section class="main">   
    <section>
        <SideMenu
        :menuOptions="[{
            param: '/overordnet',
            text: 'Overordnet'
        },
        {
            param: '/nye avtaler',
            text: 'Nye avtaler'
        },
        {
            param: '/brukere',
            text: 'Brukere'
        },
        {
            param: '/historikk',
            text: 'Historikk'
        }]"
        base="/overview"
         />
    </section>
    <section>
        <div class="secRow">
            <div>
                <h1>{{activeChoice}}</h1>
            </div>
        </div>
        <transition name="fade">
            <grid v-if="activeChoice =='overordnet'" :cols="cols" :sort="true" :rows="rows"></grid>
            <grid v-else-if="activeChoice =='brukere'" :cols="cols" :sort="true" :rows="rows"></grid>
            <grid v-else-if="activeChoice =='historikk'" :cols="cols" :sort="true" :rows="rows"></grid>
            <MatrixMenu  v-else/>
        </transition>
    </section>
    </section>
    </main>
    <!--<div class="container-fluid">
    <div class="container">
            <div class="row align-items-center" style="height:700px;">
                <div class="col-md-4">
                    <h1>dd</h1>
                </div>
                <div class="col-md-3">hei</div>
                <div class="col-md-5">ho</div>
            </div>
        </div>
    </div> -->

</template>


<script>
// grid er en vue-component som enkelt lager tables.
// tar props som kolonner og rader.

import Grid from 'gridjs-vue'
import {multipleCols} from '@/utils/get.js'
import MatrixMenu from '@/components/MatrixMenu'
import SideMenu from '@/components/SideMenu'
export default {
  name: "Overview",
   components: {
      Grid,
      MatrixMenu,
      SideMenu
    },
  
data() {
    return {
        cols: ['Status', 'Navn', 'Year', 'Color'],
        rows: [
        ['Ford', 'Fusion', '2011', 'Silver'],
        ['Chevrolet', 'Cruz', '2018', 'White']
    ]
    }
},
 computed:{
      
      activeChoice(){
          return this.$route.params.type
      }
  },
  methods: {
     
  },
  // data fra DB burde lastes inn i created, fordi dette skjer før selve komponenten mountes.
  // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  created(){
      multipleCols(1, ['praksis', 'prosjekt']).then(res => {
          //console.log(res.flat())
      })
  },
}
</script>
