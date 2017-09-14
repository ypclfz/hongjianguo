let url = '/api/groups';
const state = {
	data: [],
}

const getters = {
	groupOptions: state=>state.data,
	groupMap: state=>{
		const map = new Map();
		for(let d of state.data) {
			map.set(d.id, d);
		}

		return map;
	}
}

const mutations = {
	setGroup (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshGroup ({commit, rootState}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setGroup', d.groups);
				}else {
					// alert('请求用户组数据失败');
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