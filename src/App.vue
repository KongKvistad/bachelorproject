<template>
  <div id="app">
    <SiteNav :user="userProfile"></SiteNav>
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
