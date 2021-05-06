<template>
  <header>
      <!--<span v-if="prioCart" class="counter">{{prioCart}}</span>-->
      <b-navbar toggleable="lg"  >
      <b-navbar-brand to="/">
      <img src="../assets/images/ntnu_logo_white.png" alt="NTNU logo med slagord kunnskap for en bedre verden" style="width:150px;">
      </b-navbar-brand>

      <!--Følgende tre linjer er kun for å lettere å se hvem man er innlogget som i MVP-->
      <b-nav-text v-if="user.role === 'admin'">Velkommen Admin!</b-nav-text>
      <b-nav-text v-else-if="user.role === 'student'">Velkommen Student!</b-nav-text>
      <b-nav-text v-else-if="user.role === 'company'">Velkommen Bedrift!</b-nav-text>
      <!--------------------------------------------------------------------------------->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <!--Start på student meny-->
        <b-navbar-nav class="ml-auto" v-if="user.role === 'student'">
          <b-nav-item to="/">Om</b-nav-item>
          <b-nav-item to="/calendar">Kalender</b-nav-item>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Bachelor</b-dropdown-item>
            <!-- <b-dropdown-item :to="{ name: 'coop', params: { type: 'bedrifter' }}">Bedrifter</b-dropdown-item> -->
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Min oversikt">
            
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'default' }}">Profil</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'praksis' }}">Min praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'prosjekt' }}">Min bachelor</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/information">Hjelp</b-nav-item>
          <b-nav-item @click="logout()">Logg ut</b-nav-item>
        </b-navbar-nav>
        <!--Slutt på student meny-->

        <!--Start på bedrift meny-->
        <b-navbar-nav class="ml-auto" v-else-if="user.role === 'company'">
          <b-nav-item to="/">Om</b-nav-item>
          <b-nav-item to="/calendar">Kalender</b-nav-item>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Bachelor</b-dropdown-item>
            <!-- <b-dropdown-item :to="{ name: 'coop', params: { type: 'bedrifter' }}">Bedrifter</b-dropdown-item> -->
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Min oversikt">
            
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'default' }}">Profil</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'praksis' }}">Vår praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'profile', params: { id: user.id, type: 'prosjekt' }}">Vår bachelor</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/information">Hjelp</b-nav-item>
          <b-nav-item @click="logout()">Logg ut</b-nav-item>
        </b-navbar-nav>
        <!--Slutt på bedrift meny-->

        <!--Start på admin meny-->
        <b-navbar-nav class="ml-auto" v-else-if="user.role === 'admin'">
          <b-nav-item to="/">Om</b-nav-item>
          <b-nav-item to="/calendar">Kalender</b-nav-item>

        
          <b-nav-item-dropdown text="Oversikt">
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'nye utlysninger' }}">Nye utlysninger</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'matching' }}">Matching</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'brukere' }}">Brukere</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'overview', params: { type: 'historikk' }}">Historikk</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Bachelor</b-dropdown-item>
            <!-- <b-dropdown-item :to="{ name: 'coop', params: { type: 'bedrifter' }}">Bedrifter</b-dropdown-item> -->
            <!-- <b-dropdown-item to="#" disabled>Studenter</b-dropdown-item> -->
          </b-nav-item-dropdown>

          <b-nav-item to="/information">Hjelp</b-nav-item>
          <b-nav-item @click="logout()">Logg ut</b-nav-item>
        </b-navbar-nav>
        <!--Slutt på admin meny-->

        <!--Start på andre brukere-->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/">Om</b-nav-item>

          <b-nav-item-dropdown text="Samarbeid">
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'coop', params: { type: 'prosjekt' }}">Bachelor</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- <b-nav-item to="/signup">Registrer</b-nav-item> -->
          <b-nav-item to="/login">Logg inn</b-nav-item>

        </b-navbar-nav>
        <!--Slutt på andre brukere-->

      <DarkMode/>
      </b-collapse>
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
