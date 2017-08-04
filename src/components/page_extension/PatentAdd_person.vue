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
<!--       	<el-form-item label="项目分类">
      		<el-input v-model="form.project_id"></el-input>
      	</el-form-item> -->
      	<el-form-item label="产品分类">
      		<product v-model="form.products" multiple></product>
      	</el-form-item>
      	<el-form-item label="技术分类">
					<classification v-model="form.classification_id"></classification>
      	</el-form-item>        
        <el-form-item label="标签">
        	<tag v-model="form.tags" multiple></tag>
        </el-form-item>
        </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Applicant from '@/components/form/Applicant'
import Inventors from '@/components/form/Inventors'
import Ipr from '@/components/form/Ipr'
import Product from '@/components/form/Product'
import Classification from '@/components/form/Classification'
import Tag from '@/components/form/Tag'

export default {
  name: 'patentAddPerson',
  data () {
		return {
			form: {
			  ipr_id: '',
			  applicants: [],
			  inventors: [
          {id: '', share: ''}
        ],
			  project_id: '',
			  products: [],
			  classification_id: '',
			  tags: [],
			},
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
  components: { AppCollapse, Inventors, Ipr, Product, Classification, Tag, Applicant }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>