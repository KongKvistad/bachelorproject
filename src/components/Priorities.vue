<template>
     <b-card-group deck style="flex-direction: column;">
        <b-card no-body v-for="(data, idx) in cart" :key="data.title + idx" tag="li" >
            <b-row no-gutters>
             <b-col md="1" style="border-right: 1px solid #cecece; display: flex;" class="justify-content-center" >
                
                <h4 style="align-self:center;" ># {{idx + 1}}</h4>
                
              </b-col>          
            <b-col md="3"  align-self="center" align="center">
                <b-card-img style="max-width: 12em; max-height: 10em; object-fit: contain;" :src= "data.image_url" alt="Image" class="m-auto rounded-0"></b-card-img>
            </b-col>
            <b-col md="8">
                <b-card-body :title="data.title">
                    <div class="h2 mb-0" align="right" v-if="idx == cart.length - 1" @click="arrange(idx, -1)">
                        <b-icon-arrow-up ></b-icon-arrow-up>
                    </div>
                    <div class="h2 mb-0" align="right" v-else-if="idx == 0" @click="arrange(idx, 1)">
                        <b-icon-arrow-down ></b-icon-arrow-down>
                    </div>
                    <div class="h2 mb-0" align="right" v-else>
                        <b-icon-arrow-up @click="arrange(idx, -1)" ></b-icon-arrow-up>
                        <b-icon-arrow-down @click="arrange(idx, 1)" ></b-icon-arrow-down>
                    </div>

                </b-card-body>
                <b-card-footer align="right">
                    <button @click="$emit('deleteApp', data)" class="secondary-button button">Fjern</button>
                    <button v-if="data.application" @click="$emit('appOpen', data)" class="primary-button button">Rediger søknad</button>
                    <button v-else @click="$emit('appOpen', data)" class="danger-button button">Skriv søknad</button>
                </b-card-footer>
            </b-col>
            </b-row>
        </b-card>
        
        
        <!--<li v-for="(data, idx) in cart" :key="data.title + idx">
            <div class="cardimg">
                <img :src= "data.image_url"/>
            </div>
            <div class="content">
                <p class="title">{{data.title}}</p>
                <img v-if="idx == cart.length - 1" @click="arrange(idx, -1)" class="pickarrow up" src="../assets/images/Left-Arrow-90.png"/>
                <img v-else-if="idx == 0" @click="arrange(idx, 1)" class="pickarrow down" src="../assets/images/Left-Arrow-90.png"/>
                <template v-else>
                    <img @click="arrange(idx, -1)" class="pickarrow up" src="../assets/images/Left-Arrow-90.png"/>
                    <img @click="arrange(idx, 1)" class="pickarrow down" src="../assets/images/Left-Arrow-90.png"/>
                </template>
            </div>
        </li> -->
        
    </b-card-group>
    
        
        

    
</template>
<script>
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
    name: "Priorities",
    props:[],
    computed:{
        renderArrows(){
            return '<img @click="arrange(idx)" class="pickarrow up" src="../assets/images/Left-Arrow-90.png"/>'
        },
        cart(){
            return this.$store.getters.getPrioCart("praksis")
        }
    },

    
    methods: {
    arrange: function (idx, dir) {
        this.cart.splice(idx + dir, 0, this.cart.splice(idx, 1)[0]);
        this.$emit("prioChanged")
    }
  }
}

</script>