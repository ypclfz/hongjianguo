let url = '/api/flownodes';
const state = {
	data: undefined,
}

const getters = {
	flowNodesData: state=>state.data,
}

const mutations = {
	setFlowNodes (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshFlowNodes ({commit, rootState, state}) {		
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setFlowNodes', d.flownodes.map(_=>{return {id: _.value, name: _.label}}));
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