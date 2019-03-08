import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Add from '@/components/Add'
import Admin from '@/components/Admin'

Vue.use(Router)

let entryUrl = '/admin'

const guard = async (to, from, next) => {
  if (!store.state.auth.loggedIn) {
    if (entryUrl) {
      const url = entryUrl
      entryUrl = null
      return next(url) // goto stored url
    } else {
      return next() // all is fine
    }
  }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        guard(to, from, next)
      }
    }
  ]
})
