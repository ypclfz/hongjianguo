<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData"></table-component>
		<el-dialog :title="dialogType == 'add' ? '新增费用' : '编辑费用'" :visible.sync="dialogFormVisible"><fe-form @freshData="freshData" :type="popType" ref="form"></fe-form></el-dialog>
		<el-dialog title="设置筛选条件" :visible.sync="dialogFilterVisible"><fe-filter @freshData="freshData" ref="filter"></fe-filter></el-dialog>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import FeForm from '@/components/page_extension/FeeExpanse_Form' 
import FeFilter from '@/components/page_extension/FeeExpanse_filter' 

export default {
  name: 'feeExpanse',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ 
		  			type: 'dropdown',
		  			label: '付款单',
		  			icon: '',
		  			items: [
		  				{ text: '从选取的费用创建新的付款单' },
		  				{ text: '将选取的费用添加至已有的付款单' },
		  			]
		  		},
		  		{
		  			type: 'dropdown',
		  			label: '数据',
		  			icon: '',
		  			items: [
		  				{ text: '筛选' },
		  				{ text: '导出', click: ()=>{alert("导出")} },
		  				{ text: '删除', divided: true },
		  				{ text: '标记为已导出状态' },
		  				{ text: '标记为未导出状态', divided: true },
		  				{ text: '标记为已付款' },
		  				{ text: '标记为未付款', divided: true },
		  			]
		  		},
		  		{ type: 'control' }
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '案件类型', show: false },
		  		{ type: 'text', label: '案号' },
		  		{ type: 'text', label: '案件名称' },
		  		{ type: 'text', label: '分所', show: false },
		  		{ type: 'text', label: '案源人', show: false },
		  		{ type: 'text', label: '客户', show: false },
		  		{ type: 'text', label: '申请日' },
		  		{ type: 'text', label: '申请号' },
		  		{ type: 'text', label: '发文日期', show: false },
		  		{ type: 'text', label: '上传日期', show: false },
		  		{ type: 'text', label: '费用期限', show: false },
		  		{ type: 'text', label: '法定期限' },
		  		{ type: 'text', label: '付款时间', show: false },
		  		{ type: 'text', label: '费用对象' },
		  		{ type: 'text', label: '费用名称' },
		  		{ type: 'text', label: '外币' },
		  		{ type: 'text', label: '货币' },
		  		{ type: 'text', label: '汇率' },
		  		{ type: 'text', label: '金额' },
		  		{ type: 'text', label: '状态' },
		  		{ type: 'text', label: '监控类型' },
		  		{ type: 'text', label: '备注', show: false },
		  		{ type: 'text', label: '案件状态', show: false },
		  		{ type: 'text', label: '导出标记', show: false },
		  		{ type: 'text', label: '订单号', show: false },
		  		{ type: 'text', label: '负责人', show: false },
		  		{
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.editPop },
		  			],
		  		}
		  	]
		  },
		  tableData: [],
		  popType: '',
		  dialogFormVisible: false,
		  dialogFilterVisible: false,
		}
  },
  methods () {
  	addPop () {
  		const form = this.$refs.form.formData;
  		this.dialogType = 'add';
  		this.$tool.clearForm(form);
  		this.dialogFormVisible = true;
  	},
  	editPop (row) {
  		const form = this.$refs.form.formData;
  		this.dialogType = 'edit';
  		this.$tool.setForm(form, row);
  		this.dialogFormVisible = true;
  	},
  	filterPop () {
  		const form = this.$refs.filter.formData;
  		this.$tool.clearForm(form);
  		this.dialogFilterVisible = true;
  	},
  	freshData (data) {
  		this.tableData = data;
  	}
  }
  components: { TableComponent, FeForm, FeFilter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>