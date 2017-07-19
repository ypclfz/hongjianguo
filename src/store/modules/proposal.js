const map = new Map([
	['/patent/add','add'],
	['/patent/detail','detail'],
	['/task/pending/proposal_check','check'],
]);
const state = {
	type: '',
}

const getters = {
	proposalType: state=>state.type
}

const mutations = {
	setProposalType (state, path) {
		state.type = map.get(path);
	}
}

const actions = {
	
}

export default {
	state,
	getters,
	mutations,
	actions,
}
