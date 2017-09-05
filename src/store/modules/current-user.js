const state = {
	data: null,
}

const getters = {
	getUser: state=>state.data,
	menusMap: state=>{
		const map = new Map();
		const menus = state.data && state.data.menus ? state.data.menus : [];
		menus.forEach(_=>{map.set(_, true)});

		return map;
	}
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