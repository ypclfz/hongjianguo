const state = {
	pagesize: 20,
}

const getters = {
	pagesize: state=>state.pagesize,
}

const mutations = {
	setPageSize (state, num){ 
		state.pagesize = num;
	},
}

const actions = {
	
}

export default {
	state,
	getters,
	mutations,
	actions,
}
