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
            <MatrixMenu2
             v-else-if="activeChoice =='brukere' && users"
             :data="users"
             :widthModal="false"
             @catChanged="tableCatChange"
             >
                <template v-slot:content>
                    <grid :cols="users[activeTableCat].cols" :rows="users[activeTableCat].rows" />
                </template>
             </MatrixMenu2>
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
import {multipleCols, getData, filterByField, getDoc} from '@/utils/get.js'
import MatrixMenu from '@/components/MatrixMenu'
import MatrixMenu2 from '@/components/MatrixMenu2'
import SideMenu from '@/components/SideMenu'
export default {
  name: "Overview",
   components: {
      Grid,
      MatrixMenu,
      MatrixMenu2,
      SideMenu
    },
  
data() {
    return {
        cols: ['Status', 'Navn', 'Year', 'Color'],
        rows: [
            ['Ford', 'Fusion', '2011', 'Silver'],
            ['Chevrolet', 'Cruz', '2018', 'White']
        ],
        deals: false,
        users: false,
        activeTableCat: "alle"
    }
},
 computed:{
      
      activeChoice(){
          return this.$route.params.type
      }
  },
  methods: {
      tableCatChange(val) {
          this.activeTableCat = val
      }
     
  },
  // data fra DB burde lastes inn i created, fordi dette skjer før selve komponenten mountes.
  // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
  created(){
      
      //get all the data concerning posts
      multipleCols(false, ['praksis', 'prosjekt']).then(res => {
          let obj = {
              praksis: res[0].filter(x => x.approved != true),
              prosjekt: res[1].filter(x => x.approved != true)
          }

          obj.praksis.map(x => x.type = "praksis")
          obj.prosjekt.map(x => x.type = "prosjekt")
          this.deals = obj
      })

        // get data for table over students
      filterByField('users', 'role', 'student').then(res => {
          
          let students = res
          // map priorities to students
          getData(false, 'priorities').then(prios => {
              students.forEach(stud => {
                  prios.forEach(prio => {
                      stud.priorities = prio.id == stud.id ? prio : false
                  })
              })
              
          }).then(()=> {
              //organize data for table below

              
              let usersObj = {
                  'alle': {
                      cols: ['navn'],
                      rows: []
                   },
                  'praksis': {
                      cols: ['status', 'navn'],
                      rows: []
                  },
                  'prosjekt': {
                      cols: ['status', 'navn'],
                      rows: []
                  }
              }
              
              students.forEach((stud, idx, orgArr) => {

                  usersObj.alle.rows.push([stud.name])

                  let prios = stud.priorities
                  
                  if(!prios){
                      usersObj.praksis.rows.push([stud.status = "ikke startet", stud.name])
                      usersObj.prosjekt.rows.push([stud.status = "ikke startet", stud.name])

                  }else {
                      
                      let praksisCount = stud.priorities.praksis.length
                      let prosjektCount = stud.priorities.prosjekt.length
                     
                      if(praksisCount <= 2 && praksisCount > 0){
                          usersObj.praksis.rows.push([stud.status = "påbegynt", stud.name])
                      } if (praksisCount >= 3 ){
                          usersObj.praksis.rows.push([stud.status = "søkt", stud.name])
                      } if(prosjektCount <= 2 && prosjektCount > 0){
                          usersObj.prosjekt.rows.push([stud.status = "påbegynt", stud.name])
                      } if (prosjektCount >= 3 ){
                          usersObj.prosjekt.rows.push([stud.status = "søkt", stud.name])
                      } if (praksisCount == 0){
                          usersObj.praksis.rows.push([stud.status = "ikke startet", stud.name])
                      } if (prosjektCount == 0){
                          usersObj.prosjekt.rows.push([stud.status = "ikke startet", stud.name])
                      }
                  }
                
              })
             
              this.users = usersObj

          })
         
          
      })
  },
}
</script>
