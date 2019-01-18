<template lang="html">
  <div class="ui divided items">
    <div class="item">
      <div class="image">
        <img :src="imgSrc">
      </div>
      <div class="content">
        <a class="header">Adam Nowak</a>
        <div class="meta">
          <span class="cinema">Politechnika Poznańska, Wydział Informatyki</span>
        </div>
        <div class="description">
          <p>Poszukuję wiedzy na temat programowania współbieżnego</p>
        </div>
        <div class="extra">
          <div class="ui label">Informatyka</div>
          <div class="ui label"><i class="globe icon"/> Programowanie Współbieżne</div>
        </div>
      </div>
    </div>
    <div class="item">
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
          <!-- <div class="ui right floated primary button">
            Buy tickets
            <i class="right chevron icon"/>
          </div> -->
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
          <!-- <div class="ui teal buttons">
            <div class="ui button">Save</div>
            <div class="ui floating dropdown icon button">
              <i class="dropdown icon"/>
              <div class="menu">
                <div class="item"><i class="edit icon"/> Edit Post</div>
                <div class="item"><i class="delete icon"/> Remove Post</div>
                <div class="item"><i class="hide icon"/> Hide Post</div>
              </div>
            </div>
          </div> -->
          <div class="ui label">Szybka pomoc</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemGroupExample',
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
