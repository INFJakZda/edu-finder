import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imgSrc: 'http://simpleicon.com/wp-content/uploads/add-user.png'
    },
    mutations: {
      setUserImg(state, imgSrc) {
        state.imgSrc = imgSrc
      },
      rmUserImg(state) {
        state.imgSrc = 'http://simpleicon.com/wp-content/uploads/add-user.png'
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
