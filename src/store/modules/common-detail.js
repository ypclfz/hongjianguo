const state = {
	type: '',
}

const getters = {
	detailType: state=>state.type,
}

const mutations = {
	setDetailType: (state, path)=>{
		const arr = ['patent', 'trademark', 'copyright'];
		for(let a of arr) {
			const reg = new RegExp(a);
			if(reg.test(path)) {
				state.type = a;
				break;
			}
		}
	}
}

const actions = {
	
}

export default {
	state,
	getters,
	mutations,
	actions,
}