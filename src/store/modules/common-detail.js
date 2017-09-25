const keys = new Map([
	['patent', 'patent'],
	['copyright', 'Copyright'],
]);

const state = {
	type: '',
	data: null,
}

const getters = {
  detail_type: state=>state.type,
  detailBase: state=>state.data ? state.data : {},
  detailTasks: state=>state.data ? state.data.tasks : [],
  detailNotices: state=>state.data ? state.data.notices : [],
  detailFees: state=>state.data ? state.data.fees : [],
  detailMails: state=>state.data ? state.data.mails : [],
  detailDocuments: state=>state.data ? state.data.documents : [],
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
}

const actions = {
	refreshDetailData({ commit, state, rootState }, {id, func}) {
			let url = `/api/${state.type}s`;
			url = rootState.status ? url.replace(/\/api/, '') : url;
      rootState.axios.get(`${url}/${id}`)
	      .then(response=>{
          if(func) func();    
          
          const d = response.data;
          if( d.status ) {
              commit('setDetailData', JSON.parse(JSON.stringify(d[state.type])));
          }else {
              alert(d.info);
          }
	      })
	      .catch(err=>{
	          if(func) func();
	          
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