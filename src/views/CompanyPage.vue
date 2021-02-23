<template>
    <main class="left-col-container">
    <section>
        <ul class="menu">
        
        </ul>
    </section>
    <section> 
        <h1>{{isUser}}</h1>
    </section>
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:"CompanyPage",
  computed: {
    ...mapState(['userProfile']),

    isUser(){
        return this.userProfile.id == this.$route.params.id ? true : false
    }
  }

}
</script>
