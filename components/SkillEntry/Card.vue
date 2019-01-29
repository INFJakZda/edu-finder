<template>
  <div class="ui card dev-margin-top">
    <div class="content">
      <div class="right floated meta">{{ prettyPrintTimestamp }}</div>
      <img 
        :src="imgSrc" 
        class="ui avatar image"> {{ user.username }}
    </div>
    <div class="content">
      <a class="header">{{ entry.title }}</a>
      <div class="description">
        <truncate
          :length="90"
          :text="entry.details"
          clamp="..." 
          less=" Zwiń"/>
      </div>
      <div class="extra">
        <div class="dev-inline"><i class="balance scale icon"/> Cena: {{ entry.price }} zł/godz, </div>
        <div class="dev-inline"><i class="graduation cap icon"/> Poziom: {{ entry.skillLevel.name }}, </div>
        <div class="dev-inline"><i class="globe icon"/> Kategoria: {{ entry.category.name }} </div>
      </div>
      
    </div>
    <div class="content">
      <div 
        class="click"
        @click="open = !open">
        <i class="comment icon"/>
        {{ entry.recommendations.length }} rekomendacje
      </div>
      
      <div 
        v-if="open && entry.recommendations.length" 
        class="ui comments">
        <Comment 
          v-for="rec in entry.recommendations"
          :key="rec.id" 
          :data="rec"/>
      </div>
    </div>
    <div class="extra content">
      <div>
        <div class="ui large transparent left icon input">
          <sui-rating 
            :rating="value" 
            :max-rating="5"
            @rate="handleRate"/>
        </div>
        <button 
          :class="{disabled: !comment}"
          class="mini ui button right floated"
          @click="addRecomendation">
          Dodaj
        </button>
      </div>
      
      <div class="ui medium transparent input">
        <input 
          v-model="comment"
          type="text"
          placeholder="Dodaj rekomendacje...">
      </div>
      
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import truncate from 'vue-truncate-collapsed'
import Comment from '~/components/SkillEntry/Comment.vue'

export default {
  components: {
    truncate,
    Comment
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    entry: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: 1,
      comment: '',
      open: false
    }
  },
  computed: {
    imgSrc() {
      if (this.user.avatarId) {
        return `https://loli-server.azurewebsites.net/api/picture/${
          this.user.avatarId
        }`
      } else {
        return `http://cdn.onlinewebfonts.com/svg/img_210318.png`
      }
    },
    prettyPrintTimestamp() {
      return moment(this.user.lastactive).fromNow()
    }
  },
  methods: {
    handleRate(evt, props) {
      this.value = props.rating
    },
    addRecomendation() {
      let rec = {
        authorId: this.$auth.user.id,
        author: {},
        skillEntryId: this.entry.id,
        skillEntry: {},
        timestamp: new Date(),
        rating: +this.value,
        comment: this.comment
      }
      this.$axios
        .$post('/api/recommendation', rec)
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.dev-margin-top {
  margin-top: 10px !important;
}
.ui.cards > .card,
.ui.card {
  width: 100% !important;
}
</style>
