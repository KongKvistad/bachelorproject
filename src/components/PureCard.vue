<template>
<transition name="fade">
    <div class="pureCard cardsList row">
        
            <div class="left col-md-3">
                <img :src="data.image_url" alt="Bedrift logo">
            </div>
            <div  class="col-md-6 middle">
                <h3>{{ data.title }}</h3>
                <div v-if="data.content" v-html="trim(data.content)"></div>  
            </div>

            <div class="right col-md-3">
                
                <div class="row">
                    <div class="col-md-12">
                        <button @click.prevent="cardClick(data)" class="primary-button">Foreslå endring</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button @click="setStatus(data, true)" class="secondary-button">Godkjenn</button>
                    </div>
                    <div class="col-md-6">
                        <button @click="setStatus(data, false)" class="danger-button" style="margin-left:0;">Avslå</button>
                    </div>
                </div>
            </div> 
    </div>
</transition>
</template>

<script>
import {getData, multipleCols} from '@/utils/get.js'
import { editDoc, deleteDoc } from '@/utils/create.js'

export default {
    name: 'PureCard',
    props: [
        "data",
        "collection"
    ],
    methods: {
        cardClick(data){
            this.$emit("cardClicked", data)
        },
        trim(data){
            return data.substring(0, 300) + "..."
        },
        setStatus(data, bool){
            
            data.approved = bool
            
            editDoc(data.type, data.id, data).then(res => {
                //if change got rhtough and value was changed to true
                if(res && bool == true){
                    this.$emit("appApproved", data)
                }
            })

            if(bool == false){
                deleteDoc(data.type, data.id).then(res => {
                    this.$emit("appApproved", data)
                })
            }
        }
    }
}
</script>