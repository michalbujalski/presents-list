import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

const state = {
  user: null,
  lists: {}
}

const defaultList = {
  title: '',
  items: []
}
const getters = {
  user: (state) => state.user,
  listDetails: state => listId => {
    console.log(state.lists[listId])
    return state.lists[listId] ? state.lists[listId] : defaultList
  }
}

const mutations = {
  USER_SAVE (state, { user }) {
    Vue.set(state, 'user', user)
  },
  USER_REMOVE (state) {
    Vue.set(state, 'user', null)
  },
  LIST_SAVE (state, { list }) {
    Vue.set(state.lists, list.id, list)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
