let url = '/api/static/js/area.json';
const state = {
	data: [],
}

const getters = {
	areaData: state=>state.data,
	areaMap: state=>{
		const map = new Map();
		state.data.forEach(_=>{map.set(_.id, _.name)});

		return map;
	}
}

const mutations = {
	setArea (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshArea ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;

		const d = rootState.tool.getLocal('area');
		if(d) {
			commit('setArea', JSON.parse(d));
		}else {
			rootState.axios
			.get(url)
			.then(response=>{
				const arr = eval(`${response.data}`);
				commit('setArea', arr);
				rootState.tool.setLocal('area', JSON.stringify(arr));
			})
			.catch(error=>{console.log(error)});	
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}