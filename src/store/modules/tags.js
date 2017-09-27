let url = '/api/tags';
const state = {
  data: undefined,
}

const getters = {
	tagOptions: state=>{
		let d = state.data;
		if(d) {
			d = d.map( d=>{return {id: d.tag, name: d.tag} } );
		}
		return d;
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