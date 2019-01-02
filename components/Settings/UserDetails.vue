<template>
  <div>
    <h4 class="ui dividing header">Załaduj swoje zdjęcie</h4>
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
      <h4 class="ui dividing header">User datails info</h4>
      <div class="field">
        <label>User Name</label>
        <input
          v-model="user.username"
          type="text"
          name="shipping[first-name]"
          placeholder="Nick"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          v-model="user.email"
          type="text"
          name="shipping[email]"
          placeholder="example@edu-finder.fun"
        >
      </div>
      <div class="field">
        <label>Bio</label>
        <textarea
          v-model="user.bioText"
          rows="4"
          placeholder="Tell us few word about you :)"
        />
      </div>

      <div class="field">
        <label>City</label>
        <sui-dropdown
          v-model="user.cityId"
          :options="user.availableCities"
          :placeholder="user.city ? user.city.name : ''"
          search
          selection
        />
      </div>

      <button 
        class="ui button" 
        tabindex="0"
      >Submit</button>
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
      imgSrc: null
    }
  },
  computed: {
    city() {
      return {}
    }
  },
  watch: {
    user: function() {
      this.imgSrc = this.updateImg()
      this.user.cityId = this.user.cityId ? this.user.cityId.toString() : ''
    }
  },
  created() {
    this.user.cityId = this.user.cityId ? this.user.cityId.toString() : ''
    this.imgSrc = this.updateImg()
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
        id: +this.$store.state.auth.user.id
      }
      this.$emit('submit', post)
    },
    onFileSelected() {
      this.selectedFile = event.target.files[0]
    },
    onUpload() {
      const formData = new FormData()
      formData.append('file', this.selectedFile, this.selectedFile.name)
      if (this.user.avatarId) {
        this.$axios
          .$delete(`/api/user/${this.$store.state.auth.user.id}/avatar`)
          .then(() => {
            this.$axios.$post(
              `/api/user/${this.$store.state.auth.user.id}/avatar`,
              formData
            )
          })
          .then(() => {
            this.selectedFile = null
            this.$emit('refresh')
          })
          .catch(err => console.log(err))
      } else {
        this.$axios
          .$post(`/api/user/${this.$store.state.auth.user.id}/avatar`, formData)
          .then(() => {
            this.selectedFile = null
            this.$emit('refresh')
          })
          .catch(err => console.log(err))
      }
      // this.$axios.$post(/api/user/${this.$store.state.auth.user.id}/avatar, this.selectedFile)
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
