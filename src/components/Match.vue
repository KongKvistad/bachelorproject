<template>
<b-list-group-item style="width: 100%; background-color: #f9fafb;">
    <b-row>
        <b-col cols="8">
            <p class="h5">{{item.compName}}</p>
        </b-col>
        <b-col cols="4">
            <p class="h5">{{item.studName}}</p>
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