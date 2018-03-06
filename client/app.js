import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import { authUI, auth } from './presents-firebase'
import RemoteDbPlugin from './remote-db'
import { i18n } from './I18n'
import VeeValidate, { Validator } from 'vee-validate'
import pl from 'vee-validate/dist/locale/pl'
import en from 'vee-validate/dist/locale/en'

Validator.localize('pl', pl)
Validator.localize('en', en)
Vue.use(VeeValidate)

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
