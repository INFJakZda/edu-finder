<template>
  <div>
    <h4 class="ui dividing header">Zdjęcie profilowe</h4>
    <div class="dev-container">
      <div class="ui grid container">
        <div class="sixteen wide mobile sixteen wide tablet eight wide computer column">
          <div class="dev-center">
            <img
              :src="imgSrc"
              class="ui middle aligned small circular image" >
          </div>
        </div>
        <div 
          :class="{'dev-visible': selectedFile}"
          class="dev-center sixteen wide mobile sixteen wide tablet eight wide computer column">
          <input
            id="embedpollfileinput"
            :class="{'dev-visible': selectedFile}" 
            type="file" 
            class="inputfile"
            @change="onFileSelected">
          <label
            :class="{'dev-visible': selectedFile}"
            for="embedpollfileinput" 
            class="ui blue right button">
            <i class="ui file image icon"/> 
            Zmień zdjęcie
          </label>
        </div>
        <div 
          :class="{'dev-visible': !selectedFile}"
          class="dev-center sixteen wide mobile sixteen wide tablet eight wide computer column">
          <div class="dev-center">
            <button
              :class="{'dev-visible': !selectedFile}"
              class="ui green right button"
              style="min-height: 38px !important"
              @click="onUpload">Załaduj obrazek</button>
            <div
              v-if="selectedFile"
              :class="{'dev-visible': !selectedFile}" 
              style="flex-basis: 100%">{{ selectedFile.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <form 
      class="ui form dev-top-margin" 
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
          type="email"
          name="shipping[email]"
          placeholder="email@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Opis</label>
        <textarea
          v-model="user.bioText"
          rows="2"
          placeholder="Opowiedz kilka słów o sobie"
        />
      </div>

      <div class="field">
        <label>Miasto</label>
        <sui-dropdown
          v-model="user.cityId"
          :options="user.availableCities"
          placeholder="Wybierz miasto"
          search
          selection
        />
      </div>

      <button 
        :class="{
          green: showMessage,
          disabled: !(user.cityId && user.email && user.username)
        }" 
        class="ui blue button"
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
    this.user.cityId = this.user.cityId ? this.user.cityId.toString() : null
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
        cityId: this.user.cityId ? +this.user.cityId : 0,
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
        .$post(`/api/user/avatar`, formData)
        .then(() => {
          this.selectedFile = null
          this.$emit('refreshdev')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.inputfile {
  display: none;
}

.dev-container {
  padding: 10px;
}

.dev-center {
  display: flex !important;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.dev-visible {
  display: none !important;
}
.dev-top-margin {
  margin-top: 20px;
}
</style>
