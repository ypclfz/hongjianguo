<template>
  <el-dialog :title=title :visible.sync="dialogVisible">
		<el-form :model="form" ref="form" label-width="100px">
<!-- 			<el-form-item label="开票主体" prop="invoice_entity_id">
				<invoice-entity v-model="form.invoice_entity_id"></invoice-entity>
			</el-form-item> -->
			<el-form-item label="账单期限" prop="due_time">
				<el-date-picker type="date" placeholder="请选择账单期限" v-model="form.due_time"></el-date-picker>
			</el-form-item>
			<el-form-item label="支付时间" prop="pay_time">
				<el-date-picker type="date" placeholder="请选择支付时间" v-model="form.pay_time"></el-date-picker>
			</el-form-item>
			<!-- <el-form-item label="快递公司名称" prop="company">
				<el-input placeholder="请填写快递公司名称" v-model="form.company"></el-input>
			</el-form-item>
			<el-form-item label="快递单号" prop="number">
				<el-input placeholder="请填写快递单号" v-model="form.number"></el-input>
			</el-form-item>
			<el-form-item label="快递寄送日期" prop="date">
				<el-date-picker placeholder="请选择快递寄送日期"></el-date-picker>
			</el-form-item> -->
			<el-form-item label="备注" prop="remark">
        <el-input type="textarea" placeholder="请填写备注"></el-input>
			</el-form-item>
      <el-form-item label="备注" prop="attachments">
        <upload v-model="form.attachments"></upload>
      </el-form-item>
			<el-form-item style="margin-bottom: 0px">
				<el-button type="primary" @click="edit" v-if="popType == 'edit'" :loading="loading">{{ loading ? '数据加载中' : '编辑' }}</el-button>
				<el-button @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import InvoiceEntity from '@/components/form/InvoiceEntity'
import Upload from '@/components/form/Upload'

const URL = '/api/invoices';

export default {
  name: 'FeeCommonPop',
  mixins: [ AxiosMixins ],
  props: {
  	'feeType': Number,
  	'popType': String,
  },
  data () {
		return {
		  id: '',
      loading: false,
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
  		const key1 = this.popType == 'edit' ? '编辑' : '';
  		const key2 = this.feeType ? '请款单' : '付款单';
  		return `${key1}${key2}`;
  	},
  	submitForm () {
  		const form = this.form;
      const copy = {}
      
      for(let k in form) {
        const d = form[k];
        if( d instanceof Date ) {
          copy[k] = this.$tool.getDate(d);
        }else {
          copy[k] = d; 
        }
      }
  	}
  },
  methods: {
  	show (row) { 		
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			if( this.popType == 'edit' ) {
  				this.$tool.coverObj(this.form, row);  			
	  		}
  		});
  	},
  	edit () {
  		const url = `${URL}/${this.id}`;
  		const data = this.submitForm;
  		const success = _=>{ this.$emit('refresh'); this.dialogVisible = false; };
      const complete = _=>{ this.loading = false }; 

      this.loading = true;

  		this.axiosPut({url, data, success, complete});
  	},
  	cancel () {
  		this.dialogVisible = false;
  	},
  },
  components: { InvoiceEntity, Upload },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>