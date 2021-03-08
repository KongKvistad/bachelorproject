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
             <button class="button">godkjenn</button>
             <button class="button">avslå </button>
             </div>
        </div> 

    </li>
</transition>
</template>

<script>
import {getData, multipleCols} from '@/utils/get.js'


export default {
    name: 'PureCard',
    props: [
        "data",
    ],
    methods: {
    cardClick(data){
        this.$emit("cardClicked", data)
    },
        trim(data){
            return data.substring(0, 300) + "..."
        }
    }
}
</script>