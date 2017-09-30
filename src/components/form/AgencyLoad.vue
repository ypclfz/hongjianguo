<template>
	<el-dialog title="代理所负载" :visible="visible" @update:visible="updateVisible" :modal="false" class="dialog-medium">
		<table-component :tableOption="option" :data="data ? data : []"></table-component>
	</el-dialog> 
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AxiosMixins from '@/mixins/axios-mixins'

export default {
	name: 'agencyLoad',
	mixins: [ AxiosMixins ],
	props: ['visible'],
	data () {
		return {
			dialogVisible: false,
			option: {
				'is_header': false,
				'is_pagination': false,
				'columns': [
					{type: 'text', label: '未这成案件数', props: 'name'},
					{type: 'text', label: '评分', props: 'count'},
					{type: 'text', label: '代理所名称', props: 'rank'},
					{type: 'text', label: '返稿及时率', props: 'ratio'},
					{type: 'text', label: '初稿撰稿时间', props: 'first_edition_days'},
					{type: 'text', label: '修改时间', props: 'amending_days'},
					{type: 'text', label: '服务范围', props: 'available_scopes'},
				],
			},
			data: null,
			loading: true,	
		}
	},
	watch: {
		visible (val) {
			if(val && !this.data) {
				this.getData();					
			}
		}
	},
	methods: {
		getData () {
			this.loading = true;
			const url = '/api/agencyStats';
			const success = _=>{console.log(_)};

			this.axiosGet({url, success}).then(_=>{this.loading = false;});
		},
		updateVisible (val) {
			this.$store.commit('setAgencyLoadVisible', val);
		}
	},
	created () {
		if(this.visible) {
			this.getData();
		}
	},
	components: {
		TableComponent,
	}
}
</script>