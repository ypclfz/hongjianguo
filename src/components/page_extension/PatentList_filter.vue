<template>
  <el-dialog :visible.sync='dialogVisible' class="dialog-small" title="设置筛选条件" @close="close">
  	<el-form label-width="80px">
  		<el-form-item label="申请人">
				<el-select v-model="form.applicant" placeholder="请选择申请人" multiple>
					<el-option v-for="item in applicant_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="发明人">
				<el-select v-model="form.inventor" placeholder="请选择发明人" multiple>
					<el-option v-for="item in inventor_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="代理机构">
				<el-select v-model="form.agency" placeholder="请选择代理机构" multiple>
					<el-option v-for="item in agency_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="代理人">
				<el-select v-model="form.agent" placeholder="请选择代理人" multiple>
					<el-option v-for="item in agent_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="案件状态">
				<el-select v-model="form.status" placeholder="请选择案件状态" multiple>
					<el-option v-for="item in status_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="提案人">
				<el-select v-model="form.proposer" placeholder="请选择提案人" multiple>
					<el-option v-for="item in proposer_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>  		
  		<el-form-item label="IPR">
				<el-select v-model="form.ipr" placeholder="请选择IPR" multiple>
					<el-option v-for="item in ipr_arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
  		</el-form-item>
  		<el-form-item label="委案日">
  			<el-date-picker
		      v-model="entrust_date_area"
		      type="daterange"
		      placeholder="选择委案日期范围">
		    </el-date-picker>
  		</el-form-item>
  		<el-form-item label="申请日">
  			<el-date-picker
		      v-model="application_date_area"
		      type="daterange"
		      placeholder="选择申请日期范围">
		    </el-date-picker>
  		</el-form-item>
  		<el-form-item label="公开日">
  			<el-date-picker
		      v-model="public_date_area"
		      type="daterange"
		      placeholder="选择公开日期范围">
		    </el-date-picker>
  		</el-form-item>
  		<el-form-item label="授权日">
  			<el-date-picker
		      v-model="issue_date_area"
		      type="daterange"
		      placeholder="选择授权日期范围">
		    </el-date-picker>
  		</el-form-item>
  		<el-form-item style="margin-bottom: 0px;">
  			<el-button @click="filter">筛选</el-button>
  			<el-button @click="clear">清空</el-button>
  		</el-form-item>
  	</el-form>
  </el-dialog>
</template>

<script>
const date_arr = ['entrust_date', 'application_date', 'public_date', 'issue_date'];
export default {
  name: 'patentListFilter',
  props: ['formData'],
  data () {
	return {
		dialogVisible: false,
	  form: {
	  	applicant: [],
	  	inventor: [],
	  	agency: [],
      agent: [],
      status: [],
      proposer: [],
      ipr: [],
      entrust_date_start: '',
      entrust_date_end: '',
      application_date_start: '',
      application_date_end: '',
      public_date_start: '',
      public_date_end: '',
      issue_date_start: '',
      issue_date_end: '',
		},
		  applicant_arr: [
		  	{ label: '申请人一', value: '1' },
		  	{ label: '申请人二', value: '2' },
		  	{ label: '申请人三', value: '3' },
		  ],
		  inventor_arr: [
		  	{ label: '发明人一', value: '1' },
		  	{ label: '发明人二', value: '2' },
		  	{ label: '发明人三', value: '3' },
		  ],
		  agency_arr: [
		  	{ label: '代理机构一', value: '1' },
		  	{ label: '代理机构二', value: '2' },
		  	{ label: '代理机构三', value: '3' },
		  ],
		  agent_arr: [
		  	{ label: '代理人一', value: '1' },
		  	{ label: '代理人二', value: '2' },
		  	{ label: '代理人三', value: '3' },
		  ],
		  status_arr: [
		  	{ label: '案件状态一', value: '1' },
		  	{ label: '案件状态二', value: '2' },
		  	{ label: '案件状态三', value: '3' },
		  ],
		  proposer_arr: [
		  	{ label: '提案人一', value: '1' },
		  	{ label: '提案人二', value: '2' },
		  	{ label: '提案人三', value: '3' },
		  ],
		  ipr_arr: [
		  	{ label: 'IPR一', value: '1' },
		  	{ label: 'IPR二', value: '2' },
		  	{ label: 'IPR三', value: '3' },
		  ],

		  	entrust_date_area: [],
		  	application_date_area: [],
		  	public_date_area: [],
		  	issue_date_area: [],
			
		}
  },
  methods: {
  	show () {
  		this.dialogVisible = true;
  	},
  	filter () {
  		this.$emit('refreshFilter', this.form);
  	},
  	clear () {
  		this.$tool.clearObj(this.form);
  		this.$emit('refreshFilter', this.form);
  	},
  	close () {
  		console.log("aaaaa");
  		const obj = this.form;
  		const obj_e = this.formData;
  		console.log(obj, obj_e);
  		for (let key in obj) {
  			
  			if( typeof obj[key] === 'object' ) {
  				obj[key] = obj_e[key] ? [...obj_e[key]] : [];
  			}else {
  				obj[key] = obj_e[key] ? obj_e[key] : '';
  			}
  		}
  	}
  },
  watch: {
  	entrust_date_area (val) {
  		if(val[0] && val[1]) {
  			this.form.entrust_date_start = this.$tool.getDate(val[0]);
  			this.form.entrust_date_end = this.$tool.getDate(val[1]);
  		}
  	},
  	application_date_area (val) {
  		if(val[0] && val[1]) {
  			this.form.application_date_start = this.$tool.getDate(val[0]);
  			this.form.application_date_end = this.$tool.getDate(val[1]);
  		}
  	},
  	public_date_area (val) {
  		if(val[0] && val[1]) {
  			this.form.public_date_start = this.$tool.getDate(val[0]);
  			this.form.public_date_end = this.$tool.getDate(val[1]);
  		}
  	},
  	issue_date_area (val) {
  		if(val[0] && val[1]) {
  			this.form.issue_date_start = this.$tool.getDate(val[0]);
  			this.form.issue_date_end = this.$tool.getDate(val[1]);
  		}
  	},
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>