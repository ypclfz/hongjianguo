<template>
  <div class="main">
  	<el-row>
  		<el-col :span="18">
		  	<el-form label-width="80px">
		  		<el-form-item label="审核结果">
		  			<el-select v-model="form.result" placeholder="请选择审核结果">
						<el-option value="pass" label="通过"></el-option>
						<el-option 	value="no_pass" label="不通过"></el-option>
		  			</el-select>
		  		</el-form-item>
					<el-form-item label="审核意见">
						<el-input
						  type="textarea"
						  placeholder="请输入审核意见"
						  v-model="form.opinion">
						</el-input>
					</el-form-item>
					<el-form-item label="上传文件">
						<el-upload
						  class="upload-demo"
						  drag
						  action="https://jsonplaceholder.typicode.com/posts/"
						  multiple>
						  <i class="el-icon-upload"></i>
						  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
					<el-form-item>
					  <el-button type="primary">保存</el-button>
					  <el-button>取消</el-button>
					</el-form-item>
		  	</el-form>
	  	</el-col>
	  	<el-col :span="6" style="padding-left: 40px;">
				<h3 style="margin-top: 0;">提案流程</h3>
				<el-steps :space="100" direction="vertical" :active="1" finish-status="success">
				  <el-step title="发明人提案"></el-step>
				  <el-step title="部门经理审核"></el-step>
				  <el-step title="IPR审核"></el-step>
				  <el-step title="委案"></el-step>
				</el-steps>
	  	</el-col>
  	</el-row>
  </div>
</template>

<script>
export default {
  name: 'checkProposal',
  created () {
  	const d = this;
  	d.fetchData();
  },
  methods: {
  	fetchData() {
  		const d = this;
  		console.log("请求数据" + d.$route.query.id);
  	}
  },
  data () {
    return {
      form: {
      	result: null,
      	opinion: null,
      	filders: null
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
