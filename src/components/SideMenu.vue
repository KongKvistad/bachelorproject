<template>
<ul class="menu">
    <li v-for="(item, idx) in menuOptions"
     :key="'list' +idx"
     @click="setActive(item.param)"
    :class="styleActive(item.param)">{{item.text}}</li>
    
</ul>
</template>
<script>
export default {
  name:"SideMenu",
  props:{
      menuOptions: {
          type: Array,
          required: true
      },
      base:{
          type: String,
          required: true
      },
      id:{
          type: String,
          required: false
      }
  },
  data() {
      return {
          activeChoice : this.$route.params.type,
      }
  },
   methods:{
    setActive(value){
        if(this.id){
            
            this.$router.push(this.base + this.id  + value )
        } else {
            
            this.$router.push(this.base + value )
        }
          
      },
      styleActive(value){
          if("/" + this.activeChoice == value){
              return 'active'
          } else {
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