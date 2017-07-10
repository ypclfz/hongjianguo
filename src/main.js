// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import './fonts/iconfont.css'
import axios from 'axios'
import tool from './const/tool'

Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
