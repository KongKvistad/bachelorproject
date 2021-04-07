<template>
     <transition-group tag="ul" name="list" class="priorities" style="position: relative;">
        <b-card no-body class="overflow-hidden" v-for="(data, idx) in cart" :key="data.title + idx" tag="li" >
            <b-row no-gutters>
            <b-col md="4"  align="center">
                <b-card-img style="width: 14em; height: 11em; object-fit: contain;" :src= "data.image_url" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="8">
                <b-card-body :title="data.title">
                    <div class="h2 mb-0" v-if="idx == cart.length - 1" @click="arrange(idx, -1)">
                        <b-icon-arrow-up ></b-icon-arrow-up>
                    </div>
                    <div class="h2 mb-0" v-else-if="idx == 0" @click="arrange(idx, 1)">
                        <b-icon-arrow-down ></b-icon-arrow-down>
                    </div>
                    <div class="h2 mb-0" v-else>
                        <b-icon-arrow-up ></b-icon-arrow-up>
                        <b-icon-arrow-down ></b-icon-arrow-down>
                    </div>

                </b-card-body>
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
        
    </transition-group>
    
        
        

    
</template>
<script>
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
    name: "Priorities",
    props:[],
    computed:{
        renderArrows(){
            return '<img @click="arrange(idx)" class="pickarrow up" src="../assets/images/Left-Arrow-90.png"/>'
        }
    },

    data(){
        return{
            cart: this.$store.getters.getPrioCart("praksis")
        }
    },
    methods: {
    arrange: function (idx, dir) {
        this.cart.splice(idx + dir, 0, this.cart.splice(idx, 1)[0]);
    }
  }
}

</script>