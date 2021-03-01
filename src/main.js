import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import router from './router'
import store from './store'
import { auth } from './firebase'
import './assets/scss/app.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

// mountinga må flettes inn i et forsøk på å autentisere,
// fordi applikasjonen mountes hver gang en URI lastes inn i nettleseren og noen av disse er beskyttet
let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
