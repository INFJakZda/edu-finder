function AvatarHandlerMixin() {
  return {
    methods: {
      getAvatarUri(avatar_id) {
        if (avatar_id === null) {
          return require('../assets/blank_avatar2.png')
        }

        return 'https://loli-server.azurewebsites.net/api/picture/' + avatar_id
      }
    }
  }
}

export { AvatarHandlerMixin }
