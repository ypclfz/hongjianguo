<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component @refreshTableData="refreshTableData" :tableOption="option" :data="tableData" ref="table">
			<fee-status slot="status" v-model="fee_status" style="width: 150px; margin-left: 5px;" :feeType="feeType" feeAnnual></fee-status>
			<remote-select v-if="fee_invoice_if" slot='invoice' v-model="fee_invoice" style="width: 280px; margin-left: 10px;" :type="feeType ? 'bill' : 'pay'"></remote-select>
		</table-component>
		<pop ref="pop" :feeType="feeType" :popType="popType" @refresh="refresh"></pop>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <fee-invoice v-model="fee_invoice_pop" :feeType="feeType" style="margin-bottom: 10px;"></fee-invoice>
      <el-button type="primary" @click="invoicePut">添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 
import Strainer from '@/components/page_extension/FeeCommon_strainer'
import Pop from '@/components/page_extension/feeCommon_pop'
import FeeStatus from '@/components/form/FeeStatus'
import FeeInvoice from '@/components/form/FeeInvoice'
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'

const URL = '/api/fees';
const URL_INVOICE = '/api/invoices';

export default {
  name: 'feeCommon',
  mixins: [ AxiosMixins ],
  data () {
		return {
			popType: '',
		  	option: {
        'name': 'fees',
        'url': URL,
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ 
		  			type: 'dropdown',
		  			label:  '',
		  			icon: 'plus',
		  			items: [
		  				{text: '将选择的费用新建为{key}', click: ()=>{ this.invoiceAdd('selected') } },
		  				{text: '将所有筛选结果新建为{key}', click: ()=>{ this.invoiceAdd('all') } },
		  				{text: '将选择的费用添加到已有{key}', click: ()=>{ this.invoicePutPop('selected') } },
		  				{text: '将所有筛选结果添加到已有{key}', click: ()=>{ this.invoicePutPop('all') } },
		  			],
		  		},
          { type: 'export' },
          { type: 'import' },
		  		{ type: 'control' },
		  	],
        'import_type': '',
		  	'header_slot': [ 'status', 'invoice'],
		  	'columns': [
		  		{ type: 'selection' },
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
		  		{ 
		  			type: 'action',
            width: '137',
		  			btns: [
		  				{ type: 'edit', click:  this.editPop},
		  				{ type: 'delete', click: this.feeDelete },
		  			]
		  		}
		  	],
		  },
		  tableData: [],
		  filter: {},
		  fee_status: 0,
		  fee_invoice: '',
      fee_invoice_if: false,
      fee_invoice_scope: '',
      fee_invoice_pop: '',
      dialogVisible: false,
		}
  },
  computed: {
  	feeType () {
  		
  		const path = this.$route.path;
  		const type = /income/.test(path) ? 1 : 0;

  		const k = type ? '请款单' : '付款单';
  		const o = this.option.header_btn[1];
  		o.label = k;
  		o.items.forEach(d=>{d.text = d.text.replace('{key}', k)});

      this.option.import_type = type ? 'feesIncome' : 'feesPayable';
  	
  		this.option.header_btn.splice(1, 1, o);
  		
  		return type;  
  	},
    feeTypeName () {
      return this.feeType ? '请款单' : '付款单';
    },
    dialogTitle () {
      const key = this.fee_invoice_scoope == 'all' ? '筛选费用' : '选择费用' 
      return  `${key}添加至${this.feeTypeName}`;
    }
  },
  methods: {
  	refreshTableData (option) {
      if(this.fee_invoice instanceof Object) return;

  		const url = URL;
  		const debit = this.feeType;
  		const status = this.fee_status;
      const invoice = this.fee_invoice_if && this.fee_invoice != '' ? {fee_invoice: this.fee_invoice} : {};
  		const data = Object.assign({}, option, { debit, status }, this.filter, invoice);
  		const success = d=>{ 
        if(data['format'] == 'excel') {
          if(d.fees.downloadUrl) {
            window.location.href = d.fees.downloadUrl;  
          }
        }else {
          this.tableData = d.fees;  
        }
         
      };

  		this.axiosGet({url, data, success});
  	},
  	addPop () {
  		this.popType = 'add';
  		this.$nextTick(()=>{
  			this.$refs.pop.show();	
  		})
  		
  	},
  	editPop (row) {
  		this.popType = 'edit';
  		this.$refs.pop.show(row);
  	},
  	feeDelete ({id, name}) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’吗？`, { type: 'warning' })
  			.then(()=>{
  				const url = `${URL}/${id}`;
		  		const success = ()=>{ this.$refs.table.update() };
		  		this.axiosDelete({url, success});		
  			})
  			.catch(()=>{}); 		
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	invoiceAdd (scope) {
  		let fees;
  		
  		if( scope == "all" ) {
        return false;
  		}else {
  			let s = this.$refs.table.tableSelect;
  			if(s.length == 0) {
  				this.$message({ message: '请选择需要添加的费用', type: 'warning' });
  				return false;
  			}else {
  				fees = s.map(_=>_.id);
  			}
  		}

  		const url = URL_INVOICE;
  		const data = { debit: this.feeType, scope, fees };
  		const success = ()=>{this.$alert('新建账单成功', {type: 'success', closeOnClickModal: true})};

  		this.axiosPost({ url, data, success });
  	},
  	invoicePutPop (scope) {
      if(scope == 'all') {
        return false;
      }else {
        let s = this.$refs.table.tableSelect;
        if(s.length == 0) {
          this.$alert('请选择需要添加的费用', {type: 'warning', closeOnClickModal: true});
          return false;
        }
      }

      this.fee_invoice_scope = scope;
      this.dialogVisible = true; 
      
  	},
    invoicePut () {
      const scope = this.fee_invoice_scope;
      let fees;
      
      if(this.fee_invoice_pop == '') {
        this.$alert(`请选择${this.feeTypeName}`, {type: 'warning', closeOnClickModal: true});
        return false;
      }
      
      if(scope == 'all') {

      }else {
        let s = this.$refs.table.tableSelect;
        fees = s.map(_=>_.id);
      }


      const url = `${URL_INVOICE}/${this.fee_invoice_pop}/fees`;
      const data = { scope, fees };
      const success = _=>{ this.$alert('添加费用成功', {type: 'success', closeOnClickModal: true}) };
      this.axiosPut({url, data, success});
    }
  },
  watch: {
  	fee_status (val) {
      if( val == 1 || val == 2) {
        this.fee_invoice_if = true;
      }else {
        this.fee_invoice_if = false;
        this.fee_invoice = '';
      }

  		this.refresh();
  	},
    fee_invoice (val) {
      if( this.fee_invoice_if ) {
        this.refresh(); 
      }
    }
  },
  mounted () {
    if(this.$route.query.id) {
      // console.log(this.$router.params);
      // console.log('aaaa');
      this.fee_status = this.feeType ? 1 : 2;
      this.fee_invoice = {id: this.$route.query.id, name: this.$route.query.name};
      // console.log(this.fee_status);
    }else {
      this.refresh();  
    }
  },
  
  components: { TableComponent, Strainer, Pop, FeeStatus, FeeInvoice, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>