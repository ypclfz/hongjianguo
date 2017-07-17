import Vue from 'vue'
import Vuex from 'vuex'
import filter from '@/store/modules/filter-label.js'
import detail from '@/store/modules/common-detail.js'
import tags from '@/store/modules/tags.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {   
    dragId: null,
  },
  modules: {
    filter,
    detail,
    tags,
  },
  mutations: {
    setDragId (state, id) {
      state.dragId = id;
    },
    AXIOS_FAILURE () {
      alert('网络错误');
    }
  },
  getters: {
    getDragId: state=>state.dragId,
  },
});

export default store;