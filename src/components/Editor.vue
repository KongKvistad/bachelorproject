<template>
  <div id="post">
          <section class="left">
            <img :src="data.image_url"/>
            <div class="desc">
              <h2 class="companyName">{{data.name}}</h2>
              <strong>Kontakt</strong>
              <p class="contact">
              
                <span>Navn: {{contact.name}}</span>
                <span>TLF: {{contact.phone}}</span>
              </p>
            
            </div>
          </section>
          <section class="right">
          <h3>{{heading}}</h3>
          <form  @submit.prevent id="makePost">
              
              <div class="field full">
                <label for="title">Tittel</label>
                <input :disabled="setAccess()" v-model.trim="data.title" type="text" placeholder="praksisplass" id="title" />
              </div>
              
              <div class="field select">
                <label for="type">Type</label>
                <v-select :disabled="setAccess()" v-on:input="e => data.selected = e" id="type" :placeholder="data.selected" :options = "data.options"></v-select>
              </div>
              
              <div class="field select">
                <label for="amount">plasser</label>
                <input :disabled="setAccess()" v-model.trim="data.amount" type="text" id="amount" />
              </div>

              <div class="field select">
                <label for="from">Fra</label>
                <input :disabled="setAccess()" v-model.trim="data.from" id="from" type="date" :placeholder="data.from" />
              </div>
              
              <div class="field select">
                <label for="to">Til</label>
                <input :disabled="setAccess()" v-model.trim="data.to" type="date" id="to" :placeholder="data.to"  />
              </div>

          </form>
          <textarea style="min-height: 18em; padding: 2em 2em;" v-if="access == 'new'" v-model.trim="data.content"></textarea>
          <textarea disabled style="min-height: 18em; padding: 2em 2em;" v-else-if="access == 'owner'" v-model.trim="data.content"></textarea>
          <vue-editor v-else v-model="data.content" :editor-toolbar="customToolbar" />
          <div class="modal-buttons"> 
            <button v-if="access === 'editor' || access == 'new'" class="primary-button modalButton" @click.prevent="submit">Fullfør</button>
            <button @click.prevent="close" class="secondary-button">Avbryt</button>
          </div>
          </section>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { mapState } from 'vuex'
import { writeToCol, editDoc } from "@/utils/create.js"

export default {
  name: "Editor",
  props:["data", "heading", "contact", "access"],
  components: { VueEditor },

  data: () => ({
    postMade: false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [ "code-block"]
    ]
  }),
  computed:{
    ...mapState(['userProfile']),
  },
  methods: {
      setAccess(){
        if(this.access == "editor" || this.access == 'owner'){
          return true
        } else {
          return false
        }
      },
      submit(){
        if(this.access != 'editor') {
          let data = {}
          data.content = this.data.content;
          data.created_by = this.userProfile.id
          data.name = this.userProfile.name
          data.contact = this.userProfile.contact
          data.phone = this.userProfile.phone
          data.image_url = this.data.image_url
          data.approved = false
          data.spots = this.data.amount
          data.title = this.data.title
          data.from = new Date(this.data.from)
          data.to = new Date (this.data.to)

          let collection = this.data.selected

          
          writeToCol(collection, data).then(res => {
            if(res){
              this.$emit("postmade", true)
            }
          })
      
        } else {
          console.log(this.data)
            editDoc(this.data.selected, this.data.id, this.data).then(res => {
              console.log(res)
              if(res){
                this.$emit("postmade", true)
              }
            })
        }

    },
    close(){
      this.$emit("closed")
    } 
  }
}
</script>
