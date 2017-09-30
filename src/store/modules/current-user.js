let url = '/api/userinfo'

const state = {
	data: null,
}

const getters = {
	getUser: state=>state.data,
	menusMap: state=>{
		const map = new Map();
		const menus = state.data && state.data.menus ? state.data.menus : [];
		menus.forEach(_=>{map.set(_, true)});

		return map;
	},
	currentUser: state=>state.data,
	username: state=>{
	  const user = state.data; 
      return 
      	user ? 
          user.name ? user.name : user.username
          : '';
	}
}

const mutations = {
	setUser (state, d) {
		state.data = d;
	}
}

const actions = {
	refreshUser ({commit, rootState, state}) {
		url = rootState.status ? url.replace(/\/api/, '') : url;
		const params = {};
		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setUser', d.member);
				}else {
					// alert('请求Ipr数据失败');
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