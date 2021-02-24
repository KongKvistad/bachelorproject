<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')" class="close">close</div>
      <h3>Oops!</h3>
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>


export default {
  name: "Modal",
  props:["content"],
  methods: {
   
  }
}
</script>
