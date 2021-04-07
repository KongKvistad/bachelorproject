<template>

<b-container style="min-height: calc(100vh - 20em)">
  <div class="customModal"  v-if="loading">
    <b-spinner class="m-auto" variant="white"  style="width: 6rem; height: 6rem;"></b-spinner>
  
  </div>
  
  <b-row v-else >
  <Modal 
     v-if="modalShow"
     @close="modalShow = false"
   >
   <template v-slot:content>
   <vue-editor style="margin-top: 2em;" v-model="applications[activeApp]" :disabled = "true" :editor-toolbar="[[]]"/>
   </template>
   </Modal>
    <b-col cols="8">
       <b-list-group>
        <Applicant
        v-for="app in applicants"
        :key="app.id"
        :data="app"
        @clickedApp="handleApp"
        @showModal="setModal(app.id)"
        />
        </b-list-group>

    </b-col>
    <b-col cols="4">
        <b-list-group>
           <SelectedApplicant
           v-for="(app, idx) in selectedApp"
           :key="'selected' + idx"
           :data="app"
           @removeApp="handleRemove"
           />
        </b-list-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>

import {getDoc} from '@/utils/get.js'
import { db } from '@/firebase.js'
import { VueEditor } from "vue2-editor"
import Applicant from '@/components/Applicant'
import SelectedApplicant from '@/components/SelectedApplicant'
import Modal from '@/components/Modal'
export default {
    name:"applicants",
    components: {
        Applicant,
        SelectedApplicant,
        Modal,
        VueEditor
    },
    data(){
        return {
            applicants:false,
            loading: false,
            selectedApp: [1,2,3],
            modalShow: false,
            activeApp:false,
            applications: {}
        }
    },
    methods: {
        setModal(applicant){
            this.activeApp = applicant
            this.modalShow = !this.modalShow

        },
        //allows user to add applicants to list
        handleApp(app){
            let emptySlot = this.selectedApp.find(x => typeof x !== 'object')
            let index = this.applicants.indexOf(app)

            this.selectedApp.splice(emptySlot - 1, 1, app)
        
            this.applicants.splice(index, 1)
             
        },
        handleRemove(app){
            
            let index = this.selectedApp.indexOf(app)
            this.selectedApp.splice(index, 1, index +1)
            this.applicants.unshift(app)
            
        },

        async getApplicants(praksisId){

        const results = []

        const ref = db.collection('priorities')
        var query = await ref.where('praksisIds', 'array-contains', praksisId)
        .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                
                    let studRef = doc.id
                    let relData = doc.data().praksis
                    if(relData){
                        let applicationData = relData.filter(x => x.id == this.$route.params.id)[0]
                        this.applications[studRef] = applicationData.application
                    }
                    
                   
                    results.push(studRef)
                    
                });
            })
        
        return results
        },

        getItems (item_ids, callback) {
        let itemRefs = item_ids.map(id => {
            return db.collection('users').doc(id).get();
        });
        Promise.all(itemRefs)
        .then(docs => {
            let items = docs.map(doc => {
                let obj = doc.data()
                obj.id = doc.id
                return obj
                });
            callback(items);
        })
        .catch(error => console.log(error))
        }
    },

    mounted(){

       this.loading = true
       this.getApplicants(this.$route.params.id).then(res => {
           this.getItems(res, items => {
               this.applicants = items
               this.loading = false
               });

       })
       
    }
}
</script>