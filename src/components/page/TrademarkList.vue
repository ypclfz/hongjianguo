<template>
  <div class="main">
	<table-component :tableOption="tableOption" :data=tableData></table-component>
	<el-dialog :visible.sync="dialogScreenVisible" title="设置筛选条件" class="dialog-small">
		<el-form label-width="80px">
			<el-form-item label="客户名称"><el-input></el-input></el-form-item>
			<el-form-item label="申请地区"><el-input></el-input></el-form-item>
			<el-form-item label="案件状态"><el-input></el-input></el-form-item>
			<el-form-item label="委案日"><app-date-picker></app-date-picker></el-form-item>
			<el-form-item label="申请日"><app-date-picker></app-date-picker></el-form-item>
			<el-form-item><el-button>筛选</el-button></el-form-item>
		</el-form>
	</el-dialog>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'

const text1 = '测试';
const text2 = '测试';
const text3 = '测试';

export default {
  name: 'trademarkList', 
  data () {
	return {
		dialogScreenVisible: false,
		tableOption: {
			'header_btn': [{
				'type': 'custom',
				'label': '新增',
				'icon': 'plus',
				click () {
					alert("新增");
				}
			},
			{
				'type': 'custom',
				'label': '删除',
				'icon': 'delete',
				click () {
					alert("删除");
				}
			},
			{
				'type': 'dropdown',
				'label': '数据',
				'icon': '',
				'items': [{
					text: '设定筛选条件',
					click: ()=>{ this.dialogScreenVisible = true; },
				}]
			},
			{
				'type': 'control',
				'label': '字段'
			}],
			'is_search': false,//默认为true
			'columns': [{
				'show': true,
				'type': 'selection'
			},
			{
				'show': true,//默认为true
				'type': 'text',
				'label': '案号',
				'prop': 'text1',
			},
		  	{
				'show': true,
				'type': 'text',
				'label': '地区',
				'prop': 'text2'
		  	},
		  	{
				'show': true,
				'type': 'text',
				'label': '客户',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '商标名称',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '委案日',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '申请日',
				'prop': 'text3'
		  	},
		  	{
				'show': true,
				'type': 'text',
				'label': '申请号',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '注册号',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '初审公告日',
				'prop': 'text3'
		  	},
		  	{
				'show': false,
				'type': 'text',
				'label': '核准注册日',
				'prop': 'text3'
		  	},
		  	{
				'show': true,
				'type': 'text',
				'label': '商品分类'
		  	},
		  	{ 'show': false, 'type': 'text', 'label': '商品描述' },
		  	{ 'show': false, 'type': 'text', 'label': '详细分类' },
		  	{ 'show': true, 'type': 'text', 'label': '代理人' },
		  	{ 'show': true, 'type': 'text', 'label': 'IPR' },
		  	{ 'show': true, 'type': 'text', 'label': '当前状态' },
		  	{
				'show': true,
				'type': 'action',
				'label': '操作',
				'btns': [{
					'label': '查看详情',
					'icon': 'view',
					'click': (row)=>{ this.$router.push(`/trademark/list/detail/${row.id}/babel`); }, 
				}]
			}] 
		},
		tableData: [
			{text1, text2, text3, id: 1},
			{text1, text2, text3, id: 2},
			{text1, text2, text3, id: 3},
			{text1, text2, text3, id: 4},
			{text1, text2, text3, id: 5},
			{text1, text2, text3, id: 6},
			{text1, text2, text3, id: 7}
		]
	};
  },
  components: { TableComponent, AppDatePicker }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>