<template>
  <LinkList
    :title="title"
    :items="items" />
</template>

<script>
import LinkList from '~/components/dev/LinkList.vue'

export default {
  components: {
    LinkList
  },
  data() {
    return {
      title: 'Pages',
      items: [
        {
          link: '/settings/details',
          name: 'settings',
          description: 'settings page'
        }
      ]
    }
  }
}
</script>
