<template>
  <div class="main">
		<el-form label-width="100px">
			<el-form-item label="模板名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="模板标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="模板内容">
				<el-input type="textarea" class="model-content" v-model="form.content" :rows="30"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="edit">保存</el-button>
				<el-button type="danger" @click="cancel">返回</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins' 

const URL = '/api/templates'

export default {
  name: 'settingTemplateEdit',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  form: {
		  	name: '',
		  	title: '',
		  	content: '',
		  },
		}
  },
  methods: {
  	edit () {
  		const url = `${URL}/${this.id}`;
  		const data = this.form;
  		const success = _=>{ 
  			this.$message({message: '保存成功', type: 'success'});
  		};

  		this.axiosPut({url, data, success});
  	},
  	cancel () {
  		this.$router.push({path: '/setting/template'});
  	},
  	refreshForm () {
  		const url = `${URL}/${this.id}`;
  		const success = _=>{this.$tool.coverObj(this.form, _.info)};

  		this.axiosGet({url, success})
  	}
  },
  computed: {
  	id () {
  		return this.$route.query.id;
  	}
  },
  created () {
  	this.refreshForm();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app .model-content textarea {
  height: auto;
}
</style>
<style scoped lang="scss">

</style>