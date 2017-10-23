<template>
  <div class="main">
  	<strainer v-model="filter" @refresh="refresh"></strainer>
		<table-component @refreshTableData="refreshTableData" :tableOption="option" :data="tableData" ref="table">
			<fee-status slot="status" v-model="fee_status" style="width: 150px; margin-left: 5px;" :feeType="feeType" feeAnnual></fee-status>
			<remote-select v-if="fee_invoice_if" slot='invoice' v-model="fee_invoice" style="width: 280px; margin-left: 10px;" :type="feeType ? 'bill' : 'pay'"></remote-select>
		</table-component>
		<pop ref="pop" :feeType="feeType" :popType="popType" @refresh="refresh"></pop>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="dialog-small">
      <div style="margin-bottom: 10px; color: #8492A6; font-size: 14px;">
        <span v-if="invoicePopType == 'add'">从选取的费用创建一个新的{{ feeTypeName }}，用于批量追踪请款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
        <span v-if="invoicePopType == 'put'">将选取的费用添加到一个现有的{{ feeTypeName }}中，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
      </div>
      <remote-select v-if="invoicePopType=='put'" v-model="fee_invoice_pop" style="margin-bottom: 10px;" :type="feeType ? 'bill' : 'pay'"></remote-select>
      <div>
      <el-button v-if="invoicePopType=='add'" type="primary" @click="invoiceAdd" :disabled="btn_disabled">确认新建</el-button>
      <el-button v-if="invoicePopType=='put'" type="primary" @click="invoicePut" :disabled="btn_disabled">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 
import Strainer from '@/components/page_extension/FeeCommon_strainer'
import Pop from '@/components/page_extension/feeCommon_pop'
import FeeStatus from '@/components/form/FeeStatus'
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
        'height': 'default',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ 
		  			type: 'dropdown',
		  			label:  '',
		  			items: [
		  				{text: '新建{key}', click: ()=>{ this.invoicePop('add') }, icon: 'plus' },
		  				{text: '添加到已有{key}', click: ()=>{ this.invoicePop('put') }, icon: 'd-arrow-right'  },
		  			],
		  		},
          { type: 'delete' },
          { type: 'export' },
          { type: 'import' },
		  		{ type: 'control' },
		  	],
        'import_type': '',
		  	'header_slot': [ 'status', 'invoice' ],
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
            width: '80',
		  			btns: [
		  				{ type: 'edit', click:  this.editPop},
		  				// { type: 'delete', click: this.feeDelete },
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
      dialogVisible: false,
      totalAmount: '',

      invoicePopType: '',
      invoiceSwitchType: '',
      invoiceSwitchDisabled: false,
      invoiceSelected: [],
      fee_invoice_pop: '',
      btn_disabled: false,
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
      const str = this.invoicePopType == 'add' ? '新建为' : '添加到已有';
      return  `将费用${str}${this.feeTypeName}`;
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
		  		const success = ()=>{ 
            this.$message({message: '删除费用成功', type: 'success'});
            this.$refs.table.update() 
          };
		  		this.axiosDelete({url, success});		
  			})
  			.catch(()=>{}); 		
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
    invoicePop (type) {
      
      const s = this.$refs.table.getSelect();
      if(s) {
        this.invoicePopType = type;
        this.invoiceSelected = s;
        this.invoiceSwitchType = 'selected';
        this.fee_invoice_pop = '';

        this.dialogVisible = true;  
      }
       
    },
  	invoiceAdd () {

      const scope = this.invoiceSwitchType;
  		const s = this.invoiceSelected;
      let fees;
      
      if( scope == "all" ) {
        this.$message({message: '暂未实现新建全部的接口', type: 'warning'});
        this.dialogVisible = false;
        return false;
      }else {
        fees = s.map(_=>_.id); 
  		}

  		const url = URL_INVOICE;
  		const data = { debit: this.feeType, scope, fees };
  		const success = ()=>{
        this.$message({message: `新建${this.feeTypeName}成功`, type: 'success'});
        this.dialogVisible = false;
        this.refresh();
      };
      const complete = _=>{ this.btn_disabled = false; }
      this.btn_disabled = true;
  		this.axiosPost({ url, data, success, complete });

  	},
    invoicePut () {

      const scope = this.invoiceSwitchType;
      const s = this.invoiceSelected;
      let fees;

      if(this.fee_invoice_pop == '') {
        this.$message({message: `请选择${this.feeTypeName}`, type: 'warning'});
        return false;
      }
      
      if(scope == 'all') {
        this.$message({message: '暂未实现添加全部的接口', type: 'warning'});
        this.dialogVisible = false;
        return false;
      }else {
        fees = s.map(_=>_.id);
      }

      const url = `${URL_INVOICE}/${this.fee_invoice_pop}/fees`;
      const data = { scope, fees };
      const success = _=>{ 
        this.$message({message: `添加到已有${this.feeTypeName}成功`, type: 'success'});
        this.dialogVisible = false;
        this.refresh();
      };
      const complete = _=>{ this.btn_disabled = false; }
      this.btn_disabled = true;
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
      this.fee_status = this.feeType ? 1 : 2;
      this.fee_invoice = {id: this.$route.query.id, name: this.$route.query.name};
    }else {
      this.refresh();  
    }
  },
  
  components: { 
    TableComponent, 
    Strainer, 
    Pop, 
    FeeStatus, 
    RemoteSelect 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>