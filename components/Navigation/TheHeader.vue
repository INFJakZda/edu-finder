<template>
  <div class="dev-header-container">
    <div class="dev-header">
      <div class="ui secondary menu">
        <a class="active item">Ogłoszenia korepetytorów</a>
        <a class="item">Dodaj ogłoszenie</a>
        <a class="item">Ogłoszenia uczniów</a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input 
                type="text" 
                placeholder="Search...">
              <i class="search link icon"/>
            </div>
          </div>
          <a class="ui item">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
.dev-header-container {
  background-color: aqua;
}

.dev-header {
  margin: 20px;
}
</style>
