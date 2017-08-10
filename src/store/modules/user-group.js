const url = '/api/groups';
const state = {
	data: [],
}

const getters = {
	groupOptions: state=>state.data,
	
}

const mutations = {
	setGroup (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshGroup ({commit, rootState}) {
		
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setGroup', d.groups);
				}else {
					alert('请求用户组数据失败');
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