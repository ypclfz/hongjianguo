let url = '/api/taskDefs';
const state = {
	data: undefined,
}

const getters = {
	taskDefsData: state=>state.data,
}

const mutations = {
	setTaskDefs (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshTaskDefs ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;	
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setTaskDefs', d.list);
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