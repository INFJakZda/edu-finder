<template>
  <LinkList
    :title="title"
    :items="items" />
</template>

<script>
import LinkList from '~/components/LinkList.vue'

export default {
  layout: 'text-container',
  components: {
    LinkList
  },
  data: function() {
    return {
      title: 'Pages',
      items: [{ link: '/', name: 'index', description: 'index page' }]
    }
  }
}
</script>
