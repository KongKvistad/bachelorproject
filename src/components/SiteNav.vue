<template>
  <header>
        <router-link to="/">
          <h3>NTNU</h3>
        </router-link>
        
        <ul class="nav" v-if="user.role === 'student' || user.role === 'company'">
          <li>
            <router-link to="/">Informasjon</router-link>
          </li>
          <li>
            <router-link to="/calendar">Kalender</router-link>
          </li>
          <li class="dropdown">
            <span>Samarbeid</span>
            <div class="dropdown-content">
              <router-link :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</router-link>
              <router-link :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</router-link>
            </div>
            
          </li>
          <li>
            <router-link :to="{ name: 'profile', params: { id: user.id }}">Min Profil</router-link>
          </li>
          <li><a @click="logout()">logout</a></li>
        </ul>

        <ul v-else-if="user.role === 'admin'" class="inline">
          <li>
            <router-link to="/">Informasjon</router-link>
          </li>
          <li>
            <router-link to="/calendar">Kalender</router-link>
          </li>
          <li class="dropdown">
            <span>Oversikt</span>
            <div class="dropdown-content">
            <router-link :to="{ name: 'overview', params: { type: 'overordnet' }}">Overordnet</router-link>
              <router-link :to="{ name: 'overview', params: { type: 'nye avtaler' }}">Nye avtaler</router-link>
              
            </div>
            
          </li>
          <li class="dropdown">
            <span>Samarbeid</span>
            <div class="dropdown-content">
              <router-link :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</router-link>
              <router-link :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</router-link>
            </div>
            
          </li>
          
          <li class="dropdown">
            <a>Min Profil</a>
          </li>
          <li><a @click="logout()">logout</a></li>
        </ul>

        

        <ul v-else>
          <li>
            <router-link to="/">Informasjon</router-link>
          </li>
          <li class="dropdown">
            <span>Samarbeid</span>
            <div class="dropdown-content">
              <router-link :to="{ name: 'coop', params: { type: 'praksis' }}">Praksis</router-link>
              <router-link :to="{ name: 'coop', params: { type: 'prosjekt' }}">Prosjekter</router-link>
            </div>
            
          </li>
          <li>
            <router-link to="/signup">Register</router-link>
          </li>
          <li>
            <router-link to="/login">Logg inn</router-link>
          </li>
        </ul>
  </header>
</template>

<script>
export default {
  props:["user"],
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
