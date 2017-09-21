let url = '/api/mailAddress';
const state = {
	data: undefined,
}

const getters = {
	mailData: state=>state.data,
	mailOptions: state=>{
		return state.data;
	},
	mailMap: state=>{
		const d = state.data;
		const map = new Map();
		if(d) {
			d.forEach( _=>{ map.set(_.id, _.name) } );
		}

		return map
	}
}

const mutations = {
	setMail (state, d) {
		state.data = d;
	}
}

const actions = {

	refreshMail ({commit, rootState, state}) {
		const params = { };
		url = rootState.status ? url.replace(/\/api/, '') : url;
		rootState.axios
			.get(url, { params })
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setMail', d.list.map( _=>{ return {id: _.value, name: _.label } } ));
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