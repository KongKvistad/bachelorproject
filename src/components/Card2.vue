<template>

   
            <div class="cardsList row">
                <div class="left-column col-md-3">
                    <img :src= "cardData.image_url" alt="Bedrift logo">
                </div>
                <div class="right-column col-md-9" v-if="collection=='praksis' || collection=='prosjekt'">
                    <h3>{{ cardData.title }}</h3>
                    <p>{{ cardData.content|truncate }}</p>
                    <p>{{cardData.name}}</p>
                </div>
                <div class="right-column col-md-9" v-else>
                    <h3>{{ cardData.name }}</h3>
                    <p>{{ cardData.about }}</p>
                </div>
                <div class="card-buttons col-md-12 d-flex justify-content-end">
                    
                    <button>Les mer</button>
                </div>
            </div>


</template>


<script>
import {mapState} from 'vuex'
import {getData} from '@/utils/get.js'
import Modal from '@/components/Modal'

export default {
    name: 'Card',
    
    props: [
        "collection", "cardData"
    ],
    data(){
        return {
            
        }
    },
  
}
</script>