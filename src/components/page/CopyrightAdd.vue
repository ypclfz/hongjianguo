<template>
  <div class="main">
  	<el-form :model="form" ref="form" label-width="120px" :rules="rules">
		<el-form-item label="案件名称" prop="title">
			<el-input v-model="form.title" placeholder="请填写案件名称"></el-input>
		</el-form-item>
		<el-form-item label="案件摘要" prop="abstract">
			<el-input type="textarea" v-model="form.abstract" placeholder="请填写案件摘要" ></el-input>
		</el-form-item>
		<el-form-item label="著作权类型" prop="type">
			<el-select v-model="form.type" placeholder="请选择案件类型">
				<el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="技术分类" prop="classification">
			<classification v-model="form.classification"></classification>
		</el-form-item>
		<el-form-item label="产品分类" prop="products">
			<product v-model="form.products" multiple></product>
		</el-form-item>
		<el-form-item label="标签" prop="tags">
			<static-select type="tag" v-model="form.tags" multiple></static-select>
		</el-form-item>
		<el-form-item label="IPR" prop="ipr">
			<span class="form-item-text" v-if="type == 'add'">{{ user ? user.name : '暂未读取到当前用户数据' }}</span>
			<static-select type="ipr" v-model="form.ipr" v-else></static-select>
		</el-form-item>
		<el-form-item label="提案人" prop="proposer">
			<remote-select type="member" v-model="form.proposer"></remote-select>
		</el-form-item>
		<el-form-item label="部门分类" prop="branch">
			<branch v-model="form.branch"></branch>
		</el-form-item>
		<el-form-item label="申请人" prop="applicants">
			<remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
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
			<el-button @click="add" v-if="type == 'add'" :disabled="btn_disabled" type="primary">添加</el-button>
			<el-button @click="edit" v-if="type == 'edit'" :disable="btn_disabled" type="primary">编辑</el-button>
		</el-form-item>
  	</el-form>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import Branch from '@/components/form/Branch'

import Upload from '@/components/form/Upload'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

const URL = '/api/copyrights'

export default {
  name: 'copyrightAdd',
  mixins: [ AxiosMixins ],
  props: ['pageType'],
  data () {
		return {
		  id: '',
		  form: {
		  	title: '',
		  	abstract: '',
		  	type: 1,
		  	classification: '',
		  	products: [],
		  	tags: [],
		  	ipr: '',
		  	proposer: '',
		  	branch: '',
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
		  rules: {
		  	title: { required: true, message: '版权名称不能为空', trigger: 'blur' },
		  	type: { type: 'number', required: true, message: '著作权不能为空', trigger: 'change' },
		  },
		  attachments: [],
		  btn_disabled: false,
		}
  },
  computed: {
  	type () {
  		return this.pageType ? this.pageType : this.$route.meta.pageType;
  	},
  	detail () {
      return this.$store.getters.detailBase;
    },
    user () {
    	return this.$store.getters.getUser;
    }
  },
  methods: {
  	add () {
  		if(this.checkForm()) return;

  		this.btn_disabled = true;
  		const url = URL;
  		const data = this.$tool.shallowCopy(this.form, {'date': true});
  		data.ipr = this.user ? this.user.id : '';
  		const success = _=>{ this.$router.push('/copyright/list') };
  		const complete = _=>{ this.btn_disabled = false };

  		this.axiosPost({url, data, success, complete});
  	},
  	edit () {
  		if(this.checkForm()) return;

  		this.btn_disabled = true;
  		const url = `${URL}/${this.id}`;
  		const data = this.$tool.shallowCopy(this.form, {'date': true});
  		const success = _=>{ 
  			this.$message({message: '编辑成功', type: 'success'});
  			this.$router.push('/copyright/list'); 
  		};
  		const complete = _=>{ this.btn_disabled = false };

  		this.axiosPut({url, data, success, complete})
  	},
  	checkForm () {
  		let flag = false;
  		this.$refs.form.validate(_=>{flag = !_});

  		if(flag) {
  			this.$message({message: '请正确填写版权字段', type: 'warning'});
  		}

  		return flag;
  	},
  	refreshForm () {
  		const data = this.detail;
  		if(this.type == 'edit' && this.$tool.getObjLength(data) != 0) {
  			
  			this.id = data.id;
  			for(let k in this.form) {
  				const d = data[k];
  				if(k == 'classification' || k == 'branch' || k == 'type' ) {
  					this.form[k] = d.id;
  				}else if(k == 'attachments' || k == 'products') {
  					this.form[k] = d.map(_=>_.id);
  					if(k == 'attachments') this.attachments = d;
  				}else {
  					this.form[k] = d;
  				}
  			}
  		}
  	}
  },
  created () {
  	this.refreshForm();
  },
  watch: {
  	detail () {
  		this.refreshForm();
  	}
  },
  components: { Classification, Product, Branch, Upload, RemoteSelect, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>