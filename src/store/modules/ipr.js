let url = '/api/iprs';
const state = {
	data: undefined,
}

const getters = {
	iprData: state=>state.data,
	iprOptions: state=>{
		return state.data;
	}
}

const mutations = {
	setIpr (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshIpr ({commit, rootState, state}) {
		const params = { listRows:"100" };
		url = rootState.status ? url.replace(/\/api/, '') : url;
		
		if(state.data === undefined) {
			commit('setIpr', []);
		}

		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setIpr', d.members);
				}else {
					// alert('请求Ipr数据失败');
				}
			})
			.catch(error=>{console.log(error)});
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}