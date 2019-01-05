<template>
  <div>
    <div class="ui segment">
      <h1>Component showcase</h1>
      <h2>Button</h2>
      <Button
        :modifiers="['secondary', 'inverted']"
        :loading="button.loading"
        :disabled="button.disabled"
        icon="bug"
        text="npm run fix"
        @click="startLoading()"/>
      <h2>Icons</h2>
      <icon :icon="['fas', 'air-freshener']"/>
      <icon :icon="['fas', 'bong']"/>
      <icon :icon="['fas', 'hippo']"/>
      <h2>Checkbox</h2>
      <Checkbox 
        :text="checkbox.text" 
        :model.sync="checkbox.state" />
      <Checkbox 
        :text="checkbox.text"
        :model.sync="checkbox.state"
        type="radio" />
      <Checkbox 
        :text="checkbox.text"
        :model.sync="checkbox.state" 
        type="slider" />
      <Checkbox 
        :text="checkbox.text"
        :model.sync="checkbox.state" 
        :disabled="true" />
      <p>state: {{ checkbox.state }}</p>
      <h2>Pagination</h2>
      <Pagination :pages="10" />
      <h2>RatingPost</h2>
      <RatingPost />
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button.vue'
import Checkbox from '~/components/Checkbox.vue'
import Pagination from '~/components/Pagination.vue'
import RatingPost from '~/components/RatingPost.vue'

export default {
  components: {
    Button,
    Checkbox,
    Pagination,
    RatingPost
  },
  data() {
    return {
      button: {
        loading: false,
        disabled: false
      },
      checkbox: {
        text: 'Text',
        state: false
      }
    }
  },
  methods: {
    startLoading() {
      this.button.loading = true
    }
  }
}
</script>
