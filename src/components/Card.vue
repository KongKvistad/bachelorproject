<template>

    <div v-if="cards">
        <div v-for="card in activeCards" :key="card.id" class="cards">
            <div class="cardsList row">
                <div class="left-column col-md-3">
                    <img :src= card.image_url alt="Bedrift logo">
                </div>
                <div class="right-column col-md-9" v-if="collection=='praksis' || collection=='prosjekt'">
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.description|truncate }}</p>
                    <p>{{card.name}}</p>
                </div>
                <div class="right-column col-md-9" v-else>
                    <h3>{{ card.name }}</h3>
                    <p>{{ card.about }}</p>
                </div>
                <div class="card-buttons col-md-12 d-flex justify-content-end">
                    <button class="primary-button">Les mer</button>
                    <button class="secondary-button" v-if="collection=='praksis' || collection=='prosjekt'">Prioriter</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import {getData} from '@/utils/get.js'


export default {
    name: 'Card',
    props: [
        "collection"
    ],
    data(){
        return {
            cards: []
        }
    },
    computed: {
        activeCards() {
            if (this.collection=="users"){
                return this.cards.filter(x=>x.role=="company")
            } else {
                return this.cards.filter(x=>x.approved==true)
            }
        }
    },
    methods: {

    },
    created(){
        getData(false, this.collection).then( res => {
            this.cards = res
        })
        
    },
    filters: { //limit the amount of description from db displayed on the card 
            truncate: function(value) {
                if (value) {
                    value = value.substring(0, 300) + '...';
                }
                return value
            }
        },
}
</script>