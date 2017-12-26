// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { AES, enc } from 'crypto-js'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import './assets/css/bootstrap.css'
import './assets/css/font-awesome.min.css'
import './assets/css/style.css'
import './assets/plugins/bootstrap.js'
import VueResource from 'vue-resource'

//Vue.use(VueResource);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
export const eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
