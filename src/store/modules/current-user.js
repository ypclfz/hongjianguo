const state = {
	data: null,
}

const getters = {
	getUser: state=>state.data,
}

const mutations = {
	setUser (state, d) {
		state.data = d;
	}
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}