<template>
    <div v-if="cards" class="cardsList">
    <div v-for="card in cards" :key="card.id" class="cards">
        <div class="left-column">
            <img :src=imageLink alt="Bedrift logo">
        </div>
        <div class="right-column">
            <h3>{{ card.tittel }}</h3>
            <p>{{ card.beskrivelse }}</p>
        </div>
    </div>
    </div>
</template>

<script>
import {getData} from '@/utils/get.js'


export default {
    name: 'Card',
    props: [
        "collection",
    ],
    data(){
        return{
            cards: []
        }
    },
    methods: {

    },
    created(){
        getData(false, this.collection).then( res => {
            this.cards = res
        })
    }
}
</script>