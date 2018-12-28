<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent="addUniversity">
      <h4 class="ui dividing header">Add new Univeristy!</h4>
      <div class="two fields">
        <div class="field">
          <label>University</label>
          <sui-dropdown
            v-model="univeristy"
            :options="user.availableUniversities"
            placeholder="Select univeristy..."
            search
            selection
          />
        </div>
        <div class="field">
          <label>Department</label>
          <sui-dropdown
            v-model="department"
            :options="availableDepartments"
            placeholder="Select univeristy..."
            search
            selection
          />
        </div>
      </div>
      <button 
        class="ui button" 
        tabindex="0"
      >Add</button>
    </form>
    <h4 class="ui dividing header">Your Universities:</h4>
    <sui-list 
      divided 
      relaxed>
      <sui-list-item 
        v-for="education in user.educationEntries" 
        :key="education.id">
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
            @click="deleteDepartment(education.id)">Usuń {{ education.department ? education.department.name : '' }}</sui-button>
          <sui-list-header>{{ education.university ? education.university.name : '' }}</sui-list-header>
          <sui-list-description>{{ education.department ? education.department.name : '' }}</sui-list-description>
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
      univeristy: '',
      department: '',
      availableDepartments: []
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
    }
  },
  methods: {
    addUniversity() {
      this.$axios
        .$post('/api/educationEntry', {
          is: null,
          userId: +this.$store.state.auth.user.id,
          universityId: +this.univeristy,
          departmentId: +this.department
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

<style scoped>
.dev-button-delete {
  position: absolute;
  right: 30px;
}
</style>
