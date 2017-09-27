let url = '/api/flows';
const state = {
	data: undefined,
}

const getters = {
	flowsData: state=>state.data,
}

const mutations = {
	setFlows (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshFlows ({commit, rootState, state}) {		
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setFlows', d.flows);	
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