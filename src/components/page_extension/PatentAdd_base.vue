<template>
  <app-collapse col-title="基本信息">
		<el-form label-width="80px">
			<el-form-item label="案件标题">
				<el-input v-model="form.title" placeholder="请填写案件标题"></el-input>
			</el-form-item>
			<el-form-item label="案件摘要">
				<el-input v-model="form.abstract" type="textarea"></el-input>
			</el-form-item>
	    <el-form-item label="相关提案">
	      <proposal v-model="form.proposals" multiple></proposal>
	    </el-form-item>
	    <el-form-item label="申请地区">
	    	<area v-model="form.area" multiple></area>
	    </el-form-item>
	    <el-form-item label="案件类型">
	      <el-select v-model="form.type" placeholder="请选择案件类型">
					<el-option v-for="item in option.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item label="额外要求">
	    	<el-checkbox-group v-model="extension" v-if="extensionSet.length != 0">
			    <el-checkbox 
			    	v-for="item in extensionSet" 
			    	:key="item.label"
			    	:label="item.label"
			    >{{ item.text }}</el-checkbox>
			  </el-checkbox-group>
			  <span v-else>暂无可选项</span>
	    </el-form-item>
	    <el-form-item label="备注">
	      <el-input v-model="form.remark" type="textarea"></el-input>
	    </el-form-item>
	    <el-form-item label="附件">
	    	<upload v-model="form.attachments"></upload>
	    </el-form-item>
	  </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Area from '@/components/form/Area'
import Proposal from '@/components/form/proposal'
import Upload from '@/components/form/upload'

const extensionHash = [
	{ text: '是否同时申请实用新型', label: 'is_utility', area: 'CN', type: 1 },
	{ text: '是否请求提前公开', label: 'is_utility', area: 'CN', type: 1 },
	{ text: '是否同时提出实审请求', label: 'is_utility', area: 'CN', type: 1 },
	{ text: '是否同时提出保密审查请求', label: 'is_utility', area: 'CN', type: [1,2] },
] 

export default {
  name: 'patentAddBase',
  data () {
		return {
		  form: {
		  	title: '',
		  	abstract: '',
		  	proposals: [],
		  	area: [],
		  	type: '',
		  	extension: [],
		  	remark: '',
		  	attachments: [],
		  },
		  option: {
		  	type: [
		  		{ label: '发明专利', value: 1 }, 
		  		{ label: '实用新型', value: 2 }, 
		  		{ label: '外观设计', value: 3 }, 
		  	]
		  },
		}
  },
  computed: {
  	extensionSet () {
  		const area = this.form.area.join(',');
  		const type = this.form.type;
  		const arr = [];
  		extensionHash.forEach(d=>{
  			const areaReg = new RegExp(d.area);
  			const typeArr = typeof d.type == 'object' ? d.type : [d.type];
  			if ( areaReg.test(area) ) {
  				for (let t of typeArr) {
  					if(t == type) {
  						arr.push({ text: d.text, label: d.label });
  						break;
  					}
  				}
  			}
  		})
  		return arr;
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
  components: { AppCollapse, Area, Proposal, Upload }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>