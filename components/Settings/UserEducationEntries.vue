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
          <div class="ui fluid search selection dropdown">
            <input 
              type="hidden" 
              name="country">
            <i class="dropdown icon"/>
            <div class="default text">Select Country</div>
            <div class="menu">
              <div 
                class="item" 
                data-value="ca"><i class="ca flag"/>Canada</div>
              <div 
                class="item" 
                data-value="cv"><i class="cv flag"/>Cape Verde</div>
              <div 
                class="item" 
                data-value="ky"><i class="ky flag"/>Cayman Islands</div>
              <div 
                class="item" 
                data-value="cf"><i class="cf flag"/>Central African Republic</div>
              <div 
                class="item" 
                data-value="td"><i class="td flag"/>Chad</div>
            </div>
          </div>
        </div>
      </div>
      <button 
        class="ui button" 
        tabindex="0"
        @click="showUn"
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
      }
    }
  },
  methods: {
    showUn() {
      console.log(this.newUniveristy)
    }
  }
}
</script>

<style>
</style>
