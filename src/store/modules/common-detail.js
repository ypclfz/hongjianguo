const keys = new Map([
	['patent', 'patent'],
	['copyright', 'Copyright'],
]);

const state = {
	id:'',
	type: '',
	true_type: '',
	data: null,
	loading: false,
}

const getters = {
  detail_type: state=>state.type,
  detailBase: state=>state.data ? state.data : {},
  detailBasePatent: state=>{
  	if(state.true_type == 'patent') {
  		return state.data; 
  	}else {
  		return null;
  	}
  },
  detailBaseCopyright: state=>{
  	if(state.true_type == 'copyright') {
  		return state.data; 
  	}else {
  		return null;
  	}
  },
  detailTasks: state=>state.data ? state.data.tasks : [],
  detailNotices: state=>state.data ? state.data.notices : [],
  detailFees: state=>state.data ? state.data.fees : [],
  detailMails: state=>state.data ? state.data.mails : [],
  detailDocuments: state=>state.data ? state.data.documents : [],
  detailLoading: state=>state.loading,
}

const mutations = {
	setDetailType: (state, path)=>{
		const arr = ['patent', 'trademark', 'copyright'];
		for(let a of arr) {
			const reg = new RegExp(a);
			if(reg.test(path)) {
				state.type = a;
				break;
			}
		}
	},
	setDetailData: (state, data)=>{ state.data = data },
	setLoading(state, boolean) { state.loading = boolean },
	setId(state, id) { state.id = id },
	refreshTrueType(state) { state.true_type = state.type },
}

const actions = {
	refreshDetailData({ commit, state, rootState }, {id, func}={}) {
			let url = `/api/${state.type}s`;
			if(id) {
				commit('setId', id);
			}else {
				id = state.id;
			}
			url = rootState.status ? url.replace(/\/api/, '') : url;
      commit('setLoading', true);
      rootState.axios.get(`${url}/${id}`)
	      .then(response=>{
          if(func) func();    
          
          const d = response.data;
          if( d.status ) {
              commit('setDetailData', JSON.parse(JSON.stringify(d[state.type])));
          }else {
              alert(d.info);
          }
          commit('setLoading', false);
          commit('refreshTrueType');
	      })
	      .catch(err=>{
	          if(func) func();
	          commit('setLoading', false);
	          console.log(err);
	          // alert('网络错误');
	      })
		
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}