import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Add from '@/components/Add'
import Show from '@/components/Show'
import Admin from '@/components/Admin'
import List from '@/components/List'
import Axios from 'axios'

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
const getAuthHeader = async () => {
  return {
    'Authorization': `bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Content-Range, Content-Disposition, Content-Description',
    'Access-Control-Max-Age': '1728000'
  }
}
const requestOptions = {
  method: 'POST',
  headers: getAuthHeader()

}
const login = async (to, from, next) => {
  Axios.post('https://vps434.vpshispeed.net/sapi/getdb', { username: 'pari', password: 'Jack1975' }, requestOptions)
    .then(result => {
      if (result.status === 200) {
        store.set('users@token', result.data.token)
        store.set('auth@loggedIn', true)
        return next()
      }
    })
}
// function loadView(view) {
//   return () => import(
//     `@/components/${view}.vue`
//   )
// }
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      beforeEnter: (to, from, next) => {
        login(to, from, next)
      }
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
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/Show',
      name: 'show',
      component: Show
    }
  ]
})
