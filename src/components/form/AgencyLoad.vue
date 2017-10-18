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
					{type: 'text', label: '代理所名称', prop: 'name'},
					{type: 'text', label: '未完成案件数', prop: 'count'},
					{type: 'text', label: '返稿及时率', prop: 'ratio'},
					{type: 'text', label: '评分', prop: 'rank'},
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
			const success = _=>{
				this.data = _.data;
			};

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