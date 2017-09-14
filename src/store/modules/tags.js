let url = '/api/tags';
const state = {
  data: [],
}

const getters = {
	tagOptions: state=>{
		return state.data.map( d=>{return {label: d.tag, value: d.tag} } );
	},
}

const mutations = {
	setTags (state, tags) {
		state.data = tags;
	}
}

const actions = {
	refreshTags ({commit, rootState}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
		.get(url)
		.then(response=>{
			const d = response.data;
			if(d.status){
				commit('setTags', d.tags);
			}else {
				// alert('请求标签数据失败');
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