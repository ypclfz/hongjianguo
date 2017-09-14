let url = '/api/branches';
const state = {
	data: [],
}

const getters = {
	branchData: state=>state.data,
	branchMap: state=>{
		const map = new Map();
		a(state.data);
		return map;

		function a(arr) {
			for(let d of arr) {
				map.set(d.id, d);
				if(d.children && d.children.length) {
					a(d.children);
				}
 			}
		}
	}
}

const mutations = {
	setBranch (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshBranch ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				console.log(response);
				const d = response.data;
				if(d.status){
					commit('setBranch', d.branches);
				}else {
					// alert('请求部门数据失败');
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