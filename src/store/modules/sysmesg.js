let url = '/api/mails';
const state = {
	data: undefined,
}

const getters = {
	sysmesg: state=>state.data
}

const mutations = {
	setSysmesg (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshMesg ({commit, rootState, state}) {	
		url = rootState.status ? url.replace(/\/api/, '') : url;	
		const params = {
			page: 1,
			listRows: 100,
			mailbox: 3,
			read: 0,
		};
		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status) {
					commit('setSysmesg', d.mails.data);
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