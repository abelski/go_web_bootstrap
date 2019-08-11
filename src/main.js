import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'popper.js'
import JQuery from 'jquery'
import './assets/less/style.less'

Vue.use(VueResource);

window.$ = window.JQuery = JQuery;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
