<template>

  <b-list-group-item>
    <b-row v-if="typeof data === 'object'">
        <b-col cols="4">
        <b-row align-h="center">
            <b-img style="width: 6vw; height: 6vw;" v-bind="imgProps" :src="data.image_url" rounded="circle" alt="Circle image"></b-img>
        </b-row>
        </b-col>
        <b-col align-self="end"  cols="8">
        <b-row >
                <h2 class="mb-3">{{data.name}}</h2>
        
        </b-row>
        <b-row >
                <b-link @click="() => $emit('removeApp', data)">fjern</b-link>
                
        </b-row>

        
        </b-col>
        
    </b-row>
    <b-row v-else style="height: 5.3em;">
        <b-col cols="3" align-self="center">
        <b-row align-h="center" >
            <h3 style="margin: 0; color: #6590c2;">{{data}}</h3>
        </b-row>
        </b-col>
        <b-col align-self="end"  cols="6">
        <b-row >
                <h2 class="mb-3">{{data.name}}</h2>
        
        </b-row>
        <b-row >
               
                
        </b-row>

        
        </b-col>
    </b-row>
  </b-list-group-item>
  

</template>

<script>
export default {
    name:"selectedApplicant",
    props:["data"],
    data() {
      return {
        imgProps: { blank: false, blankColor: '#777', class: 'm1' }
      }
    }
}
</script>