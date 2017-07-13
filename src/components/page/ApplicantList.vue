<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
	<add ref="add" @refreshTableData="refreshTableData"></add>
	<filter ref="filter" @refreshTableData="refreshTableData" @refreshFilter="refreshFilter"></filter>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Add from '@/components/page_extension/ApplicantList_add'
import Filter from '@/components/page_extension/ApplicantList_filter' 

export default {
  name: 'applicantList',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: ()=>{alert('新增')} },
		  		{ type: 'filter', click: ()=>{alert('过滤')} },
		  		{ type: 'control' },
		  	],
		  	'columns': [
		  		{ type: 'text', label: '申请人姓名', prop: 'name' },
		  		{ type: 'text', label: '申请人类型', prop: 'type' },
		  		{ type: 'text', label: '证件号码', prop: 'identity' },
		  		{ type: 'text', label: '地区', prop: 'area' },
		  		{ type: 'text', label: '省份', prop: 'province' },
		  		{ type: 'text', label: '城市', prop: 'city' },
		  		{ type: 'text', label: '详细地址', prop: 'address' },
		  		{ type: 'text', label: '邮编', prop: 'postcode' },
		  		{ type: 'text', label: '费用备案', prop: 'fee_discount' },
		  		{ type: 'text', label: '英文姓名', prop: 'ename' },
		  		{ type: 'text', label: '英文地址', prop: 'eaddress' },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: ()=>{ alert('编辑') } },
		  				{ type: 'delete', click: ()=>{ alert('删除') } },
		  			] 
		  		}
		  	],
		  },
		  tableData: [{   		
				id: '1',
	      type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
	      name:"name",//申请人姓名
	      identity:"identity",//证件号码
	      area:"area",//地区代码
	      province:"province",//省份代码
	      city:"city",//城市代码
	      address:"address",//详细地址
	      postcode:"postcode",//邮编
	      fee_discount:"fee_discount",//费用备案 0未完成 1已完成
	      //英文信息
	      ename:"ename",//英文姓名
	      eaddress:"eaddress",//英文地址
	    }],
	    filter: {},
		}
  },
  method: {
  	addPopUp () {
  		this.$refs.add.show();
  	},
  	filterPopUp () {
  		this.$refs.filter.show(this.filter);
  	},
  	editPopUp (col) {
  		this.$refs.add.show('edit', col);
  	},
  	delete () {

  	},
  	sort () {

  	},
  	refreshTableData (data) {
  		this.tableData = data;
  	},
  	refreshFilter (filter) {
  		this.filter = filter;
  	}
  },
  components: { TableComponent, Add, Filter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
