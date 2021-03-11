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
                    <button @click="showModal = true" class="primary-button">Les mer</button>
                    <button @click="$store.commit('updatePrioCart', card)" class="secondary-button" v-if="renderPrioBtn()">Prioriter</button>
                </div>
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
                                <router-link :to="{ name: 'profile', params: { id: card.created_by}}"> Vis profil</router-link>
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

</template>


<script>
import {mapState} from 'vuex'
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
        ...mapState(['userProfile']),

        activeCards() {
            if (this.collection=="users"){
                return this.cards.filter(x=>x.role=="company")
            } else {
                return this.cards.filter(x=>x.approved==true)
            }
        }
    },
    methods: {
        /* showCoopModal() {
            this.isCoopModalVisible = true;
        },
        closeCoopModal() {
            this.isCoopModalVisible = false;
        } */

        renderPrioBtn(){
            if(this.collection=='praksis' || this.collection=='prosjekt'){
                return this.userProfile.role == "student" ? true : false
            } else {
                return false
            }
            
        }
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