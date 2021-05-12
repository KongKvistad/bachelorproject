<!--Profil komponent-->

<template>
    <div class="col-md-8">

            <div class="row" style="margin-bottom:30px;">
                <div class="col-sm-6">
                    <h1 v-if="!canEdit">{{userData.name}}</h1>
                    <b-form-input v-else v-model="userData.name" ></b-form-input>
                </div>
                <div class="col-sm-6 editProfile d-flex justify-content-end align-self-center">
                    <a v-if="ownsPage" @click.prevent="canEdit = !canEdit"><b-icon icon="pencil-square"></b-icon> Rediger profil</a>
                </div>
            </div>

            <div class="row" style="margin-bottom:30px;">
                <div class="col-md-12">
                    
                    <p v-if="!canEdit">{{userData.about}}</p>
                    <b-form-input v-else v-model="userData.about" ></b-form-input>
                </div>
            </div>

            <div class="row" style="margin-bottom:30px;">
                <div class="col-md-12" v-if="userData.role == 'student'">
                    <h4>Foretrukket arbeid</h4>
                    <p v-if="!canEdit">{{userData.wanted_work}}</p>
                    <b-form-input v-else v-model="userData.wanted_work" ></b-form-input>
                </div>
                <div class="col-md-12" v-if="userData.role == 'company'">
                    <h4>Hva kan vi tilby?</h4>
                     <p v-if="!canEdit">{{userData.work_offer}}</p>
                      <b-form-input v-else v-model="userData.work_offer" ></b-form-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12" v-if="userData.role == 'student'">
                    <h4>Mine ferdigheter</h4>
                    <ul v-if="!canEdit">
                        <li v-for="(skill, idx) in userData.quali" :key="'skill' + idx" >{{skill}}</li>
                    </ul>
                    <b-form-input :value="userData.quali.toString()" v-else @input="e => updateQuali(e)" ></b-form-input>
                </div>
            </div>
             <div class="row" style="margin-top:30px;">
                <button @click.prevent="save()" :disabled="editChange == 0" class="button ml-auto">Lagre</button>
             </div>
        
    </div>
    
        
        

    
</template>
<script>

import {editDoc} from '@/utils/create.js'

export default {
    name: "About",
    props:["userData", "ownsPage"],
    data(){
        return {
            canEdit: false,
            editChange: 0
        }
    }, methods:{
        updateQuali(e) {
            console.log(e)
            let arr = e.split(",")
            this.userData.quali = arr
            return e
            
        },
        update(){
            editDoc('users', this.userData.id, this.userData).then(state => {
                     console.log(state)
                 })
        },
        save(){
            this.editChange = 0
            this.canEdit = false
            this.update()
        }
    },
    watch: {
        canEdit(newVal){
            if (newVal == false){
                this.update()
                this.editChange = 0
            } else {
                this.editChange ++
            }
        }
    }

}


</script>