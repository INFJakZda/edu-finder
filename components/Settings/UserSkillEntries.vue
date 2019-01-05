<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="addSkillEntry">
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
      <div class="field">
        <label>Dodatkowe informacje</label>
        <textarea
          v-model="skillDetails"
          rows="3"
          placeholder="Napisz więcej o swoich umiejętnościach..."
        />
      </div>
      <button 
        :class="{disabled: !(skillLevel && category)}" 
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
        <div class="item">
          <div class="right floated content">
            <sui-button
              basic 
              negative
              size="mini"
              @click="deleteSkillLevel(skillEntry.id)">Usuń</sui-button>
          </div>
        </div>
        <sui-list-icon 
          name="star" 
          size="large" 
          vertical-align="middle" />
        <sui-list-content>
          <sui-list-header>{{ categoryName(skillEntry.categoryId) + ' poziom ' + skillName(skillEntry.skillLevelId) }}</sui-list-header>
          <sui-list-description>{{ skillEntry.details }}</sui-list-description>
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
          userId: +this.$auth.user.id,
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

<style>
</style>
