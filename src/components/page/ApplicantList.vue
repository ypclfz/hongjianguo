<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<pop :popType="popType" @refresh="refresh" ref="pop"></pop>
  </div>
</template>

<script>
import Strainer from '@/components/page_extension/ApplicantList_strainer'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/ApplicantList_pop'

const URL = '/api/applicants';

export default {
  name: 'applicantList',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPopUp },
		  		{ type: 'control' },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '申请人姓名', prop: 'name', sortable: true },
		  		{ type: 'text', label: '申请人类型', prop: 'type', sortable: true },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true },
		  		{ type: 'text', label: '地区', prop: 'area', sortable: true },
		  		{ type: 'text', label: '省份', prop: 'province', sortable: true },
		  		{ type: 'text', label: '城市', prop: 'city', sortable: true },
		  		{ type: 'text', label: '详细地址', prop: 'address', sortable: true },
		  		{ type: 'text', label: '邮编', prop: 'postcode', sortable: true },
		  		{ type: 'text', label: '费用备案', prop: 'fee_discount', sortable: true },
		  		{ type: 'text', label: '英文姓名', prop: 'ename', sortable: true },
		  		{ type: 'text', label: '英文地址', prop: 'eaddress', sortable: true },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.editPopUp },
		  				{ type: 'delete', click: this.applicantDelete },
		  			] 
		  		}
		  	],
		  },
		  tableData: [],
	    filter: {},
	    popType: '',
		}
  },
  methods: {
  	addPopUp () {
  		this.popType = 'add';
  		this.$refs.pop.show();
  	},
  	editPopUp (row) {
  		this.popType = 'edit';
  		this.$refs.pop.show(row);
  	},
  	applicantDelete ({id, name} ) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除申请人成功', type: 'success'});
  					this.update();
  				}
  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{});
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const data = Object.assign({}, option, this.filter);
  		const success = _=>{ this.tableData = _.applicants };

  		this.axiosGet({url, data, success});
  	},
    refresh () {
    	this.$refs.table.refresh();
    },
    update () {
    	this.$refs.table.update();
    }
  },
  components: { TableComponent, Pop }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
