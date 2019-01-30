<template>
  <div>
    <h4 class="ui dividing header">Ukończone uczelnie:</h4>
    <sui-list 
      divided 
      relaxed>
      <sui-list-item 
        v-for="education in list" 
        :key="education.id">
        <sui-list-icon 
          name="university" 
          size="large" 
          vertical-align="middle" />
        <sui-list-content>
          <sui-list-header>{{ education.university ? education.university.name : '' }}</sui-list-header>
          <sui-list-description>
            <span v-if="education.yearEnd">{{ education.yearStart }} - {{ education.yearEnd }},</span>
            <span v-else>Rozpoczęcie: {{ education.yearStart }},</span>
          </sui-list-description>
          <sui-list-description>
            <span>{{ education.department ? education.department.name : '' }}</span>
          </sui-list-description>
        </sui-list-content>
      </sui-list-item>
    </sui-list>
    <sui-segment v-if="list.length === 0">
      <h5 
        class="ui header">Nie dodano uczelni</h5>
    </sui-segment>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
