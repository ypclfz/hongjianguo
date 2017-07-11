<template>
  <app-collapse col-title="基本信息">
		<el-form label-width="80px">
			<el-form-item label="案件标题">
				<el-input v-model="form.title" placeholder="请填写案件标题"></el-input>
			</el-form-item>
	    <el-form-item label="案件类型">
	      <el-select v-model="form.type" placeholder="请选择案件类型">
					<el-option v-for="item in option.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="申请地区">
	      <el-select v-model="form.area" placeholder="请选择案件类型" multiple>
					<el-option v-for="item in option.area" :key="item.value" :label="item.label" :value="item.value"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="案号">
	      <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
	    </el-form-item>
	    <el-form-item label="所属项目">
	      <el-select v-model="form.project" placeholder="请选择所属项目">
					<el-option v-for="item in option.project" :key="item.value" :label="item.label" :value="item.value"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="附件">
	    	<el-upload
	        class="upload-demo"
          drag
          :on-success="handleUploadSuccess"
          :on-remove="handleUploadRemove"
	        action="http://www.zhiq.wang/file/upload"
	        multiple
        >
			    <i class="el-icon-upload"></i>
			    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		    </el-upload>
	    </el-form-item>
	    <el-form-item label="备注">
	      <el-input type="textarea" v-model="form.remark"></el-input>
	    </el-form-item>
	  </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'

export default {
  name: 'patentAddBase',
  data () {
		return {
		  form: {
		  	title: '',
		  	type: '',
		  	area: [],
		  	serial: '',
		  	project: '',
		  	attachments: [],
		  	remark: '',
		  },
		  option: {
		  	type: [
		  		{ label: 'inventor', value: '1' }, 
		  		{ label: 'utility', value: '2' }, 
		  		{ label: 'design', value: '3' }, 
		  	],
		  	area: [
		  		{ label: '中国', value: 'CN' },
		  		{ label: '美国', value: 'US' },
		  	],
		  	project: [
		  		{ label: '项目一', value: '1' },
		  		{ label: '项目二', value: '2' },
		  		{ label: '项目三', value: '3' },
		  	]
		  },
		}
  },
  methods: {
  	checkForm () {

  	},
  	setForm (data) {
  		this.$tool.coverObj(this.form, data);
  	},
  	handleUploadSuccess () {

  	},
  	handleUploadRemove () {

  	}
  },
  components: { AppCollapse }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>