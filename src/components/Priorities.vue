<template>
     <transition-group tag="ul" name="list" class="priorities" >
        <li v-for="(data, idx) in cart" :key="data.title + idx">
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
        </li>
        
    </transition-group>
    
        
        

    
</template>
<script>
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