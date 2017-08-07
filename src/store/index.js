import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import filter from '@/store/modules/filter-label.js'
import detail from '@/store/modules/common-detail.js'
import tags from '@/store/modules/tags.js'
import table from '@/store/modules/table-common.js'
import product from '@/store/modules/product.js'
import classification from '@/store/modules/classification.js'
import branch from '@/store/modules/branch.js'
import ipr from '@/store/modules/ipr.js'
import area from '@/store/modules/area.js'
import feeCode from '@/store/modules/fee-code.js'
import invoiceEntity from '@/store/modules/invoice-entity.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    dragId: null,
    axios,
  },
  modules: {
    filter,
    detail,
    tags,
    table,
    product,
    classification,
    branch,
    ipr,
    area,
    feeCode,
    invoiceEntity,
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