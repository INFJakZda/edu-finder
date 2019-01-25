<template>
  <div>
    <sui-modal 
      v-model="open"
      :basic="true"
      :closable="false">
      <div class="ui icon header">
        <i class="archive icon"/>
        Czy na pewno chcesz usunąć ten element?
      </div>
      <div class="content dev-text">
        <p><slot/></p>
      </div>
      <div class="actions dev-center">
        <div 
          class="ui green basic cancel inverted button"
          @click="$emit('deletemodal')">
          <i class="remove icon"/>
          Nie
        </div>
        <div 
          class="ui red ok inverted button"
          @click="$emit('deleteitem')">
          <i class="checkmark icon"/>
          Tak
        </div>
      </div>
    </sui-modal>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.dev-text {
  text-align: center;
}
.dev-center {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>
