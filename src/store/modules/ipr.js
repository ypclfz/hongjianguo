const url = '/api/iprs';
const state = {
	data: [],
}

const getters = {
	iprData: state=>state.data,
	iprOptions: state=>{
		return state.data.map(d=>{ return {label: d.username, value: d.uid} })
	}
}

const mutations = {
	setIpr (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshIpr ({commit, rootState, state}) {
		const params = { listRows:"100" };
		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setIpr', d.members.data);
				}else {
					alert('请求Ipr数据失败');
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