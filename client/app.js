import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import { authUI, auth } from './presents-firebase'
import RemoteDbPlugin from './remote-db'
import i18n from './I18n'

const FirebasePlugin = {
  install: (Vue, options) => {
    Vue.prototype.$auth = this.auth = auth()
    Vue.prototype.$authUI = authUI()
    this.auth.onAuthStateChanged(user => {
      store.dispatch('saveUser', { user: user })
    })
  }
}

Vue.use(RemoteDbPlugin)
Vue.use(FirebasePlugin)
sync(store, router)

const app = new Vue({
  i18n,
  router,
  store,
  created () {
  },
  ...App
})

export { app, router, store }
