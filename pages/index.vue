<template>
  <LinkList
    :title="title"
    :items="items" />
</template>

<script>
import LinkList from '~/components/dev/LinkList.vue'

export default {
  layout: 'text-container',
  components: {
    LinkList
  },
  data: function() {
    return {
      title: 'Pages',
      items: [
        {
          link: '/',
          name: 'index',
          description: 'index page'
        },
        {
          link: '/basic-request',
          name: 'basic-request',
          description: 'basic api request'
        },
        {
          link: '/login-form',
          name: 'login-form',
          description: 'login form page'
        },
        {
          link: '/register-form',
          name: 'register-form',
          description: 'register form page'
        }
      ]
    }
  }
}
</script>
