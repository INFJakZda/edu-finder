<template>
  <sui-list-item>
    <div class="item">
      <div class="right floated content">
        <sui-button
          basic 
          negative
          size="mini"
          @click.native="toggle"
        >Usuń</sui-button>
      </div>
    </div>
    <sui-list-icon 
      name="star" 
      size="big" 
      vertical-align="middle" />
    <sui-list-content>
      <sui-list-header>{{ skillEntry.title }}</sui-list-header>
      <div class="meta">
        <span class="dev-inline"><i class="graduation cap icon"/>{{ skillName(skillEntry.skillLevelId) }} </span>
        <span class="dev-inline"><i class="globe icon"/>{{ categoryName(skillEntry.categoryId) }} </span>
        <span 
          v-if="skillEntry.price"
          class="dev-inline"><i class="balance scale icon"/>{{ skillEntry.price }} zł/godz </span>
          
      </div>
      <sui-list-description>
        <truncate 
          :length="90" 
          :text="skillEntry.details" 
          clamp="..." 
          less=" Zwiń"/>
      </sui-list-description>
    </sui-list-content>
    <Modal 
      :open="open"
      @deletemodal="toggle"
      @deleteitem="deleteSkillLevel(skillEntry.id)">
      {{ skillEntry.title }} poziom {{ skillName(skillEntry.skillLevelId) }}, {{ categoryName(skillEntry.categoryId) }}
    </Modal>   
  </sui-list-item>
</template>

<script>
import Modal from '~/components/Settings/Items/Modal.vue'
import truncate from 'vue-truncate-collapsed'

export default {
  components: {
    Modal,
    truncate
  },
  props: {
    skillEntry: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    deleteSkillLevel(id) {
      this.toggle()
      this.$axios
        .$delete(`/api/skillEntry/${id}`)
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    },
    categoryName(id) {
      return this.user.availableCategories.find(skill => {
        return +skill.value === id
      }).text
    },
    skillName(id) {
      return this.user.availableSkillLevels.find(skill => {
        return +skill.value === id
      }).text
    }
  }
}
</script>

<style scoped>
.dev-inline {
  display: inline-block;
}
</style>
