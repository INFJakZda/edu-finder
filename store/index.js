import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imgSrc:
        'https://cdn4.iconfinder.com/data/icons/network-and-security/63/add-user-512.png'
    },
    mutations: {
      setUserImg(state, imgSrc) {
        state.imgSrc = imgSrc
      },
      rmUserImg(state) {
        state.imgSrc =
          'https://cdn4.iconfinder.com/data/icons/network-and-security/63/add-user-512.png'
      }
    },
    actions: {
      getUserImg(vuexContext, userId) {
        return this.$axios
          .$get(`/api/user/${userId}/details`)
          .then(userDetails => {
            let imgSrc = userDetails.avatarId
              ? `https://loli-server.azurewebsites.net/api/picture/${
                  userDetails.avatarId
                }`
              : 'http://cdn.onlinewebfonts.com/svg/img_210318.png'
            vuexContext.commit('setUserImg', imgSrc)
          })
          .catch(e => console.log(e))
      },
      rmUserImg(vuexContext) {
        vuexContext.commit('rmUserImg')
      }
    },
    getters: {
      imgSrc(state) {
        return state.imgSrc
      }
    }
  })
}

export default createStore
