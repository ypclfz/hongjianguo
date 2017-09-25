<template>
  <el-dialog :title=title :visible.sync="dialogVisible">
		<el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="相关案件" prop="project">
				<remote-select type="patent" v-model="form.project"></remote-select>
			</el-form-item>
			<el-form-item label="费用对象" prop="target">
				<remote-select type="member" v-model="form.target"></remote-select>
			</el-form-item>
			<el-form-item label="费用代码" prop="code">
				<static-select type="fee_code" v-model="form.code" ref="fee_code"></static-select>
			</el-form-item>
			<el-form-item label="费用状态" prop="status" v-if="popType == 'add'">
				<fee-status v-model="form.status" :feeAnnual="feeAnnual"></fee-status>
			</el-form-item>
			<el-form-item label="费用金额" prop="money">
				<el-row>
					
					<el-col :span="16" style="padding-right: 5px;">
						<el-input v-model="form.money.amount" placeholder="请输入费用金额">
							<el-select 
								v-model="form.money.currency" 
								slot="prepend" 
								placeholder="请选择货币类型"
								style="width: 150px;"
							>
								<el-option v-for="item in options.currencyType" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-input>
					</el-col>

					<el-col :span="8" style="padding-left: 5px;">
						<el-input v-model="form.money.roe" placeholder="请输入执行汇率">
							<template slot="prepend">执行汇率</template>
						</el-input>
					</el-col>

				</el-row>
			</el-form-item>
			<el-form-item label="费用期限" prop="due_time">
				<el-date-picker v-model="form.due_time" type="date" placeholder="请选择费用期限"></el-date-picker>
			</el-form-item>
			<el-form-item label="官方绝限" prop="dealine">
				<el-date-picker v-model="form.deadline" type="date" placeholder="请选择官方期限"></el-date-picker>
			</el-form-item>
			<el-form-item label="支付时间" prop="pay_time">
				<el-date-picker v-model="form.pay_time" type="date" placeholder="请选择支付时间"></el-date-picker>
			</el-form-item>
<!-- 			<el-form-item label="开票主体" prop="invoice_entity_id">
				<invoice-entity v-model="form.invoice_entity_id"></invoice-entity>
			</el-form-item> -->
			<el-form-item label="备注" prop="remark">
				<el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
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
import FeeStatus from '@/components/form/FeeStatus'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

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
		  feeAnnual: false,
		  form: {
		  	project: '',
		  	target: '',
		  	code: '',
		  	status: '',
		  	money: {
		  		amount: '',
		  		currency: '',
		  		roe: '',
		  	},
		  	due_time: '',
		  	deadline: '',
		  	pay_time: '',
		  	invoice_entity_id: '',
		  	remark: '',
		  },
		  options: {
		  	currencyType: [
		  		{label:"人民币[CNY]",value:"CNY"},
		  		{label:"美元[USD]",value:"USD"},
		  		{label:"欧元[EUR]",value:"EUR"},
		  		{label:"日元[JPY]",value:"JPY"},
		  		{label:"韩元[KRW]",value:"KRW"},
		  		{label:"港币[HKD]",value:"HKD"},
		  		{label:"新台币[NTD]",value:"NTD"},
		  		{label:"英磅[GBP]",value:"GBP"},
		  		{label:"德国马克[DEM]",value:"DEM"},
		  		{label:"瑞士法郎[CNY]",value:"CHF"},
		  		{label:"加拿大元[CAD]",value:"CAD"},
		  		{label:"澳大利亚元[AUD]",value:"AUD"},
		  		{label:"新西兰元[NZD]",value:"NZD"},
		  	]
		  },
		}
  },
  computed: {
  	title () {
  		const key1 = this.popType == 'add' ? '新增' : '编辑';
  		const key2 = this.feeType == 1 ? '应收' : '应付';
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
  				}
  				else {
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
  			if(this.form.code) {
  				this.form.code = this.form.code.id;
  			}
  			this.form.status = this.form.status.id;
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
  		const success = ()=>{ 
  			this.$message({message: '编辑成功', type: 'success'});
  			this.dialogVisible = false;
  			this.$emit('refresh') 
  		};

  		this.axiosPut({url, data, success});
  	},
  	cancel () {
  		this.dialogVisible = false;
  	},
  	codeChange ({amount, name}) {
  		this.form.money.amount = amount;
  		this.form.money.currency = 'CNY';
  		this.form.money.roe = "1";

  		const reg = /年费/;
  		this.feeAnnual = reg.test(name); 
  	},
  },
  watch: {
		'form.code': {
			handler () {
				console.log('aaaaa');
				this.$nextTick(_=>{
					const val = this.$refs.fee_code.getSelected()[0];
					if(val) {
						this.codeChange(val);
					}	
				})
				
			}
		}
	},
  components: { Patent, Member, FeeStatus, RemoteSelect, StaticSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>