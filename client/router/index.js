import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../presents-firebase'
import Home from '../views/Home'
import SignIn from '../views/SignIn'
import ListNew from '../views/ListNew'
import ListDetails from '../views/ListDetails'
import SignOut from '../views/SignOut'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: { requiresAuth: true }
    },
    {
      path: '/lists/new',
      component: ListNew,
      name: 'list-new',
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/:userId/lists/edit/:listId',
      name: 'list-edit',
      component: ListNew,
      meta: { requiresAuth: true }
    },
    {
      path: '/:userId/lists/show/:listId',
      name: 'list-details',
      component: ListDetails
    },
    {
      path: '/logout',
      name: 'sign-out',
      component: SignOut
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth().currentUser) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
