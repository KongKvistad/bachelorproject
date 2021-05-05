<template>
<b-list-group-item style="width: 100%;">
    <b-row>
        <b-col cols="8">
            <h3 class="h5">{{item.compName}}</h3>
        </b-col>
        <b-col cols="4">
            <h3 class="h5">{{item.studName}}</h3>
        </b-col>
        
        </b-row>

  </b-list-group-item>
</template>
<script>
  export default {
      name: "match",
      props:["item", "type"]
  }
</script>