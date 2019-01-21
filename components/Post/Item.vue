<template lang="html">
  <div class="ui divided items">
    <div 
      v-for="post in posts"
      :key="post.id"
      class="item">
      <div class="image">
        <img :src="imgSrc">
      </div>
      <div class="content">
        <a class="header">Jan Kowalski</a>
        <div class="meta">
          <span class="cinema">Uniwersytet Adama Mickiewicza, Biologia</span>
        </div>
        <div class="description">
          <p>Potrzebuję korepetycji z Komórek biologicznych u profesora Mickiewicza</p>
        </div>
        <div class="extra">
          <div class="ui right floated compact menu">
            <div class="ui simple dropdown item">
              opcje
              <i class="dropdown icon"/>
              <div class="menu">
                <div class="item"><i class="edit icon"/> Edytuj post</div>
                <div class="item"><i class="delete icon"/> Usuń post</div>
              </div>
            </div>
          </div>
          <div class="ui label">Szybka pomoc</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemGroupExample',
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return this.$store.getters.imgSrc
    }
  }
}
</script>

<style>
.dev-border {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
    0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}
</style>
