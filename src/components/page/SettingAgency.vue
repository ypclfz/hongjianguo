<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/agencies';
export default {
  name: 'settingAgency',
  mixins: [ AxiosMixins ],
  data () {
		return {
			name: 'agency',
			url: URL,
		  option: {
		  	'is_filter': true,
		  	'header_btn': [
					{ type: 'custom', label: '新增', icon: 'plus', click: ()=>{alert("新增")} },
					{ type: 'custom', label: '启用', icon: '', click: ()=>{alert("启用")} },
					{ type: 'custom', label: '禁用', icon: '', click: ()=>{alert("禁用")} },
					{ type: 'custom', label: '新增', icon: 'delete', click: ()=>{alert("删除")} },
				],
				'columns': [
					{ type: 'selection' },
					{ type: 'text', label: '完整名称', prop: 'name', width: '318' },
					{ type: 'text', label: '联系人', prop: 'contact', width: '84' },
					{ type: 'text', label: '地址', prop: 'address', width: '341' },
					{ type: 'text', label: '联系电话', prop: 'telephone', width: '179' },
					{ type: 'text', label: '邮箱', prop: 'email', width: '204' },
					{ type: 'text', label: '状态', prop: 'status_name', width: '80' },
					{ type: 'array', label: '地区', prop: 'area', width: '160' },
					{ type: 'text', label: '核心合作伙伴', prop: 'is_core_partner_name', width: '133' },
					{ type: 'text', label: '评分', prop: 'rank', width: '180',
					  render: (h,item)=>{
					  	const rank = item/20;
					  	return h('el-rate', {
					  		attrs: {
					  			'value': rank,
					  			'disabled': true,
					  			'show-text': true,
					  			'text-color': '#f90',
					  			'text-template': `${item}`,
					  		}
					  	})
					  }
					},
				]
		  },
		  tableData: [],
		}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const data = option;
  		const success = _=>{ this.tableData = _.agencies };

  		this.axiosGet({url, data, success});
  	},
  	refresh () {
  		this.$refs.table.refresh();	
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { TableComponent },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>