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
      <div class="two fields">
        <div class="field">
          <label>Tytuł</label>
          <input
            v-model="skillTitle"
            type="text"
            name="title"
            placeholder="Nazwij swoją umiejętność"
          >
        </div>
        <div class="field">
          <label>Cena (zł/godz)</label>
          <input
            v-model.number="price"
            type="number"
            name="price"
            placeholder="Podaj cenę za godzinę korepetycji"
          >
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
        :class="{disabled: !(skillLevel && category && skillDetails && skillTitle)}" 
        class="ui green button"
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
      category: null,
      skillLevel: null,
      availableSkillLevels: [],
      skillDetails: '',
      skillTitle: '',
      price: null
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
          details: this.skillDetails,
          title: this.skillTitle,
          price: this.price ? this.price : 0
        })
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    },
    deleteSkillLevel(id) {
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
