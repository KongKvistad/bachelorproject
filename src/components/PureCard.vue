<template>
<transition name="fade">
    <li class="pureCard">
        <div class="left">
            <img :src="data.image_url" alt="Bedrift logo">
        </div>
        <div class="middle">
            <h3>{{ data.title }}</h3>
            <div v-if="data.content" v-html="trim(data.content)"></div>
            
        </div>
        <div class="right">
             <button @click.prevent="cardClick(data)" class="button">foreslå endring</button>
             <div>
             <button @click="setStatus(data, true)" class="button">godkjenn</button>
             <button @click="setStatus(data, false)" class="button">avslå </button>
             </div>
        </div> 

    </li>
</transition>
</template>

<script>
import {getData, multipleCols} from '@/utils/get.js'
import { editDoc } from '@/utils/create.js'

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
        }
    }
}
</script>