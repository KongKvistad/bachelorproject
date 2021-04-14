<template>
     <b-row class="mb-4">
        <b-col cols="3">
            <b-img :src="offer.image_url" style="width: 100%;"/>
        </b-col>
        <b-col cols="5">
            <b-row>
                <h2>{{offer.title}}</h2>
            </b-row>
            <b-row>
                
                <b class="mr-2">startDato:</b><p>{{offer.from.toDate().toDateString()}}</p>
                
            </b-row>
            <b-row>
               
                <b class="mr-2">sluttDato:</b><p>{{offer.to.toDate().toDateString()}}</p>
               
            </b-row>
            
        </b-col>
        <b-col cols="2" align-self="end">
            <button @click="accept(offer)" class="button">godta</button>
        </b-col>
     </b-row>
</template>
<script>


export default {
    name: "Contract",
    props:["offer"],
    computed:{
        
    },

    
    methods: {
    accept(offer){
        this.$emit("removeOffers", offer)
    }
  }
}

</script>