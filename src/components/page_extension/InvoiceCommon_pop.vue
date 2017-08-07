<template>
  <el-dialog :title=title :visible.sync="dialogVisible">
		<el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="开票主体" prop="invoice_entity_id">
				<invoice-entity v-model="form.invoice_entity_id"></invoice-entity>
			</el-form-item>
			<el-form-item label="账单期限" prop="due_time">
				<el-date-picker type="date" placeholder="请选择账单期限" v-model="form.due_time"></el-date-picker>
			</el-form-item>
			<el-form-item label="支付时间" prop="pay_time">
				<el-date-picker type="date" placeholder="请选择支付时间" v-model="form.pay_time">
			</el-form-item>
			<el-form-item label="快递公司名称" prop="company">
				<el-input placeholder="请填写快递公式名称" v-model="form.company"></el-input>
			</el-form-item>
			<el-form-item label="快递单号" prop="number">
				<el-input placeholder="请填写快递单号" v-model="form.number"></el-input>
			</el-form-item>
			<el-form-item label="快递寄送日期" prop="date">
				<el-date-picker placeholder="请选择快递寄送日期"></el-date-picker>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			</el-form-item>
			<el-form-item style="margin-bottom: 0px">
				<el-button type="primary" @click="add" v-if="popType == 'add'">添加</el-button>
				<el-button type="primary" @click="edit" v-else-if="popType == 'edit'">编辑</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

import Patent from '@/components/form/Patent'
import Member from '@/components/form/Member'
import FeeCode from '@/components/form/FeeCode'
import FeeStatus from '@/components/form/FeeStatus'
import InvoiceEntity from '@/components/form/InvoiceEntity'


const URL = '/api/fees'

export default {
  name: 'FeeCommonPop',
  mixins: [ AxiosMixins ],
  props: {
  	feeType: Number,
  	popType: String,
  },
  data () {
		return {
		  id: '',
		  dialogVisible: false,
		  form: {
		  	invoice_entity_id: '',
		  	due_time: '',
		  	pay_time: '',
		  	company: '',
		  	number: '',
		  	date: '',
		  	remark: '',
		  },
		}
  },
  computed: {
  	title () {
  		const key1 = this.popType == 'add' ? '新增' : '编辑';
  		const key2 = this.feeType == 1 ? '请款单' : '付款单';
  		return `${key1}${key2}费用`;
  	},
  	submitForm: {
  		get () {
  			const form = this.form;
  			const o = {};
  			for(let k in form) {
  				const d = form[k];
  				if(k == 'money') {
  					Object.assign(o, d);
  				}else if(d instanceof Date) {
  					o[k] = this.$tool.getDate(d);
  				}else {
  					o[k] = d;
  				}
  			}
  			o['debit'] = this.feeType;

  			return o;
  		},
  		set (val) {
  			const arr = ['amount', 'currency', 'roe'] 

  			this.id = val.id;
  			this.$tool.coverObj(this.form, val);
  			arr.forEach( d=>{this.form.money[d] = val[d] });
  		}
  	}
  },
  methods: {
  	show (row) {
  		
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			if( this.popType == 'add' ) {  		
  				this.$refs.form.resetFields(); 			
	  		}else {
	  			this.submitForm = row;
	  		}
  		});
  		
  	},
  	add () {
  		const url = URL;
  		const data = this.submitForm;
  		const success = ()=>{ this.dialogVisible = false; this.$emit('refresh') };

  		this.axiosPost({url, data, success});
  	},
  	edit () {
  		const url = `${URL}/${this.id}`;
  		const data = this.submitForm;
  		const success = ()=>{ this.$emit('refresh') };

  		this.axiosPut({url, data, success});
  	},
  	cancel () {
  		this.dialogVisible = false;
  	},
  	codeChange ({amount, label}) {
  		this.form.money.amount = amount;
  		this.form.money.currency = 'CNY';
  		this.form.money.roe = "1";

  		const reg = /年费/;
  		this.feeAnnual = reg.test(label); 
  	},
  },
  components: { Patent, Member, FeeCode, FeeStatus, InvoiceEntity },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>