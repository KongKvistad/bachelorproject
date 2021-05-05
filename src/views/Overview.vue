<!-- skal bli til oversikt for admin. følger samme route/sidemeny-mapping som f.eks Coop.-->
<template>
<main class="left-col-container">
    <section class="topRow">
       
    </section>
    <section class="main"> 
        <div class="container-fluid">
            <div class="container padding-top50">
                <div class="row">
                    <div class="col-md-2 sideMenu">
                        
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
                        
                    </div>

            <div class="col-md-10">

                <div class="secRow">
                    <div>
                        <h1>{{activeChoice}}</h1>
                    </div>
                </div>
                <div v-if="activeChoice == 'overordnet'" class="newCoop">
                    <p>Nye avtaler</p>
                    <p><span>X</span> samarbeid mangler godkjenning</p>
                </div>
                <transition name="fade">
                    <b-container v-if="activeChoice =='overordnet'" >
                        <router-link to="/offerbroker"> Offerbroker</router-link>
                    </b-container>
                    <b-container v-else-if="activeChoice =='brukere' && studentData && companyData">
                        <h2 class="mt-5 mb-4">Studenter</h2>
                        <MatrixMenu2
                        
                        :data="studentData"
                        :widthModal="false"
                        @catChanged="tableCatChange"
                        >
                            <template v-slot:content>
                                <grid :cols="studentData[activeTableCat].cols" :sort="true" :rows="studentData[activeTableCat].rows" />
                            </template>
                        </MatrixMenu2>
                        <h2 class="mt-5 mb-4">Bedrifter</h2>
                        <grid :cols="companyData.cols" :sort="true" :rows="companyData.rows" />
                    </b-container>

                    
                    <grid v-else-if="activeChoice =='historikk'" :cols="cols" :sort="true" :rows="rows"></grid>
                    <MatrixMenu  v-else/>
                </transition>
            </div>
            
                 </div>
            </div>
        </div>

    </section>
    </main>

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
        studentData: false,
        activeTableCat: "alle",
        companyData:false
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
      },
      setCompanyData(comps){
        let cols = ['Navn', 'Kontakt', 'TLF', 'Email']

        let rowData = comps.map(x => {
            return [x.name, x.contact, x.phone, x.email]
        })

        this.companyData = {cols: cols, rows: rowData}

        
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

        // get data for table over students and comps
      getData(false, 'users').then(res => {
          
          let students = res.filter(x => x.role =='student')
          let comps = res.filter(x => x.role =='company')
          this.setCompanyData(comps)
          // map priorities to students
          getData(false, 'priorities').then(prios => {
              students.forEach(stud => {
                  prios.forEach(prio => {
                      
                      stud.priorities = prio.id == stud.id && !stud.priorities ? prio : stud.priorities
                      
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
                      
                      let praksisCount = stud.priorities.praksis ? stud.priorities.praksis.length : 0
                      let prosjektCount = stud.priorities.prosjekt ? stud.priorities.prosjekt.length : 0
                     
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
             
              this.studentData = usersObj
              

          })
         
          
      })

      //historyData
      getData(false, 'matches').then(res => {
          let resArr = []
          let cols = ["bedrift", "student", "dato"]
          res.forEach(elem => {
            let tableObj = elem.result.map(x => {
              return [x.compName, x.studName, elem.date.toDate().toDateString()]
            })

            resArr.push(tableObj)
          })
          console.log(resArr)
          this.cols = cols
          this.rows = resArr.flatMap(x => x)

      })
  },
}
</script>
