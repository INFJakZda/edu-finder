<template lang="html">
  <sui-grid>
    <sui-grid-column :width="4">
      <sui-menu 
        fluid 
        vertical 
        tabular>
        <a
          is="sui-menu-item"
          v-for="item in items"
          :key="item"
          :content="item"
          :active="isActive(item)"
          @click="select(item)"
        />
      </sui-menu>
    </sui-grid-column>

    <sui-grid-column 
      :width="12" 
      stretched>
      <sui-segment>
        This is an stretched grid column. This segment will always match the tab height
      </sui-segment>
    </sui-grid-column>
  </sui-grid>
</template>

<script>
export default {
  name: 'TabularMenuExample',
  data() {
    return {
      items: ['Bio', 'Pics', 'Companies', 'Links'],
      active: 'Bio'
    }
  },
  methods: {
    isActive(name) {
      return this.active === name
    },
    select(name) {
      this.active = name
    }
  }
}
</script>s
