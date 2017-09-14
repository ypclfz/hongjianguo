let url = '/api/fileTypes';
const state = {
	data: [],
}

const getters = {
	fileTypeOptions: state=>{
		return state.data;
	}
}

const mutations = {
	setData (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshFileType ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setData', d.list);
				}else {
					// alert('请求file数据失败');
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