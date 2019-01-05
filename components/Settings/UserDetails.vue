<template>
  <div>
    <h4 class="ui dividing header">Zdjęcie profilowe</h4>
    <div class="dev-container">
      <div class="ui grid container">
        <div class="sixteen wide mobile five wide tablet five wide computer column">
          <div class="dev-center">
            <img
              :src="imgSrc"
              class="ui middle aligned tiny circular image" >
          </div>
        </div>
        <div class="sixteen wide mobile six wide tablet six wide computer column">
          <div class="dev-center">
            <input 
              id="embedpollfileinput" 
              type="file" 
              class="inputfile"
              @change="onFileSelected">
            <label 
              for="embedpollfileinput" 
              class="ui red right button">
              <i class="ui file image icon"/> 
              Zmień zdjęcie
            </label>
          </div>
        </div>
        <div class="sixteen wide mobile five wide tablet five wide computer column">
          <div class="dev-center">
            <button 
              :class="{disabled: !selectedFile}"
              class="ui green right button"
              @click="onUpload">Załaduj obrazek</button>
            <div 
              v-if="selectedFile" 
              style="display: block">{{ selectedFile.name }}</div>
          </div>
        </div>          
      </div>
    </div>
    <form 
      class="ui form" 
      @submit.prevent="submitForm">
      <h4 class="ui dividing header">Podstawowe dane</h4>
      <div class="field">
        <label>Nazwa użytkownika</label>
        <input
          v-model="user.username"
          type="text"
          name="shipping[first-name]"
          placeholder="nick"
        >
      </div>
      <div class="field">
        <label>Adres email</label>
        <input
          v-model="user.email"
          type="text"
          name="shipping[email]"
          placeholder="email@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Opis</label>
        <textarea
          v-model="user.bioText"
          rows="4"
          placeholder="Opowiedz nam kilka słów o sobie :)"
        />
      </div>

      <div class="field">
        <label>Miasto</label>
        <sui-dropdown
          v-model="user.cityId"
          :options="user.availableCities"
          :placeholder="user.city ? user.city.name : ''"
          search
          selection
        />
      </div>

      <button 
        :class="{green: showMessage}" 
        class="ui button"
        tabindex="0">
        <span v-show="showMessage">
          <i class="save icon"/>Zapisano zmiany
        </span>
        <span v-show="!showMessage">Zapisz zmiany</span>
      </button>
      
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      current: null,
      selectedFile: null,
      showMessage: false
    }
  },
  computed: {
    imgSrc() {
      return this.$store.getters.imgSrc
    }
  },
  watch: {
    user: function() {
      if (this.$auth.loggedIn) {
        this.$store.dispatch('getUserImg', this.$auth.user.id)
      } else {
        this.$store.dispatch('rmUserImg')
      }
      this.user.cityId = this.user.cityId ? this.user.cityId.toString() : ''
    }
  },
  created() {
    this.user.cityId = this.user.cityId ? this.user.cityId.toString() : ''
  },
  methods: {
    updateImg() {
      return this.user.avatarId === null
        ? 'https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png'
        : `https://loli-server.azurewebsites.net/api/picture/${
            this.user.avatarId
          }`
    },
    submitForm() {
      let post = {
        username: this.user.username,
        email: this.user.email,
        cityId: +this.user.cityId,
        bioText: this.user.bioText,
        id: +this.$auth.user.id
      }
      this.$axios
        .$put(`/api/user/${this.$auth.user.id}/details`, post)
        .then(() => {
          this.updateMassage()
        })
        .catch(e => console.log(e))
    },
    updateMassage() {
      this.showMessage = true
      setTimeout(() => {
        this.showMessage = false
      }, 3000)
    },
    onFileSelected() {
      this.selectedFile = event.target.files[0]
    },
    onUpload() {
      const formData = new FormData()
      formData.append('file', this.selectedFile, this.selectedFile.name)
      this.$axios
        .$post(`/api/user/${this.$auth.user.id}/avatar`, formData)
        .then(() => {
          this.selectedFile = null
          this.$emit('refresh')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
.inputfile {
  display: none;
}

.dev-container {
  padding: 10px;
}

.dev-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
