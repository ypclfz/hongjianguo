<template>
  <app-collapse col-title="人员与分类">
      <el-form label-width="80px">
      	<el-form-item label="IPR">
      		<ipr v-model="form.ipr_id"></ipr>
      	</el-form-item>
      	<el-form-item label="申请人">
					<applicant v-model="form.applicants" multiple></applicant>
      	</el-form-item >
      	<el-form-item label="发明人">
					<inventors v-model="form.inventors" multiple></inventors>
      	</el-form-item>
      	<el-form-item label="项目分类">
      		<project v-model="form.project_id"></project>
      	</el-form-item>
      	<el-form-item label="产品分类">
      		<product v-model="form.products" multiple></product>
      	</el-form-item>
      	<el-form-item label="技术分类">
					<classification v-model="form.classification"></classification>
      	</el-form-item>        
        <el-form-item label="标签">
        	<tag v-model="form.tags" multiple></tag>
        </el-form-item>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Inventors from '@/components/form/Inventors'

export default {
  name: 'patentAddPerson',
  data () {
		return {
			form: {
			  department: '',
			  tag: [],
			  class: '',
			  applicant: [],
			  inventor: [ {inventor: '', percent: ''} ],
			  proposer: [],
			  ipr: '',
			},
			option: {
				department: [
					{ label: '部门一', value: '1' },
					{ label: '部门二', value: '2' },
					{ label: '部门三', value: '3' },
				],
				tag: ['标签一', '标签二', '标签三'],
				class: [
					{ label: '类别一', value: '1' },
					{ label: '类别二', value: '2' },
					{ label: '类别三', value: '3' },
				],
				applicant: [
					{ label: '申请人一', value: '1' },
					{ label: '申请人二', value: '2' },
					{ label: '申请人三', value: '3' },
				],
				inventor: [
					{ label: '发明人一', value: '1' },
					{ label: '发明人二', value: '2' },
					{ label: '发明人三', value: '3' },
				],
				proposer: [
					{ label: '提案人一', value: '1' },
					{ label: '提案人二', value: '2' },
					{ label: '提案人三', value: '3' },
				],
				ipr: [
					{ label: 'IPR一', value: '1' },
					{ label: 'IPR二', value: '2' },
					{ label: 'IPR三', value: '3' },
				],
			}
		}
  },
  methods: {
  	setForm (data) {
  		this.$tool.coverObj(this.form, data);
  	},
  	addInventor () {
  		this.form.inventor.push({ inventor: '', percent: '' });
  	},
  	deleteInventor (index) {
  		this.form.inventor.splice( index, 1 );
  	}
  },
  components: { AppCollapse, Inventors }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>