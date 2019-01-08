<template>
  <div>
    <div class="ui top attached tabular menu">
      <div class="active item">Dodaj nowy post</div>
    </div>
    <div class="ui bottom attached active tab segment">
      <div class="ui equal width form">
        <div class="fields">
          <div class="field">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Username">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password">
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>First name</label>
            <input 
              type="text" 
              placeholder="First Name">
          </div>
          <div class="field">
            <label>Middle name</label>
            <input 
              type="text" 
              placeholder="Middle Name">
          </div>
          <div class="field">
            <label>Last name</label>
            <input 
              type="text" 
              placeholder="Last Name">
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>Opis</label>
            <textarea rows="2"/>
          </div>
        </div>
        <button 
          class="ui button"
          @click="addPost">
          <i class="add icon"/>
          Dodaj nowy post
        </button>
      </div>
    </div>
    <Item />
  </div>
  
</template>

<script>
import Item from '~/components/Post/Item.vue'

export default {
  components: {
    Item
  },
  methods: {
    addPost() {
      return 0
    }
  }
}
</script>

<style>
</style>
