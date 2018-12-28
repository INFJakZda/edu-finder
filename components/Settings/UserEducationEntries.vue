<template>
  <div>
    <form 
      class="ui form" 
      @submit.prevent>
      <h4 class="ui dividing header">Add new Univeristy!</h4>
      <div class="two fields">
        <div class="field">
          <label>University</label>
          <sui-dropdown
            v-model="newUniveristy.univeristy"
            :options="user.availableUniversities"
            placeholder="Select univeristy..."
            search
            selection
          />
        </div>
        <div class="field">
          <label>Department</label>
          <sui-dropdown
            v-model="newUniveristy.department"
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
        @click="fetchDep"
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
          <sui-list-header>{{ education.university ? education.university.name : 'CHUUJ' }}</sui-list-header>
          <sui-list-description>{{ education.department ? education.department.name : "CHOOY" }}</sui-list-description>
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
      newUniveristy: {
        univeristy: '',
        department: ''
      },
      availableDepartments: []
    }
  },
  watch: {
    newUniveristy() {
      console.log('CHANGED')
      this.$axios
        .$get(`/api/university/${this.newUniveristy.univeristy}/departments`)
        .then(res => {
          this.availableDepartments = res.departments
        })
        .catch(e => this.error(e))
    }
  }
}
</script>

<style>
</style>
