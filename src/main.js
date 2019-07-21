import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'popper.js'
import JQuery from 'jquery'
import './assets/less/style.less'

window.$ = window.JQuery = JQuery

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
