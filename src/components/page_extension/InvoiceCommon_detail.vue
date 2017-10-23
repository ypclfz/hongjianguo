<template>
<el-form label-width="70px" label-position="left" class="form-information" style="padding: 0 20px;" v-loading="feeLoading" element-loading-text="加载账单详情中...">
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
  <el-row>
    <el-form-item label="费用列表">
    	<table-component :tableOption="feeOptions" :data="feeData" style="margin: 10px 0;"></table-component>
    </el-form-item>
  </el-row>
</el-form>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AxiosMixins from '@/mixins/axios-mixins'

export default {
	name: 'invoiceDetail',
	props: ['id'],
	mixins: [AxiosMixins],
	data(){ 
		return {
			feeLoading: false,
			row: {
				status: '',
				target: '',
				due_time: '',
				pay_time: '',
				create_time: '',
				amount: '',
				remark: '',
			},
			feeData: [],
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
		}
	},
	methods: {
		invoiceAxios (id) {
			const url = `/api/invoices/${id}`;
			const success = _=>{
				this.$tool.coverObj(this.row, _.invoice);
			}
			return this.axiosGet({url, success});
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

  		return this.axiosGet({url, data, success, error});
  	},
  	refresh (id) {
  		const id_c = id ? id : this.id;
			this.feeLoading = true;
			this.$axios.all([this.invoiceAxios(id_c), this.feeAxios(id_c)])
				.then(this.$axios.spread((acct, perms)=>{
					this.feeLoading = false;
				}))
  	}
	},
	created () {
		this.refresh();
	},
	watch: {
		id (val) {
			this.refresh(val);
		}
	},
	components: {
		TableComponent,
	}
}
</script>