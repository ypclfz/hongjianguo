import Vue from 'vue'
import Vuex from 'vuex'
import filter from '@/store/modules/filter-label.js'
import detail from '@/store/modules/common-detail.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {   
    dragId: null,
  },
  modules: {
    filter,
    detail,
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

export default store;