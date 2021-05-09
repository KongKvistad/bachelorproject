<template>
<div v-if="results" class="matrixMenu">
<Modal 
     v-if="showFeedback"
     @close="toggleEditor"
   >
   <template v-slot:content>
   <h1>Er du sikker?</h1>
   <p>{{operation.operation  ? 'er du sikker på at du vil godkjenne? Utlysningen vil ble offentliggjort' : 'er du sikker på at du vil avslå? Utlysningen vil bli fjernet fra databasen'}}</p>
   <button @click.prevent="doOperation(operation)"  class="w-25 ml-auto d-block button">Godkjenn</button>
   </template>
</Modal>
 <Modal 
     v-if="showEditor"
     @close="toggleEditor"
   >
   <template v-slot:content>
    

      <EditorWrapper 
      :collection="activeChoice"
      :access="'editor'"
      :data="cardData"
      @closed="showEditor = !showEditor"/>
     
     
   </template>
   </Modal>
  

  <ul class="tabs">
    <li :class="styleActive('alle')" @click="activeChoice = 'alle'"><a href="#">Alle ({{countCards('alle')}})</a> </li>
    <li :class="styleActive('praksis')" @click="activeChoice = 'praksis'"><a href="#">Praksis ({{countCards('praksis')}})</a></li>
    <li :class="styleActive('prosjekt')" @click="activeChoice = 'prosjekt'"><a href="#">Prosjekter ({{countCards('prosjekt')}})</a></li>
    </ul>
    <ul class="cards-list">
    
    <PureCard 
    @cardClicked="putDataInModal" 
    v-for="(entry, idx) in relCards" 
    v-bind:key="'card' + idx" :data="entry" 
    :collection="activeChoice"
    @issueFeedback="giveFeedback"/>
    
    </ul>
  
  </div>
</template>

<script>

import PureCard from '@/components/PureCard'
import EditorWrapper from '@/components/EditorWrapper'
import {getData, multipleCols } from '@/utils/get.js'
import {editDoc, deleteDoc} from '@/utils/create.js'
import Modal from '@/components/Modal'
export default {
  name: "MatrixMenu",
  components: { PureCard, EditorWrapper, Modal },

  data(){
      return {
        activeChoice: "alle",
        results: false,
        showEditor: false,
        cardData: false,
        showFeedback: false,
        operation: false
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
    giveFeedback(op){
      this.operation = op
      this.showFeedback = true;
    },
    doOperation(op){
      if(op.operation){
        op.item.approved = true
        editDoc(op.item.type, op.item.id, op.item).then(res => {
          //if change got rhtough and value was changed to true
            this.removeCard(op.item)
        })
      } else {
        deleteDoc(op.item.type, op.item.id).then(res => {
            this.removeCard(op.item)
        })
      }

      this.showFeedback = false  
      

     
    },
    toggleEditor(){
          this.showEditor = false;
          this.showFeedback = false;
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
