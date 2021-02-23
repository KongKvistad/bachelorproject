<template>
    <main class="left-col-container">
    <section>
        <ul class="menu">
        <li @click="setActive('praksis')" :class="styleActive('praksis')">Praksis</li>
        <li @click="setActive('prosjekt')" :class="styleActive('prosjekt')">Prosjekt</li>
        </ul>
    </section>
    <section>
        <transition name="fade">
            <div key="praksis" class="contentList" v-if="activeChoice=='praksis'">
                <div class="test1"/>
            </div>
            <div key="prosjekt" class="contentList" v-else>
                <div class="test2"/>
            </div>
        </transition>
    </section>
    </main>
</template>

<script>


export default {
  name:"Coop",
  data(){
      return {
      activeChoice: this.$route.params.type
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
          this.$router.push("/coop/" +value)
        
      }
  },
  watch:{
      '$route.params.type': function( val ){
          this.activeChoice = val
      }
  }
}
</script>
