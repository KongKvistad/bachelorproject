<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('closeEditor')" class="close">close</div>
      <h3>Lag en ny utlysning</h3>
      <vue-editor v-model="content" />
      <button class="modalButton" @click.prevent="submit">Fullfør</button>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"

export default {
  name: "Editor",
  components: { VueEditor },
  data: () => ({
    content: "<h1>Some initial content</h1>"
  }),
  methods: {
      submit(){
          console.log(this.content)
      }
  }
}
</script>
