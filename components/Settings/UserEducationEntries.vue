<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="addUniversity">
      <div class="two fields">
        <div class="field">
          <label>Uniwersytet</label>
          <sui-dropdown
            v-model="univeristy"
            :options="user.availableUniversities"
            placeholder="Wybierz uniwersytet..."
            search
            selection
          />
        </div>
        <div class="field">
          <label>Wydział</label>
          <sui-dropdown
            v-model="department"
            :options="availableDepartments"
            placeholder="Wybierz wydział..."
            search
            selection
          />
        </div>
      </div>
      <div class="field">
        <label>Rok rozpoczęcia i zakończenia</label>
        <div class="two fields">
          <div class="field">
            <input
              v-model.number="startYear"
              type="number" 
              name="university[year-start]" 
              maxlength="4" 
              placeholder="Rok rozpoczęcia">
          </div>
          <div class="field">
            <div class="field">
              <input
                v-model="endYear"
                type="number" 
                name="university[year-end]" 
                maxlength="4" 
                placeholder="Rok zakończenia, jeśli ukończyłeś studia">
            </div>
          </div>
        </div>
      </div>
      <button 
        :class="{disabled: !(department && startYear)}" 
        class="ui button"
        tabindex="0"
      >Dodaj</button>
    </form>
    <h4 class="ui dividing header">Ukończone uczelnie:</h4>
    <sui-list 
      divided 
      relaxed>
      <sui-list-item 
        v-for="education in user.educationEntries" 
        :key="education.id">
        <div class="item">
          <div class="right floated content">
            <sui-button
              basic 
              negative
              size="mini"
              @click="deleteDepartment(education.id)">Usuń</sui-button>
          </div>
        </div>
        <sui-list-icon 
          name="university" 
          size="large" 
          vertical-align="middle" />
        <sui-list-content>
          <sui-list-header>{{ education.university ? education.university.name : '' }}</sui-list-header>
          <sui-list-description>
            <span v-if="education.yearEnd">{{ education.yearStart }} - {{ education.yearEnd }},</span>
            <span v-else>Rozpoczęcie: {{ education.yearStart }},</span>
            <span>{{ education.department ? education.department.name : '' }}</span>
          </sui-list-description>
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
      univeristy: null,
      department: null,
      availableDepartments: [],
      startYear: null,
      endYear: null
    }
  },
  watch: {
    univeristy: function() {
      this.$axios
        .$get(`/api/university/${this.univeristy}/departments`)
        .then(res => {
          this.availableDepartments = res.departments
        })
        .catch(e => this.error(e))
      this.department = ''
    }
  },
  methods: {
    addUniversity() {
      this.$axios
        .$post('/api/educationEntry', {
          id: 0,
          userId: +this.$auth.user.id,
          universityId: +this.univeristy,
          departmentId: +this.department,
          yearStart: +this.startYear,
          yearEnd: +this.endYear
        })
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    },
    deleteDepartment(id) {
      this.$axios
        .$delete(`/api/educationEntry/${id}`)
        .then(() => {
          this.$emit('refresh')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
