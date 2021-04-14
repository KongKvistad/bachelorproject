<!-- Landingsside. har annet random innhold per nå, men skal bli til inofrmasjons-siden-->
<template>
  <div id="dashboard" class="main">
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6 indexIntro">
            <h1>Om NTNU BeNet</h1>
            <p>NTNU BeNet er et bedriftsnettverk som tilbyr praksisformidling og administrasjon av praksisopphold. 
              Tjenesten krever lite interaksjon fra deg som arbeidsgiver, og gjør det lettere for studenter å skaffe 
              og koordinere praksisplass eller bachelor-oppgave.</p>
            <p>Foreløpig er NTNU BeNet et internt bedriftsnettverk for Institutt for design på NTNU Gjøvik, men i 
              dagens digitale situasjon er det helt åpent for bedrifter fra andre kommuner og fylker. I tillegg er 
              det er et stort antall studenter på Gjøvik som er innflyttere, og som derfor har flere muligheter.</p>
          </div>

          <div class="col-md-6">
            <img class="img_about_1" src="../assets/images/about_image_1.png" alt="Student">
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 d-flex align-items-center">
            <img class="img_about_2" src="../assets/images/about_image_2.png" alt="Dame plasserer post-it-lapper på veggen">
          </div>

          <div class="col-md-6 align-self-center">
            <h2>Hvordan fungerer det?</h2>
            <p>Du som bedrift er ansvarlig for å ta i mot studenten eller de studentene som skal ha praksisplass hos dere. 
              Det første som skjer er at du må lage en utlysning, som beskriver hva praksisperioden vil inneholde. Dette er 
              noe studentene skal se, før de prioriterer 3 valgfrie bedrifter, ved å skrive søknader. </p>
            <p>Når de har gjort det, vil du få en oversikt over alle som har søkt til deg, samt lese deres søknader og få 
              tilgang til de gjeldene studentenes profil. Deres profil inneholder en digital CV og relevant informasjon om 
              studenten. Deretter må du som bedrift også prioritere dine søkere fra èn til tre, innen en gitt frist.</p>
          </div>
        </div>

         <div class="row indexIntro">
          <div class="col-md-6">
            <h2>Målsettinger</h2>
            <p>NTNU BeNet har som formål å legge til rette for at studentene kan få en praksisperiode som er gull 
              verdt. Det er et mål at alle studenter som har praksis, enten det er et obligatorisk fag eller et valgfag, 
              skal finne en bedrift som passer. Like så er det stor verdi for bedrifter å ha en praksisstudent hos seg, 
              da det bidrar til nytenkning og gode innspill fra nye perspektiver. </p>
          </div>
          
          <div class="col-md-6">
            <h2>Fordeler</h2>
            <p>NTNU BeNet har som formål å legge til rette for at studentene kan få en praksisperiode som er gull 
              verdt. Det er et mål at alle studenter som har praksis, enten det er et obligatorisk fag eller et valgfag, 
              skal finne en bedrift som passer. Like så er det stor verdi for bedrifter å ha en praksisstudent hos seg, 
              da det bidrar til nytenkning og gode innspill fra nye perspektiver. </p>
          </div>
        </div>
        <div class="row" v-show="!authorized">
          <div class="col-md-12 d-flex justify-content-end">
                <button class="primary-button">Registrer</button>
            </div>
        </div>
        
      </div>
    </div>
    
    <!-- <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li><a @click="toggleCommentModal(post)">comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section> -->

    <!-- full post modal -->
    <!-- <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">close</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>comments {{ fullPost.comments }}</a></li>
              <li><a>likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'
import { auth } from '@/firebase.js'

export default {
  components: {
    //CommentModal
  },
  data() {
    return {
      post: {
        content: ''
      },
      /* showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [] */
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts']),
    authorized: () => {return auth.currentUser !== null}
  },
  //alle disse metodene skal byttes ut - don't worry 'bout it
  methods: {



    /* createPost() {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    } */
  }
}
</script>

<style lang="scss" scoped>

</style>
