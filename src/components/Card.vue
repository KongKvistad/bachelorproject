<template>
    <div v-if="cards">
    <div v-for="card in activeCards" :key="card.id" class="cards">
        <div class="cardsList row">
            <div class="left-column col-md-3">
                <img :src= card.image_url alt="Bedrift logo">
            </div>
            <div class="right-column col-md-9">
                <h3>{{ card.title }}</h3>
                <p>{{ card.description|truncate }}</p>
            </div>
            <div class="card-buttons col-md-12 d-flex justify-content-end">
                <button @click="showModal = true" class="primary-button">Les mer</button>
                <button class="secondary-button">Prioriter</button>
            </div>

            <!-- POP-UP (MODAL) FOR SHOWING ALL INFORMATION IN A CARD-->
            <transition name="fade" appear>
                <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
            </transition>
            <transition name="slide" appear>
                <div class="coopModal" v-if="showModal">
                    <div class="row">
                        <div class="col-12">
                            <p @click="showModal = false"><span> &#10006; </span></p>
                        </div>
                    </div>
                    <div class="row">
                        
                    </div>
                    <div class="row">
                        <div class="left-column col-md-3">
                            <img :src= card.image_url alt="Bedriftslogo">
                            <div>
                                <p>Super company</p>
                                <p><a href="#">Vis profil</a></p>
                                <p>Bransje:</p>
                            </div>
                            
                        </div>
                        <div class="right-column col-md-9">
                            <h1>{{ card.title }}</h1>
                            <p>Type: {{collection }}</p>
                            <p>Arbeidssted: </p>
                            <p>Arbeidsoppgaver:
                                <v-list>
                                    <v-list-tile v-for="(tag, index) in card.tags" :key="tag.id">
                                        <li v-if="index < tag.length">{{ tag }}, </li>
                                        <li v-else> {{ tag }}</li>
                                    </v-list-tile>
                                </v-list>
                             </p>
                            <h2>Beskrivelse</h2>
                            <p>{{ card.description }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 modalbtns">
                            <div>
                                <button class="primary-button">Prioriter</button>
                                <button class="secondary-button" @click="showModal = false">Lukk</button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>

    </div>
</template>

<script>
import {getData} from '@/utils/get.js'
//import CoopModal from '@/components/CoopModal.vue'


export default {
    name: 'Card',
    components: {
        //CoopModal
    },
    props: [
        "collection"
    ],
    data(){
        return {
            cards: [],
            //isCoopModalVisible: false,
            showModal: false
        }
    },
    computed: {
        activeCards() {
            return this.cards.filter(x=>x.approved==true)
        }
    },
    methods: {
        /* showCoopModal() {
            this.isCoopModalVisible = true;
        },
        closeCoopModal() {
            this.isCoopModalVisible = false;
        } */
    },
    created(){
        getData(false, this.collection).then( res => {
            this.cards = res
        })
    },
    filters: { //limit the amount of description from db on card 
            truncate: function(value) {
                if (value) {
                    value = value.substring(0, 300) + '...';
                }
                return value
            }
        },
}
</script>