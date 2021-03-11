<template>
  <div class="customModal">
    <div class="custom-modal-content">
      <div @click="$emit('close')" class="close">close</div>
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
