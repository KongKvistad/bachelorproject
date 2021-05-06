<template>

<b-container style="min-height: calc(100vh - 20em)">
  <div class="customModal"  v-if="loading">
    <b-spinner class="m-auto" variant="white"  style="width: 6rem; height: 6rem;"></b-spinner>
  
  </div>
  <b-container v-else>
    <b-row class="mt-5 company-prio" style="margin-bottom: 2.3em;">
        <b-col  class="col-md-7" >
            <b-row>
                <h2>Søkere til {{userProfile.name}}</h2>
            </b-row>
            <b-row>
                <p >Legg til søkere med plusstegnet</p>
            </b-row>
            <b-row>
                <b-list-group style="padding-bottom: 30px; width: 90%;">
                    <Applicant
                    v-for="app in applicants"
                    :key="app.id"
                    :data="app"
                    @clickedApp="handleApp"
                    @showModal="setModal(app.id)"
                    />
                </b-list-group>

            </b-row>
            
        </b-col>
        <b-col  class="col-md-5">
            <h2>Våre prioriteringer</h2>
            <b-row>
                    <b-list-group>
                        <SelectedApplicant
                        v-for="(app, idx) in selectedApp"
                        :key="'selected' + idx"
                        :data="app"
                        @removeApp="handleRemove"
                        />
                    </b-list-group>
            </b-row>
        </b-col>

    </b-row>
    <b-row>
        
    </b-row>
  <b-row  >
  <Modal 
     v-if="modalShow"
     @close="modalShow = false"
   >
   <template v-slot:content>
    <p>Søknaden til: {{ applicants.find(x => x.id == activeApp).name }}</p>
   <vue-editor style="margin-top: 2em;" v-model="applications[activeApp]" :disabled = "true" :editor-toolbar="[[]]"/>
   </template>
   </Modal>
<!--     <b-col cols="8">
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
    </b-col> -->
  </b-row>
  <b-row class="py-5 px-3">
  <button @click="saveApplicants()" class="ml-auto primary-button">Lagre</button>
  <button class="secondary-button" @click="$router.go(-1)">Avbryt</button>
  </b-row>
  </b-container>
</b-container>
</template>

<script>

// TODO: currently only takes internships into account - in the future, additional parameters will be needed.
// TODO: offer slots according to data in DB

import {getDoc} from '@/utils/get.js'
import {editDoc} from '@/utils/create.js'
import { db } from '@/firebase.js'
import { VueEditor } from "vue2-editor"
import { mapState } from "vuex"
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
            postData: false,
            loading: false,
            selectedApp: [1,2,3],
            modalShow: false,
            activeApp:false,
            applications: {}
        }
    },
    computed: {
        ...mapState(['userProfile']),
    },
    methods: {

        async checkForPrios(){
            return await getDoc('company_priorities', this.$route.params.id)
        },

        saveApplicants(){
            let id = this.$route.params.id
            
            let arr = [...this.selectedApp]

            // initialize and set approved field to false

            // Object.values(obj).forEach(elem =>{
            //     if(typeof elem == 'object'){
            //         elem.approved = false
            //     }
            // })

            console.log(arr)
            
            editDoc('company_priorities', id, {spots: this.postData.spots, praksis: arr}).then(res => {
                this.$toast.success('Prioriteringer er lagret', {
                position: "top",
                }); 

            })
           
        },

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

                    // håndtering for data i priorities som ikke nødvendigvis har 'praksis-felt'
                    if(relData){
                        let applicationData = relData.filter(x => x.id == this.$route.params.id)[0]
                        this.applications[studRef] = applicationData.application
                    }
                    
                    //check with already existing priorities
                    let existing = this.selectedApp
                    if(existing.find(x => x.id == studRef)){
                        console.log(existing)
                    } else{
                        results.push(studRef)
                    }
                    
                    
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
    created(){
        getDoc("praksis", this.$route.params.id).then(res => {
            this.postData = res
        })
    },

    mounted(){
        
       this.loading = true

        //check to see if previous prios has been made
       this.checkForPrios().then( res => {
            
            //if priorities have already been made
            if (res){
            this.selectedApp = Object.values(res.praksis)
            }

            //get applicants
            this.getApplicants(this.$route.params.id).then(res => {
            this.getItems(res, items => {
                this.applicants = items
                this.loading = false
                });

            })
       })
       

       
       
    }
}
</script>