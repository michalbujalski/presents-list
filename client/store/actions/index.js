export default {
  removeUser ({ commit }) {
    commit('USER_REMOVE')
  },
  saveUser ({ commit }, { user }) {
    commit('USER_SAVE', { user: user })
  },
  saveListDetails ({ commit }, { list }) {
    commit('LIST_SAVE', { list })
  }
}
