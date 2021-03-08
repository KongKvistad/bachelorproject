<template>
  <div class="coop-modal">
    <div class="coop-modal-content">
      <div @click="$emit('close')" class="close">close</div>
      <h3>Oops!</h3>
      <p>{{content}}</p>
       <button class="modalButton" @click="close">Ok</button>
    </div>
  </div>
</template>

<style scoped>
.coop-modal {
    background-color: wheat;
    position: absolute;
    top: 50%;
    
    z-index: 9999;
}
</style>

<script>


export default {
  name: "CoopModal",
  props:["content"],
  methods: {
      close() {
          this.$emit('close');
      }
  }
}
</script>