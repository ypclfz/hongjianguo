const url = '/api/feeCodes';
const state = {
	data: [],
}

const getters = {
	feeCodeOptions: state=>state.data,
	feeCodeMap: state=>{
		const map = new Map();
		state.data.forEach(d=>{
			map.set(d.value, d );
		});
		
		return map;
	}
}

const mutations = {
	setCode (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshFeeCode ({commit, rootState, state}) {
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setCode', d.codes);
				}else {
					alert('请求费用对象数据失败');
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