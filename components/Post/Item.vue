<template lang="html">
  <div class="ui divided items">
    <div class="item">
      <div class="image">
        <img :src="imgSrc">
      </div>
      <div class="content">
        <a class="header">12 Years a Slave</a>
        <div class="meta">
          <span class="cinema">Union Square 14</span>
        </div>
        <div class="description">
          <p/>
        </div>
        <div class="extra">
          <div class="ui label">IMAX</div>
          <div class="ui label"><i class="globe icon"/> Additional Languages</div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="image">
        <img src="/images/wireframe/image.png">
      </div>
      <div class="content">
        <a class="header">My Neighbor Totoro</a>
        <div class="meta">
          <span class="cinema">IFC Cinema</span>
        </div>
        <div class="description">
          <p/>
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
          <div class="ui label">Limited</div>
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
