// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import './fonts/iconfont.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueResource);

const store = new Vuex.Store({
    state: {
        userName: 'yp',
        screen: [],
        dragId: null,
    },
    mutations: {
      setDragId (state, id) {
        state.dragId = id;
      }
    },
    getters: {
      getDragId: state=>state.dragId,
    },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
