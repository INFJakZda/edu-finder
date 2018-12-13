import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userDetails: {
        city: {}
      },
      userEducationEntries: {},
      userContactEntries: {},
      userSkillEntries: {}
    },
    mutations: {
      setUserDetails(state, userDetails) {
        state.userDetails = userDetails
      },
      setUserEducationEntries(state, userEducationEntries) {
        state.userEducationEntries = userEducationEntries
      },
      setUserContactEntries(state, userContactEntries) {
        state.userContactEntries = userContactEntries
      },
      setUserSkillEntries(state, userSkillEntries) {
        state.userSkillEntries = userSkillEntries
      },
      setUserCity(state, cityId) {
        state.userDetails.cityId = cityId
        state.userDetails.city.id = cityId
      }
    },
    actions: {
      getUserDetails(vuexContext, context) {
        return this.$axios
          .$get('/api/user/3/details')
          .then(userDetails => {
            vuexContext.commit('setUserDetails', userDetails)
          })
          .catch(e => context.error(e))
      },
      getUserEducationEntries(vuexContext, context) {
        return this.$axios
          .$get('/api/user/3/educationentries')
          .then(userEducationEntries => {
            vuexContext.commit('setUserEducationEntries', userEducationEntries)
          })
          .catch(e => context.error(e))
      },
      getUserContactEntries(vuexContext, context) {
        return this.$axios
          .$get('/api/user/3/contactentries')
          .then(userContactEntries => {
            vuexContext.commit('setUserContactEntries', userContactEntries)
          })
          .catch(e => context.error(e))
      },
      getUserSkillEntries(vuexContext, context) {
        return this.$axios
          .$get('/api/user/3/skillentries')
          .then(setUserSkillEntries => {
            vuexContext.commit('setUserSkillEntries', setUserSkillEntries)
          })
          .catch(e => context.error(e))
      }
    },
    getters: {
      userDetails(state) {
        return state.userDetails
      },
      userEducationEntries(state) {
        return state.userEducationEntries
      },
      userContactEntries(state) {
        return state.userContactEntries
      },
      userSkillEntries(state) {
        return state.userSkillEntries
      }
    }
  })
}

export default createStore
