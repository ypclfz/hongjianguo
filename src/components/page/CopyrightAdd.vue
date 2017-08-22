<template>
  <div class="main">
  	<el-form :model="form" ref="form" label-width="80px">
		<el-form-item label="案件名称" prop="title">
			<el-input v-model="form.title" placeholder="请填写案件名称"></el-input>
		</el-form-item>
		<el-form-item label="案件摘要" prop="abstract">
			<el-input type="textarea" v-model="form.abstract" placeholder="请填写案件摘要" ></el-input>
		</el-form-item>
		<el-form-item label="案件类型" prop="type">
			<el-select v-model="form.type" placeholder="请选择案件类型">
				<el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="技术分类" prop="classification_id">
			<classification v-model="form.classification_id"></classification>
		</el-form-item>
		<el-form-item label="产品分类" prop="products">
			<product v-model="form.products" multiple></product>
		</el-form-item>
		<el-form-item label="标签" prop="tags">
			<tag v-model="form.tags" multiple></tag>
		</el-form-item>
		<el-form-item label="IPR" prop="ipr_id">
			<ipr v-model="form.ipr_id"></ipr>
		</el-form-item>
		<el-form-item label="提案人" prop="proposer_id">
			<member v-model="form.proposer_id"></member>
		</el-form-item>
		<el-form-item label="部门分类" prop="branch_id">
			<branch v-model="form.branch_id"></branch>
		</el-form-item>
		<el-form-item label="申请人" prop="applicants">
			<applicant v-model="form.applicants" multiple></applicant>
		</el-form-item>
		<el-form-item label="附件" prop="attachments">
			<upload v-model="form.attachments" :file-list="attachments"></upload>
		</el-form-item>
		<el-form-item label="备注" prop="remark">
			<el-input type="textarea" v-model="form.remark" placeholder="请填写备注"></el-input>
		</el-form-item>
		<el-form-item label="申请号" prop="apn">
			<el-input v-model="form.apn" placeholder="请填写申请号"></el-input>
		</el-form-item>
		<el-form-item label="申请日" prop="apd">
			<el-date-picker type="date" v-model="form.apd" placeholder="请选择申请日"></el-date-picker>
		</el-form-item>
		<el-form-item label="发证日" prop="issue_date">
			<el-date-picker type="date" v-model="form.issue_date" placeholder="请选择发证日"></el-date-picker>
		</el-form-item>
		<el-form-item label="证书号" prop="issue_number">
			<el-input v-model="form.issue_number" placeholder="请填写证书号"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="add" v-if="pageType == 'add'" :disabled="btn_disabled">添加</el-button>
			<el-button @click="edit" v-if="pageType == 'edit'" :disable="btn_disabled">编辑</el-button>
		</el-form-item>
  	</el-form>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import Tag from '@/components/form/Tag'
import Ipr from '@/components/form/Ipr'
import Member from '@/components/form/Member'
import Branch from '@/components/form/Branch'
import Applicant from '@/components/form/Applicant'
import Upload from '@/components/form/Upload'

const URL = '/api/copyrights'

export default {
  name: 'copyrightAdd',
  mixins: [ AxiosMixins ],
  props: ['pageType'],
  data () {
	return {
	  form: {
	  	title: '',
	  	abstract: '',
	  	type: '',
	  	classification_id: '',
	  	products: [],
	  	tags: [],
	  	ipr_id: '',
	  	proposer_id: '',
	  	branch_id: '',
	  	applicants: [],
	  	attachments: [],
	  	remark: '',
	  	apn: '',
	  	apd: '',
	  	issue_date: '',
	  	issue_number: '',
	  },
	  options: {
	  	type: [
	  		{label: '计算机软件著作权', value: 1},
	  		{label: '文字作品著作权', value: 2},
	  		{label: '美术作品著作权', value: 3},
	  		{label: '影视作品著作权', value: 4},
	  	]
	  },
	  attachments: [],
	  btn_disabled: false,
	}
  },
  methods: {
  	add () {
  		this.btn_disabled = true;
  		const url = URL;
  		const data = this.form;
  		const success = _=>{ this.$router.push('/copyright/list') };
  		const complete = _=>{ ths.btn_disabled = false };

  		this.axiosPost({url, data, success, complete});
  	},
  	edit () {
  		this.btn_disabled = true;
  		const url = `${URL}/${this.id}`;
  		const data = this.form;
  		const success = _=>{ this.$message({message: '编辑成功', type: 'success'}) };
  		const complete = _=>{ this.btn_disabled = false };

  		this.axiosPut({url, data, success, complete})
  	}
  },
  created () {

  },
  components: { Classification, Product, Tag, Ipr, Member, Branch, Applicant, Upload }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>