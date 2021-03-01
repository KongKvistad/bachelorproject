<template>
  <div id="app">
    <SiteNav :user="userProfile"></SiteNav>
    <!--router-view rendrer all components listet i router/index.js.
    Nav-komponenten ligger ovenfor fordi den skal være med på alle pages-->
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'

export default {
  components: {
    SiteNav
  },
  computed: {
    ...mapState(['userProfile']),
    
    showNav() {
      return Object.keys(this.userProfile).length >= 0
    }
  },
  mounted(){
    console.log(process.env)
  }
}
</script>
