let url = '/api/static/js/state.json';
const state = {
	data: [],
}

const getters = {
	areaCity: state=>state.data,
}

const mutations = {
	setCity (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshArea ({commit, rootState, state}) {	
		url = rootState.status ? url.replace(/\/api/, '') : url;	
		rootState.axios
			.get(url)
			.then(response=>{
				const arr = eval(`${response.data}`);
				commit('setCity', arr);
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