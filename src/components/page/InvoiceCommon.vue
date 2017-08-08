<template>
  <div class="main">
  <strainer v-model="filter" @refresh="refresh"></strainer>
	<table-component @refreshTableData="refreshTableData" :tableOption="option" :data="tableData" ref="table"></table-component>
	<pop :feeType="feeType" :popType="popType" ref="pop"></pop>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/InvoiceCommon_strainer'
import Pop from '@/components/page_extension/InvoiceCommon_pop'

const URL = '/api/invoices';

export default {
  name: 'invoiceCommon',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'control' }
		  	],
		  	'columns': [
		  		{ type: 'text', label: '账单对象', prop: 'target' },
		  		{ type: 'text', label: '创建时间', prop: 'create_time' },
		  		{ type: 'text', label: '付款期限', prop: 'due_time' },
		  		{ type: 'text', label: '付款绝限', prop: 'deadline' },
		  		{ type: 'text', label: '付款时间', prop: 'pay_time' },
		  		{ type: 'text', label: '金额', prop: 'amount' },
		  		{ type: 'text', label: '货币', prop: 'currency' },
		  		{ type: 'text', label: '汇率', prop: 'roe' },
		  		{ type: 'text', label: '人民币金额', prop: 'rmb' },
		  		{ type: 'text', label: '状态', prop: 'status' },
		  		{ type: 'text', label: '备注', prop: 'remark' },
		  		{ type: 'text', label: '收入/支出类型', prop: 'debit' },
		  		{ type: 'text', label: '发票号码', prop: 'invoice_no' },
		  		{ type: 'text', label: '开票日期', prop: 'invoice_date' },
		  		{ type: 'text', label: '快递公司', prop: 'express_company' },
		  		{ type: 'text', label: '快递单号', prop: 'express_number' },
		  		{ type: 'text', label: '快递日', prop: 'express_date' },
		  		{ type: 'text', label: '创建人', prop: 'creator_name' },
		  		{ type: 'text', label: '发票抬头', prop: 'invoice_title' },
		  		{ type: 'text', label: '纳税人识别号', prop: 'tax_payer_identifier' },
		  		{ type: 'text', label: '银行账号', prop: 'account' },
		  		{ type: 'text', label: '开户行', prop: 'bank' },
		  		{ type: 'text', label: '地址', prop: 'target' },
		  		{ type: 'text', label: '电话', prop: 'telphone' },
		  		{ 
		  			type: 'action',  
		  			btns: [
		  				{ type: 'edit',  click: this.editPop},
		  				{ type: 'detail', click: this.detail },
		  				{ type: 'delete',  click: this.invoiceDelete},
		  			], 
		  		},
		  	],
		  },
		  tableData: [],
		  filter: {},
		  popType: 'edit',
		}
  },
  computed: {
  	feeType () {
  		//'bill'|'payment'
  		const path = this.$route.path;

  		return /bill/.test(path) ? 1 : 0; 
  	}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const debit = this.feeType;
  		const data = Object.assign({}, option, { debit }, this.filter);
  		const success = d=>{ this.tableData = d.invoices };

  		this.axiosGet({url, data, success});
  	},
  	refresh () {

  		this.$refs.table.refresh();
  	},
  	detail ({id}) {
  		this.router.push(`fee/${this.feeType ? 'income' : 'pay'}`, { params: {id} });
  	},
  	editPop (row) {
  		this.popType='edit';
  		this.$refs.pop.show(row);
  	},
  	invoiceDelete ({id, target}) {
  		this.$confirm(`删除后不可恢复, 确认删除‘${target}’的账单？`)
  			.then(()=>{
  				const url = `${URL}/${id}`;
  				const success = ()=>{ this.$refs.table.update() };
  				this.axiosDelete({url, success});
  			})
  			.catch(()=>{});
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { TableComponent, Strainer, Pop }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>