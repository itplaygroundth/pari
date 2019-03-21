// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { languages, defaultLocale, numberFormats } from './i18n/'
import store from './store'
import Vuetify from 'Vuetify'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'
import 'vue-material-design-icons/styles.css'
import VueLazyload from 'vue-lazyload'
const messages = Object.assign(languages)
const options = { name: 'lodash' }

window.store = store
Vue.use(VueI18n)
Vue.use(Vuetify, VueAxios, axios, VueLodash, VueLazyload, options)

Vue.config.productionTip = false

var i18n = new VueI18n({
  numberFormats,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
