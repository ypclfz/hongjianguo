let url = '/api/classifications';
const state = {
	data: [],
}

const getters = {
	classificationData: state=>state.data,
	classificationMap: state=>{
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
	setClassification (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshClassification ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setClassification', d.classifications);
				}else {
					// alert('请求技术分类数据失败');
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