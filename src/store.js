import Vue from 'vue'
import Vuex from 'vuex'

// import custom pathify config (this is optional!)
import pathify from './pathify'

// import helper function
import { make } from 'vuex-pathify'

// setup store
const state = {
  users: {
    userid: '',
    username: '',
    avatar: '',
    passwd: '',
    level: '',
    token: ''
  },
  additem: true,
  reindex: false,
  name: 'World',
  auth: {
    loggedIn: false
  }
}
const mutations = make.mutations(state)

// use store
Vue.use(Vuex)

// create store
export default new Vuex.Store({

  // use the plugin
  plugins: [
    pathify.plugin
  ],

  // store properties
  state,
  mutations
})
