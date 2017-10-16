<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component @refreshTableData="refreshTableData" :tableOption="option" :data="tableData" ref="table">
			<el-tag v-if="curTotal !== ''" slot="cur_total" style="margin-left: 15px;">当前页费用：{{ curTotal }}</el-tag>
			<el-tag v-if="allTotal !== ''" slot="all_total" style="margin-left: 10px;">所有费用：{{ allTotal }}</el-tag>
		</table-component>
		<pop :feeType="feeType" :popType="popType" ref="pop" @refresh="update"></pop>
  	<app-shrink :visible.sync="shrinkVisible" title="详细信息">
  		<el-form label-width="70px" label-position="left" class="form-information" style="padding: 0 20px;">
	    	<el-row :gutter="20">
	    		<el-col :span="12">
            <el-form-item label="账单对象"><span>{{ row.target.name }}</span></el-form-item>
            <el-form-item label="付款期限"><span>{{ row.due_time }}</span></el-form-item>
            <el-form-item label="付款时间"><span>{{ row.pay_time }}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间"><span>{{ row.create_time }}</span></el-form-item>
            <el-form-item label="金额"><span>{{ row.amount }}</span></el-form-item>
            <el-form-item label="状态"><span>{{ row.status.name  }}</span></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注"><span>{{ row.remark }}</span></el-form-item>
        </el-row>
        <el-row v-loading="feeLoading" element-loading-text="加载费用信息中..." >
            <el-form-item label="费用列表">
            	<table-component :tableOption="feeOptions" :data="feeData" style="margin-top: 10px;"></table-component>
            </el-form-item>
        </el-row>
	    </el-form>
  	</app-shrink>
  </div>

</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/InvoiceCommon_strainer'
import Pop from '@/components/page_extension/InvoiceCommon_pop'
import AppShrink from '@/components/common/AppShrink'

const URL = '/api/invoices';

