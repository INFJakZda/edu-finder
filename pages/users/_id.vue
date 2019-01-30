<template>
  <div>
    <div>
      <div class="ui breadcrumb">
        <nuxt-link 
          to="/" 
          class="section">Strona główna</nuxt-link>
        <i class="right angle icon divider"/>
        <nuxt-link 
          to="#" 
          class="section">Użytkownicy</nuxt-link>
        <i class="right angle icon divider"/>
        <div class="active section">{{ username }}</div>
      </div>
      <div class="ui grid">
        <div class="row">
          <div class="sixteen wide mobile eight wide tablet seven wide computer column">
            <div class="ui basic segment">
              <div class="ui card">
                <img 
                  :src="getAvatarUri(avatarId)"
                  class="thumbnail">
                <div class="content">
                  <span 
                    class="header" 
                    href="#">{{ username }}</span>
                  <div class="meta">
                    <p>
                      Ostatnio aktywny {{ lastActive }}
                    </p>
                    <p v-if="city !== null">
                      <icon :icon="['fas', 'map-marker-alt']"/> {{ city }} 
                    </p>
                    <p>
                      <icon :icon="['fas', 'envelope']"/> {{ email }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sixteen wide mobile eight wide tablet nine wide computer column">
            <div>
              <div 
                v-if="bioText !== ''" 
                class="ui segment">
                {{ bioText }}
              </div>
              <div class="ui segment">
                <Education 
                  :list="educationEntries" />
              </div>
              <div class="ui segment">
                <Contact
                  :user="protectedUser" />
              </div>
              <div>
                <button 
                  class="ui button right floated"
                  @click="sendMessage">
                  <icon :icon="['fas', 'envelope']"/> Wyślij wiadomość 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img.thumbnail {
  height: 200px;
}
</style>

<script>
import moment from 'moment'
import Education from '~/components/SkillEntry/Education.vue'
import Contact from '~/components/SkillEntry/Contact.vue'
import { AvatarHandlerMixin } from '~/mixins/AvatarHandler.js'

export default {
  components: { Education, Contact },
  mixins: [AvatarHandlerMixin()],
  data: function() {
    return {
      user_id: null,
      user: null
    }
  },
  computed: {
    username() {
      if (this.user === null) {
        return ''
      }

      return this.user.username || ''
    },
    avatarId() {
      if (this.user === null) {
        return null
      }

      return this.user.avatarId
    },
    lastActive() {
      if (this.user === null) {
        return ''
      }

      return moment(this.user.lastActive)
        .add(1, 'hour')
        .fromNow()
    },
    educationEntries() {
      if (this.user === null) {
        return []
      }

      return this.user.educationEntries
    },
    skillEntries() {
      if (this.user === null) {
        return []
      }

      return this.user.skillEntries
    },
    contactEntries() {
      if (this.user === null) {
        return []
      }

      return []
    },
    protectedUser() {
      if (this.user === null) {
        return {
          contactEntries: []
        }
      }

      return this.user
    },
    city() {
      if (this.user === null) {
        return null
      }

      if (this.user.availableCities.legth === 0) {
        return null
      }

      return this.user.availableCities[0].text
    },
    bioText() {
      if (this.user === null) {
        return ''
      }

      if (this.user.bioText === null) {
        return ''
      }

      return this.user.bioText
    },
    email() {
      if (this.user === null) {
        return ''
      }

      return this.user.email
    }
  },
  created() {
    this.user_id = parseInt(this.$route.params.id, 10)
    this.$axios.get(`/api/user/${this.user_id}`).then(user => {
      this.user = user.data
    })
  },
  methods: {
    sendMessage() {
      this.$router.push(`/messages/conversations/${this.user_id}`)
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>
