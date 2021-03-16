<template>

    <div v-if="cards">
        <div v-for="card in activeCards" :key="card.id" class="cards">
            <div class="cardsList row">
                <div class="left-column col-md-3">
                    <img :src= card.image_url alt="Bedrift logo">
                </div>
                <div class="right-column col-md-9" v-if="collection=='praksis' || collection=='prosjekt'">
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.content|truncate }}</p>
                    <p>{{card.name}}</p>
                </div>
                <div class="right-column col-md-9" v-else>
                    <h3>{{ card.name }}</h3>
                    <p>{{ card.about }}</p>
                </div>
                <div class="card-buttons col-md-12 d-flex justify-content-end">
                    <button @click="toggleCoopModal(card)" class="primary-button">Les mer</button>
                    <button @click="addToCart(card)" class="secondary-button" v-if="renderPrioBtn()">Prioriter</button>
                </div>
            </div>
        </div>

        <Modal 
        v-if="isCoopModalVisible"
         @close="toggleCoopModal">
            <template v-slot:content>
                <div class="row coopModal">
                    <!-- <div class="left-column col-md-3">
                        <img :src= "expandedCard.image_url" alt="Bedriftslogo">
                        <div>
                            <p>{{expandedCard.name}}</p>
                            <p><a href="#">Vis profil</a></p>
                            <p>Bransje:</p>
                        </div>
                    </div>
                    <div class="row">
                        
                    </div> -->
                    <div class="row">
                        <div class="left-column col-md-3">
                            <img :src= expandedCard.image_url alt="Bedriftslogo">
                            <div>
                                <p>Super company</p>
                                <router-link :to="{ name: 'profile', params: { id: expandedCard.created_by}}"> Vis profil</router-link>
                                <p>Bransje:</p>
                            </div>
                            
                        </div>
                        <div class="right-column col-md-9">
                            <h1>{{ expandedCard.title }}</h1>
                            <p>Type: {{collection }}</p>
                            <p>Arbeidssted: </p>
                            <p>Arbeidsoppgaver:
                                <v-list>
                                    <v-list-tile v-for="(tag, index) in expandedCard.tags" :key="tag.id">
                                        <li v-if="index < tag.length">{{ tag }}, </li>
                                        <li v-else> {{ tag }}</li>
                                    </v-list-tile>
                                </v-list>
                             </p>
                            <h2>Beskrivelse</h2>
                            <p>{{ expandedCard.content }}</p>
                        </div>
                    </div>
                    <div class="col-12 modalbtns col-md-12 d-flex justify-content-end">
                        <div>
                            <button @click="$store.commit('updatePrioCart', expandedCard)" class="secondary-button" v-if="renderPrioBtn()">Prioriter</button>
                            <button class="secondary-button" @click="toggleCoopModal">Lukk</button>
                        </div>
                    </div>
                </div>
            </template>
        </Modal>
    </div>

</template>


<script>
import {mapState} from 'vuex'
import {getData} from '@/utils/get.js'
import Modal from '@/components/Modal'

export default {
    name: 'Card',
    components: {
        Modal
    },
    props: [
        "collection"
    ],
    data(){
        return {
            cards: [],
            isCoopModalVisible: false,
            showModal: false,
            expandedCard: false
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
        //Toggle mellom open og lukken "Les mer"-modal
        toggleCoopModal(card) {
            if(!this.isCoopModalVisible){
                this.expandedCard = card
            } else {
                this.expandedCard = false
            }
            this.isCoopModalVisible = !this.isCoopModalVisible;
        },

        renderPrioBtn(){
            if(this.collection=='praksis' || this.collection=='prosjekt'){
                return this.userProfile.role == "student" ? true : false
            } else {
                return false
            }
            
        },
        addToCart(card){
            this.$toast.success('prioriteringen' + '"'+card.title + '"'+ ' lagt til i min ' + this.collection, {
            // optional options Object

            })
            this.$store.commit('addToPrioCart', {type: this.collection, data: card})
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