<template>
  <div class="customModal">
    <div class="custom-modal-content">
      <button @click="$emit('close')" class="close">Lukk</button>
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script>


export default {
  name: "Modal",
  props:[],
  methods: {
   
  }
}
</script>
