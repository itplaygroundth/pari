// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import Vuetify from 'Vuetify'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import 'vuetify/dist/vuetify.min.css'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

const options = { name: 'lodash' }

window.store = store
Vue.use(Vuetify, VueLodash, Croppa, options)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
