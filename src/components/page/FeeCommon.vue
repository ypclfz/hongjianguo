<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component :tableOption="option" :data="tableData" ref="table"></table-component>
		<pop ref="pop" @refresh="refresh"></pop>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 
import Stariner from '@/components/page_extension/FeeCommon_strainer'
import Pop from '@/components/page_extension/feeCommon_pop'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/fees';

export default {
  name: 'feeCommon',
  mixins: [ AxiosMixins ],
  data () {
		return {
			pop_type: '',
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ type: 'control' },
		  	], 
		  	'columns': [
		  		{ type: 'text', label: '案号', prop: 'serial' },
		  		{ type: 'text', label: '案件类型', prop: 'category' },
		  		{ type: 'text', label: '专利类型', prop: 'patent_type' },
		  		{ type: 'text', label: '案件名称', prop: 'title' },
		  		{ type: 'text', label: '申请号', prop: 'apn' },
		  		{ type: 'text', label: '申请日', prop: 'apd' },
		  		{ type: 'text', label: '地区', prop: 'area' },
		  		{ type: 'text', label: '发文日', prop: 'mail_date' },
		  		{ type: 'text', label: '创建日期', prop: 'create_time' },
		  		{ type: 'text', label: '费用期限', prop: 'due_time' },
		  		{ type: 'text', label: '官方绝限', prop: 'deadline' },
		  		{ type: 'text', label: '付款时间', prop: 'pay_time' },
		  		{ type: 'text', label: '费用对象', prop: 'target' },
		  		{ type: 'text', label: '费用名称', prop: 'name' },
		  		{ type: 'text', label: '费用类型', prop: 'type_name' },
		  		{ type: 'text', label: '金额', prop: 'fee' },
		  		{ type: 'text', label: '汇率', prop: 'roe' },
		  		{ type: 'text', label: '货币', prop: 'currency' },
		  		{ type: 'text', label: '人民币', prop: 'amount' },
		  		{ type: 'text', label: '状态', prop: 'status_name' },
		  		{ type: 'text', label: '请款单ID', prop: 'invoice_id' },
		  		{ type: 'text', label: '请款单备注', prop: 'invoidce_remark' },
		  		{ type: 'text', label: '发票抬头', prop: 'invoice_title' },
		  		{ type: 'text', label: '纳税人识别号', prop: 'tax_payer_identifier' },
		  		{ type: 'text', label: '费用备注', prop: 'remark' },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click:  this.editPop},
		  				{ type: 'delete', click: this.feeDelte },
		  			]
		  		}
		  	],
		  },
		  tableData: [],
		  filter: {},
		}
  },
  computed: {
  	fee_type () {
  		const path = this.$route.path;
  		return /income/.test(path) ? 'income' : 'pay'; 
  	}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const debit = this.fee_type == 'income' ? 1 : 0;
  		const data = Object.assigen({}, option, { debit }, filter);
  		const success = d=>{ this.tableData = d.fees };

  		this.axiosGet({url, data, success});
  	},
  	addPop () {
  		this.pop_type = 'add';
  		this.$refs.pop.show();
  	},
  	editPop () {
  		this.pop_type = 'edit';
  		this.$refs.pop.show();
  	},
  	feeDelete ({id, name}) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’吗？`)
  			.then(()=>{
  				const url = `${URL}/${id}`;
		  		const success = ()=>{ this.$refs.table.update };
		  		this.axiosDelete({url, success});		
  			})
  			.catch(()=>{}); 		
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  },
  
  components: { TableComponent, Stainer, Pop }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>