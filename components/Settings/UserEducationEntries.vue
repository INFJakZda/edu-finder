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
            <sui-dropdown
              :options="years"
              v-model="startYear"
              placeholder="Rok rozpoczęcia"
              selection
            />
          </div>
          <div class="field">
            <div class="field">
              <sui-dropdown
                :options="endYears"
                :class="{disabled: !(startYear)}"
                v-model="endYear"
                placeholder="Rok zakończenia, jeśli ukończyłeś studia"
                selection
              />
            </div>
          </div>
        </div>
      </div>
      <button 
        :class="{disabled: !(department && startYear)}" 
        class="ui green button"
        tabindex="0"
      >Dodaj</button>
    </form>
    <h4 class="ui dividing header">Ukończone uczelnie:</h4>
    <sui-list 
      divided 
      relaxed>
      <Education
        v-for="education in user.educationEntries" 
        :key="education.id"
        :education="education"
        @refreshdev="$emit('refreshdev')"/>
    </sui-list>
  </div>
</template>

<script>
import Education from '~/components/Settings/Items/Education.vue'

export default {
  components: {
    Education
  },
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
      endYear: null,
      years: Array.from({ length: 40 }, (v, k) => {
        return {
          value: (2019 - k).toString(),
          text: (2019 - k).toString()
        }
      }),
      endYears: [
        {
          value: null,
          text: 'Wprowadź rok rozpoczęcia'
        }
      ]
    }
  },
  watch: {
    user: function() {
      this.univeristy = null
      this.department = null
      this.availableDepartments = []
      this.startYear = null
      this.endYear = null
      this.endYears = [
        {
          value: null,
          text: 'Wprowadź rok rozpoczęcia'
        }
      ]
    },
    univeristy: function() {
      if (this.univeristy) {
        this.$axios
          .$get(`/api/university/${this.univeristy}/departments`)
          .then(res => {
            this.availableDepartments = res.departments
          })
          .catch(e => console.log(e))
        this.department = null
      }
    },
    startYear: function() {
      if (this.startYear) {
        this.endYear = null
        this.endYears = Array.from({ length: 8 }, (v, k) => {
          return {
            value: (+this.startYear + k).toString(),
            text: (+this.startYear + k).toString()
          }
        })
      }
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
          yearStart: this.startYear ? +this.startYear : 0,
          yearEnd: this.endYear ? +this.endYear : 0
        })
        .then(() => {
          this.$emit('refreshdev')
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
