<template>

  <b-list-group-item >
    <b-row style="min-width: 15em;">
        <b-col cols="3">
        <b-row align-h="center">
            <b-img style="width: 6vw; height: 6vw;" v-bind="imgProps" :src="data.image_url" rounded="circle" alt="Studenten"></b-img>
        </b-row>
        </b-col>
        <b-col align-self="end"  cols="7">
        <b-row >
                <h3 class="mb-3">{{data.name}}</h3>
        
        </b-row>
        <b-row >
                <router-link :to="{path: '/profile/' + data.id}">Profil</router-link>
                <b-link @click="() => $emit('showModal')" class="ml-4">Søknad</b-link>
                
        </b-row>

        
        </b-col>
        <b-col cols="2" align-self="center" >
        <b-row align-h="center">
            <b-icon-plus style="width: 5vw; height: 5vw;" variant="primary" @click="$emit('clickedApp', data)"></b-icon-plus>
           
        </b-row>
        
        </b-col>
        
    </b-row>
  </b-list-group-item>
  

</template>

<script>
export default {
    name:"applicant",
    props:["data"],
    data() {
      return {
        imgProps: { blank: false, blankColor: '#777', class: 'm1' }
      }
    }
}
</script>