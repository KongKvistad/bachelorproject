<template>
<div v-if="results" class="matrixMenu">
 <Modal 
     v-if="showEditor"
     @close="toggleEditor"
   >
   <template v-slot:content>
    

      <EditorWrapper 
      :collection="activeChoice"
      :access="'editor'"
      :data="cardData"/>
     
     
   </template>
   </Modal>
  

  <ul class="tabs">
    <li :class="styleActive('alle')" @click="activeChoice = 'alle'">Alle ({{countCards('alle')}}) </li>
    <li :class="styleActive('praksis')" @click="activeChoice = 'praksis'">Praksis ({{countCards('praksis')}})</li>
    <li :class="styleActive('prosjekt')" @click="activeChoice = 'prosjekt'">Prosjekter ({{countCards('prosjekt')}})</li>
    </ul>
    <ul class="cards-list">
    
    <PureCard 
    @cardClicked="putDataInModal" 
    v-for="(entry, idx) in relCards" 
    v-bind:key="'card' + idx" :data="entry" 
    :collection="activeChoice"
    @appApproved="removeCard"/>
    
    </ul>
  
  </div>
</template>

<script>

import PureCard from '@/components/PureCard'
import EditorWrapper from '@/components/EditorWrapper'
import {getData, multipleCols} from '@/utils/get.js'
import Modal from '@/components/Modal'
export default {
  name: "MatrixMenu",
  components: { PureCard, EditorWrapper, Modal },

  data(){
      return {
        activeChoice: "alle",
        results: false,
        showEditor: false,
        cardData: false
      }
  },
  computed: {
      //sammenstill cards fra alle forslag hvis aktiv kategori er 'alle' 
      relCards(){
          return this.activeChoice !== 'alle' ?
          this.results[this.activeChoice] :
          this.results.praksis.concat(this.results.prosjekt)
      }
  },
  created(){
      multipleCols(false, ['praksis', 'prosjekt']).then(res => {
          let obj = {
              praksis: res[0].filter(x => x.approved != true),
              prosjekt: res[1].filter(x => x.approved != true)
          }

          obj.praksis.map(x => x.type = "praksis")
          obj.prosjekt.map(x => x.type = "prosjekt")
          this.results = obj
      })
  },
  methods: {
    removeCard(card){
      let tempArr = this.results[card.type]
      let index = tempArr.findIndex(x => x == card)
      tempArr.splice(index, 1)
    },
    toggleEditor(){
          this.showEditor = false;
      },

    putDataInModal(val){
      this.cardData = val
      this.showEditor = true
    },
      styleActive(value){
          if(this.activeChoice == value){
              return 'active'
          }else {
              return ''
          }  
        
      },
      countCards(key){
        return key !== 'alle' ? this.results[key].length : this.results.praksis.concat(this.results.prosjekt).length
      }
  }
}
</script>
