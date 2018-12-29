<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="addSkillEntry">
      <h4 class="ui dividing header">Zdefiniuj swoje umiejętności!</h4>
      <div class="two fields">
        <div class="field">
          <label>Wybierz Kategorię</label>
          <sui-dropdown
            v-model="category"
            :options="user.availableCategories"
            placeholder="Wybierz kategorie..."
            search
            selection
          />
        </div>
        <div class="field">
          <label>Poziom zaawansowania</label>
          <sui-dropdown
            v-model="skillLevel"
            :options="user.availableSkillLevels"
            placeholder="Wybierz poziom..."
            search
            selection
          />
        </div>
      </div>
      <button 
        class="ui button" 
        tabindex="0"
      >Dodaj</button>
    </form>
    <h4 class="ui dividing header">Zdefiniowane umiejętności:</h4>
    <sui-list 
      divided 
      relaxed>
      <sui-list-item 
        v-for="skillEntry in user.skillEntries" 
        :key="skillEntry.id">
        <sui-list-icon 
          name="university" 
          size="large" 
          vertical-align="middle" />
        <sui-list-content>
          <sui-button
            class="dev-button-delete"
            basic 
            negative
            size="mini"
            @click="deleteSkillLevel(skillEntry.id)">Usuń</sui-button>
          <sui-list-header>{{ categoryName(skillEntry.categoryId) }}</sui-list-header>
          <sui-list-description>{{ skillName(skillEntry.skillLevelId) }}</sui-list-description>
        </sui-list-content>
      </sui-list-item>
    </sui-list>
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
      category: '',
      skillLevel: '',
      availableSkillLevels: [],
      skillDetails: ''
    }
  },
  methods: {
    addSkillEntry() {
      this.$axios
        .$post('/api/skillEntry', {
          id: 0,
          userId: +this.$store.state.auth.user.id,
          categoryId: +this.category,
          skillLevelId: +this.skillLevel,
          details: this.skillDetails
        })
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    },
    deleteSkillLevel(id) {
      this.$axios
        .$delete(`/api/skillEntry/${id}`)
        .then(() => {
          this.$emit('refresh')
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
.dev-button-delete {
  position: absolute;
  right: 30px;
}
</style>
