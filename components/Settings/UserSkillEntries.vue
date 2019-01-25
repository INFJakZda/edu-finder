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
      <Skill
        v-for="skillEntry in user.skillEntries" 
        :key="skillEntry.id"
        :skill-entry="skillEntry"
        :user="user"
        @refreshdev="$emit('refreshdev')"/>
    </sui-list>
  </div>
</template>

<script>
import Skill from '~/components/Settings/Items/Skill.vue'

export default {
  components: {
    Skill
  },
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
          this.category = null
          this.skillLevel = null
          this.availableSkillLevels = []
          this.skillDetails = ''
          this.skillTitle = ''
          this.price = null
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.dev-inline {
  display: inline-block;
}
</style>
