<template>
  <div class="main">
  <app-tag :tags="tags" is_static>
		<el-form label-width="140px" slot="basic_information">
			<el-form-item label="代理所名称">
				<span class="detail-item">{{ form.name }}</span>
			</el-form-item>
			<el-form-item label="代理所联系人">
				<span class="detail-item">{{ form.contact }}</span>
			</el-form-item>
			<el-form-item label="代理所邮箱">
				<span class="detail-item">{{ form.email }}</span>
			</el-form-item>
			<el-form-item label="代理所地址">
				<span class="detail-item">{{ form.address }}</span>
			</el-form-item>
			<el-form-item label="联系电话">
				<span class="detail-item">{{ form.telephone }}</span>
			</el-form-item>
			<el-form-item label="代理所评分">
				<el-rate style="margin-top: 8px;" v-if="form.rank ? true : false" :value="form.rank/20" disabled show-text text-color="#f90" :text-template="form.rank + ''"></el-rate>
				<span v-else class="detail-item">暂无评分</span>
			</el-form-item>
			<el-form-item label="核心伙伴">
				<span class="detail-item">{{ form.is_core_partner_name }}</span>
			</el-form-item>
			<el-form-item label="业务范围">
				<el-tag v-for="tag in form.scope" :key="tag" style="margin-right: 20px;">{{ tag }}</el-tag>
			</el-form-item>
			<el-form-item label="代理所状态">
				<span class="detail-item">{{ form.status_name }}</span>
			</el-form-item>
		</el-form>
		<div slot="statistics">
			<statistics :data="form"></statistics>
		</div>
	</app-tag>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppTag from '@/components/common/AppTag'
import Statistics from '@/components/page_extension/SettingAgencyDetail_statistics'

const URL = '/api/agencies';

export default {
  name: 'settingAgencyDetail',
  mixins: [ AxiosMixins ],
  data () {
		return {
			form: {
				name: '',
				contact: '',
				email: '',
				address: '',
				telephone: '',
				rank: '',
				is_core_partner_name: '',
				scope: [],
				status_name: '',
			},
			tags: [
				{ text: '基本信息', key: 'basic_information', default: true },
				{ text: '统计信息', key: 'statistics' },
			]
		}
	},
	created () {
		const id = this.$route.query.id;
		const url = `${URL}/${id}`;
		const success = _=>{
			this.form = _.agency;
		}
		const complete = _=>{
			this.$store.commit('cancelLoading');
		}

		this.$store.commit('onLoading');
		this.axiosGet({url, success, complete});
	},
	components: {
		AppTag,
		Statistics,
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>