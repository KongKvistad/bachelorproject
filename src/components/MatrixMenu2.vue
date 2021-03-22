<template>
<div class="matrixMenu">
 <Modal 
     v-if="showEditor && widthModal"
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
    <li v-for="(tab, idx) in extractCols" :key="tab + idx" :class="styleActive(tab)" @click="activeChoice = tab"> {{tab}} </li>  
  </ul>
    
    <ul class="matrix-list">
    
        <slot name="content">

        </slot>
    
    </ul>
    
  
  </div>
</template>

<script>


import EditorWrapper from '@/components/EditorWrapper'
import {getData, multipleCols} from '@/utils/get.js'
import Modal from '@/components/Modal'
export default {
  name: "MatrixMenu2",
  components: { EditorWrapper, Modal },
  props:{
      data:{
          type: Object,
          required: true
      },
      widthModal:{
          type: Boolean,
          required: true
      }
  },
  data(){
      return {
        activeChoice: "alle",
        showEditor: false,
        cardData: false
      }
  },
  watch:{
      activeChoice(newVal){
          this.$emit("catChanged", newVal)
      }
  },
  computed: {

      extractCols(){
          return Object.keys(this.data)
      },


      
  },
  created(){
     
  },
  methods: {
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
     
  }
}
</script>
