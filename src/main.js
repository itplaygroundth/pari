// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import Vuetify from 'Vuetify'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'

import VueLazyload from 'vue-lazyload'

const options = { name: 'lodash' }

window.store = store
Vue.use(Vuetify, VueLodash, VueLazyload, options)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