export default {
  name: 'invoiceCommon',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
		  	'name': 'invoice',
		  	'url': URL,
		  	'height': 'default',
		  	'highlightCurrentRow': true, 
        'rowClick': this.handleRowClick,
		  	'header_btn': [
		  		{ type: 'export' },
		  		{ type: 'delete' },
		  		{},
		  		{ type: 'control' },
		  	],
		  	'header_slot': ['cur_total', 'all_total'],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '账单对象', prop: 'target', render_simple: 'name', width: '200' },
		  		{ type: 'text', label: '创建时间', prop: 'create_time',width: '200' },
		  		{ type: 'text', label: '付款期限', prop: 'due_time', width: '200' },
		  		// { type: 'text', label: '付款绝限', prop: 'deadline',width: '200' },
		  		{ type: 'text', label: '付款时间', prop: 'pay_time',width: '200' },
		  		{ type: 'text', label: '金额', prop: 'amount', width: '200' },
		  		{ type: 'text', label: '币种', prop: 'currency', width: '200' },
		  		{ type: 'text', label: '汇率', prop: 'roe', width: '200' },
		  		{ type: 'text', label: '人民币', prop: 'rmb', width: '200' },
		  		{ type: 'text', label: '状态', prop: 'status', render_simple: 'name', width: '200' },
		  		{ type: 'text', label: '备注', prop: 'remark',width: '200' },
		  		// { type: 'text', label: '收入/支出类型', prop: 'debit',width: '200' },
		  		// { type: 'text', label: '发票号码', prop: 'invoice_no',width: '200' },
		  		// { type: 'text', label: '开票日期', prop: 'invoice_date',width: '200' },
		  		// { type: 'text', label: '快递公司', prop: 'express_company' },
		  		// { type: 'text', label: '快递单号', prop: 'express_number' },
		  		// { type: 'text', label: '快递日', prop: 'express_date' },
		  		// { type: 'text', label: '创建人', prop: 'creator_name',width: '200' },
		  		// { type: 'text', label: '发票抬头', prop: 'invoice_title',width: '200' },
		  		// { type: 'text', label: '纳税人识别号', prop: 'tax_payer_identifier',width: '200' },
		  		// { type: 'text', label: '银行账号', prop: 'account',width: '200' },
		  		// { type: 'text', label: '开户行', prop: 'bank',width: '200' },
		  		// { type: 'text', label: '地址', prop: 'target',width: '200' },
		  		// { type: 'text', label: '电话', prop: 'telphone',width: '200' },
		  		{ 
		  			type: 'action',
		  			width: '200',
		  			btns: [
		  				{ type: 'edit',  click: this.editPop},
		  				{ type: 'delete',  click: this.invoiceDelete},
		  			], 
		  		},
		  	],
		  	'import_columns': [
		  		{ type: 'text', label: '费用期限', prop: 'due_time', width: '200' },
		  		{ type: 'text', label: '汇率', prop: 'roe', width: '80' },
		  		{ type: 'text', label: '货币', prop: 'currency', width: '80' },
		  		{ type: 'text', label: '人民币', prop: 'amount', width: '100' },
		  		{ type: 'text', label: '备注', prop: 'remark', width: '160' },
		  	]
		  },
		  feeOptions: {
		  	'is_header': false,
		  	'is_pagination': false,
		  	'is_border': false,
		  	'columns': [
		  		{ type: 'text', label: '案号', prop: 'serial', width: '192' },
		  		{ type: 'text', label: '费用对象', prop: 'target', render_simple: 'name', width: '190' },
		  		{ type: 'text', label: '费用名称', prop: 'code', render_simple: 'name', width: '190' },
		  		//{ type: 'text', label: '费用类型', prop: 'type_name', width: '190' },
		  		{ type: 'text', label: '金额', prop: 'fee', width: '80' },
		  		{ type: 'text', label: '汇率', prop: 'roe', is_import: true, width: '80' },
		  		{ type: 'text', label: '币种', prop: 'currency', is_import: true, width: '80' },
		  		{ type: 'text', label: '人民币', prop: 'amount', is_import: true, width: '100' },
		  		{ type: 'text', label: '状态', prop: 'status', render_simple: 'name', width: '180'},
          { type: 'text', label: '案件类型', prop: 'category', width: '116' },
          { type: 'text', label: '专利类型', prop: 'patent_type', width: '133' },
          { type: 'text', label: '案件名称', prop: 'title', width: '189' },
          { type: 'text', label: '申请号', prop: 'apn', width: '210' },
          { type: 'text', label: '申请日', prop: 'apd',  width: '200' },
          { type: 'text', label: '地区', prop: 'area', render_simple: 'name', width: '210' },
          { type: 'text', label: '发文日', prop: 'mail_date', width: '250' },
          { type: 'text', label: '创建日期', prop: 'create_time', width: '200' },
          { type: 'text', label: '费用期限', prop: 'due_time', is_import: true, width: '200' },
          { type: 'text', label: '官方绝限', prop: 'deadline', width: '200' },
          { type: 'text', label: '付款时间', prop: 'pay_time', width: '200' },
		  		{ type: 'text', label: '请款单', prop: 'invoice_id', width: '150' },
		  		//{ type: 'text', label: '请款单备注', prop: 'invoidce_remark', width: '150' },
		  		//{ type: 'text', label: '发票抬头', prop: 'invoice_title', width: '330' },
		  		//{ type: 'text', label: '纳税人识别号', prop: 'tax_payer_identifier', width: '160' },
		  		{ type: 'text', label: '备注', prop: 'remark', is_import: true, width: '160' },
		  	]
		  },
		  feeData: [],
		  feeLoading: false,
		  tableData: [],
		  filter: {},
		  popType: 'edit',
		  curTotal: '',
		  allTotal: '',
		  shrinkVisible: false,
		  row: {
		  	target: '',
		  	status: '',
		  },
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
  	handleRowClick (row) {
  		this.row = row;
  		this.shrinkVisible = true;
  		this.feeAxios(this.row.id);
  	},
  	feeAxios (id) {
  		const url = '/api/fees';
  		const data = { page: 1, listRows: 100, fee_invoice: id };
  		const success = _=>{
  			this.feeData = _.fees.data;
  		}
  		const error = _=>{
  			this.feeData = [];
  		}
  		const complete = _=>{
  			window.setTimeout(_=>{
  				this.feeLoading = false;
  			},500);
  		}

  		this.feeLoading = true;
  		this.axiosGet({url, data, success, error, complete});
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const debit = this.feeType;
  		const data = Object.assign({}, option, { debit }, this.filter);
  		const success = d=>{ 
  			if(data['format'] == 'excel') {
  				if(d.invoices.downloadUrl) {
  					window.location.href = d.invoices.downloadUrl;	
  				}
	      }else {
	        this.tableData = d.invoices;  
	      }

	      if(d.invoices.sum_allpage) {
	      	this.allTotal = d.invoices.sum_allpage;
	      }

	      if(d.invoices.sum_curpage) {
	      	this.curTotal = d.invoices.sum_curpage;
	      }
  		};

  		this.axiosGet({url, data, success});
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	update () {
  		this.$refs.table.update();
  	},
  	editPop (row) {
  		this.popType='edit';
  		this.$refs.pop.show(row);
  	},
  	invoiceDelete ({id, target}) {
  		this.$confirm(`删除后不可恢复, 确认删除‘${target.name}’的账单？`)
  			.then(()=>{
  				const url = `${URL}/${id}`;
  				const success = ()=>{ 
  					this.$message({message: '删除账单成功', type: 'success'});
  					this.$refs.table.update() 
  				};
  				this.axiosDelete({url, success});
  			})
  			.catch(()=>{});
  	}
  },
  created () {
  	if(!this.feeType) {
  		this.option.header_btn.splice(2,1,{'type': 'import'});
  		this.option.import_type = 'invoicePayable';
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { 
  	TableComponent, 
  	Strainer, 
  	Pop,
  	AppShrink 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>