import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import { db } from '@/firebase.js'

Vue.use(Vuex)

// VUEX er vue sitt top-level state API.
// det vil si: det finnes data som vi kanskje vil ha tilgang på på tvers av applikasjonen

// ved å hente de her, vil de være tilgjengelig i hele applikasjonen uten å måtte sende
// en ny forespørsel, eller å f.eks prop-drille.



const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    priorityCart: {
      praksis: [],
      prosjekt: [],
      praksisIds: [],
      prosjektIds: []
    }
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    addToPrioCart(state, card){
      //init
      if(!state.priorityCart[card.type]){
        state.priorityCart[card.type] = []
      }

      if(!state.priorityCart[card.type + 'Ids']){
        state.priorityCart[card.type + 'Ids'] = []
      }
      
      
      if(state.priorityCart[card.type].length > 2){
        this._vm.$toast.error('Du har allerede 3 prioriteringer', {
          position: "top",
          });  
          // optional options Object

      } else if (state.priorityCart[card.type].filter(x => x.id == card.data.id).length > 0){
        this._vm.$toast.error('Du har allerede prioritert denne utlysningen')
      } else {
        this._vm.$toast.success('"'+card.data.title + '"'+ ' ble lagt til som prioritering i min ' + card.type, {
          position: "top",
          }); 
      
        state.priorityCart[card.type].push(card.data)
        state.priorityCart[card.type+'Ids'].push(card.data.id)
      }

    },

    removeFromCart(state, card){
      let cartTarget = state.priorityCart[card.type].findIndex(x => x.id == card.data.id)
      state.priorityCart[card.type].splice(cartTarget, 1)
      
      let idTarget = state.priorityCart[card.type+'Ids'].findIndex(x => x == card.data.id)
      state.priorityCart[card.type+'Ids'].splice(idTarget, 1)
      
    },

    setPrioCart(state, cart){
      state.priorityCart = cart
    },
    
  },
  getters:{
    
    getPrioCart: (state) => (key) => {
      return state.priorityCart[key]
    }
  },
  actions: {
    async savePrioCart({ state }, id){
      // save PrioCart to DB

      await db.collection("priorities").doc(id).set(state.priorityCart, {merge: true})
      .then(docRef => {
          return true
      })
    },

    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)

    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      //clean business user
      if(form.role == 'company'){
        delete form.options
        delete form.password
        delete form.conf_pass
      }
      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set(form)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit, dispatch }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      //attatch userId
      let obj = userProfile.data();
      obj.id = user.uid
      // set user profile in state
      commit('setUserProfile', obj)
      //getCartContents
      dispatch('fetchPrioCart', user.uid)
      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },

    async fetchPrioCart({commit}, id){
      const cart = await db.collection("priorities").doc(id).get()
      
      if(cart.data() !== undefined){
        commit('setPrioCart',cart.data())
      } else {
        
        let startObj = {
          praksis: [],
          prosjekt: [],
          praksisIds: [],
          prosjektIds: []
        }
        
        commit('setPrioCart', startObj)
      }
      
    },

    
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost ({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store
