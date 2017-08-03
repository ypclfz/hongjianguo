const url = '/api/static/js/area.json';
const state = {
	data: [],
}

const getters = {
	areaData: state=>state.data,
}

const mutations = {
	setArea (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshArea ({commit, rootState, state}) {		
		rootState.axios
			.get(url)
			.then(response=>{
				const arr = eval(`${response.data}`);
				commit('setArea', arr);
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