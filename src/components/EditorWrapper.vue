<template>
  <div class="customModal">
    <transition name="fade">
    <div v-if="!postMade" class="custom-modal-content editor">
      <div @click="$emit('closeEditor')" class="close">close</div>
        <Editor
        :data="form"
        :heading="setHeading()"
        :contact="setContact"
        :access="access"
        @postmade="postMade = !postMade"
        />
      </div>
        <!-- if edit has been done-->
      <div v-else class="custom-modal-content">
        <div @click="$emit('closeEditor')" class="close">close</div>
        <h3 v-if="access != 'editor'">Utlysning sendt</h3>
        <h3 v-else>Forslag endret</h3>
        <p v-if="access != 'editor'">utlysningen er sendt til administrator for gokjenning! vi tar videre kontakt</p>
        <p v-else >Forslag til endring har blitt lagret og videreformidlet.</p>
        <button class="modalButton" @click="$emit('closeEditor')">Ok</button>
      </div>

    </transition>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Editor from '@/components/Editor'


export default {
  name: "EditorWrapper",
  props:["collection", "access", "data"],
  components: { Editor },
  computed:{
      ...mapState(['userProfile']),

      form(){
        //decides whether to prefill data and give editing options or wheter it's a new post
        if(this.access == "editor"){
            return {
                name: this.data.name,
                title: this.data.title,
                image_url: this.data.image_url ? this.data.image_url : 'https://firebasestorage.googleapis.com/v0/b/bachelorproject-2f333.appspot.com/o/profile.png?alt=media&token=f3af9c0c-5422-4d75-9fc9-b704b32ec3d1',
                selected: this.data.type,
                content: this.data.content,
                amount: this.data.spots,
                approved: this.data.approved,
                created_by: this.data.created_by,
                id: this.data.id,
                options: [
                    "praksis",
                    "prosjekt"
                    ]
            }
        } else{
            return {
                name: this.userProfile.name,
                title: "",
                image_url: this.userProfile.image_url ? this.userProfile.image_url : 'https://firebasestorage.googleapis.com/v0/b/bachelorproject-2f333.appspot.com/o/profile.png?alt=media&token=f3af9c0c-5422-4d75-9fc9-b704b32ec3d1',
                selected: this.collection,
                content: "",
                amount: 1,
                options: [
                    "praksis",
                    "prosjekt"
                    ]
            }
        }
    
   },

   setContact(){
          if(this.access == 'editor'){
              return {
                  name: this.data.contact ? this.data.contact : "N/A",
                  phone: this.data.phone ? this.data.phone : "N/A" 

              }
          } else {
              return {
                  name: this.userProfile.contact,
                  phone: this.userProfile.phone
              }
          }
      }
  },
  data: () => ({
    postMade: false,
  }),
 
  methods: {
      setHeading(){
          if(this.access == 'editor'){
              return "Rediger forslag"
          } else {
              return "Lag ny utlysning"
          }
      },
      

      
      
     

  }
}
</script>
