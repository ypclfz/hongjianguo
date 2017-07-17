import axios from 'axios'
const url = 'http://www.zhiq.wang/tag/lists';
const state = {
  tags: [],
}

const getters = {
	tagOptions: state=>state.tags,
}

const mutations = {
	setTags (state, tags) {
		const t = state.tags;
		tags.forEach(d=>{t.push({ label: d.tag, value: d.tag })});
	}
}

const actions = {
	refreshTags ({ commit }) {
		axios.get(url)
			.then(response=>{
				const d = response.data;
				if(d.status){
					commit('setTags', d.tags);
				}else {
					slert('请求标签数据失败');
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