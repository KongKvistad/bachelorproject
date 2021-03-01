<template>
  <div class="customModal">
    <transition name="fade">
    <div v-if="!postMade" class="custom-modal-content">
      <div @click="$emit('closeEditor')" class="close">close</div>
      <h3>Lag en ny utlysning</h3>
      <vue-editor v-model="content" />
      <button class="modalButton" @click.prevent="submit">Fullfør</button>
    </div>
    <div v-else class="custom-modal-content">
      <div @click="$emit('closeEditor')" class="close">close</div>
      <h3>Utlysning sendt</h3>
      <p>utlysningen er sendt til administrator for gokjenning! vi tar videre kontakt</p>
      <button class="modalButton" @click="$emit('closeEditor')">Ok</button>
    </div>

    </transition>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { mapState } from 'vuex'
import { writeToCol } from "@/utils/create.js"

export default {
  name: "Editor",
  props:["collection"],
  components: { VueEditor },
  computed:{
      ...mapState(['userProfile']),
  },
  data: () => ({
    content: "<h1>Some initial content</h1>",
    postMade: false
  }),
  methods: {
      submit(){
          let data = {}
          data.content = this.content;
          data.from = this.userProfile.id
          data.approved = false
          let collection = this.collection
          
          writeToCol(collection, data).then(res => {
            if(res){
              this.postMade = true
            }
          })
      }
  }
}
</script>
