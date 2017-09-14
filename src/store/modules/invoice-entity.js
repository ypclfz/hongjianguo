let url = '/api/invoiceEntities';
const state = {
	data: [],
}

const getters = {
	invoiceEntityOptions: state=>state.data,
}

const mutations = {
	setEntity (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshEntity ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setEntity', d.entities);
				}else {
					// alert('请求企业数据失败');
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