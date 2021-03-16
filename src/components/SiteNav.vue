<template>
  <header>
      <!--<span v-if="prioCart" class="counter">{{prioCart}}</span>-->
      <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">
      <img src="../assets/images/ntnu_logo.png" alt="NTNU logo med slagord kunnskap for en bedre verden" style="width:200px;">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <!--Start på student og bedrift meny-->
        <b-navbar-nav class="ml-auto" v-if="user.role === 'student' || user.role === 'company'">
          <b-nav-item to="/">Om</b-nav-item>
          <b-nav-item to="/calendar">Kalender</b-nav-item>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'bedrifter' }}">Bedrifter</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Min oversikt">
            
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'default' }}">Profil</b-dropdown-item>
            <b-dropdown-item to="#" disabled>Min praksis</b-dropdown-item>
            <b-dropdown-item to="#" disabled>Min bachelor</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item @click="logout()">Logg ut</b-nav-item>
        </b-navbar-nav>
        <!--Slutt på student og bedrift meny-->

        <!--Start på admin meny-->
        <b-navbar-nav class="ml-auto" v-else-if="user.role === 'admin'">
          <b-nav-item to="/">Om</b-nav-item>
          <b-nav-item to="/calendar">Kalender</b-nav-item>

          <b-nav-item-dropdown text="Oversikt">
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'overordnet' }}">Overordnet</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'nye avtaler' }}">Nye avtaler</b-dropdown-item>
            <b-dropdown-item to="#" disabled>Brukere</b-dropdown-item>
            <b-dropdown-item to="#" disabled>Historikk</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'bedrifter' }}">Bedrifter</b-dropdown-item>
            <b-dropdown-item to="#" disabled>Studenter</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item @click="logout()">Logg ut</b-nav-item>
        </b-navbar-nav>
        <!--Slutt på admin meny-->

        <!--Start på andre brukere-->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/">Om</b-nav-item>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/signup">Registrer</b-nav-item>
          <b-nav-item to="/login">Logg inn</b-nav-item>

        </b-navbar-nav>
        <!--Slutt på andre brukere-->

      </b-collapse>
      <DarkMode/>
      </b-navbar>
      <!--Slutt på menu-->
    
  </header>
</template>

<script>
import DarkMode from '@/components/DarkMode'

export default {
  components: {
    DarkMode
  },
  props:["user"],
  computed:{
    // prioCart(){
    //   return this.$store.state.priorityCart.length > 0 ? this.$store.state.priorityCart.length : false 
    // }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
