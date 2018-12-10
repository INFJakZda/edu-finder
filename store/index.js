import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userDetails: {}
    },
    mutations: {
      setUserDetails(state, userDetails) {
        state.userDetails = userDetails
      }
    },
    actions: {
      setUserData(vuexContext, context) {
        return this.$axios
          .$get('/api/user/3/details')
          .then(userDetails => {
            console.log(userDetails)
            vuexContext.commit('setUserDetails', userDetails)
          })
          .catch(e => context.error(e))
      }
    },
    getters: {
      userDetails(state) {
        return state.userDetails
      }
    }
  })
}

export default createStore
