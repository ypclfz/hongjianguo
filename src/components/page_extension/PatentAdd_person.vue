<template>
  <app-collapse col-title="人员信息">
      <el-form label-width="120px">
        <el-form-item label="部门">
          <branch v-model="form.branch"></branch>
        </el-form-item>
      	<el-form-item label="IPR">
      		<ipr v-model="form.ipr_id"></ipr>
      	</el-form-item>
      	<el-form-item label="申请人">
					<applicant v-model="form.applicants" multiple></applicant>
      	</el-form-item >
      	<el-form-item label="发明人">
					<inventors v-model="form.inventors" multiple></inventors>
      	</el-form-item>
        <el-form-item label="提案人">
          <member v-model="form.proposer"></member>
        </el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Branch from '@/components/form/Branch'
import Ipr from '@/components/form/Ipr'
import Applicant from '@/components/form/Applicant'
import Inventors from '@/components/form/Inventors'
import Member from '@/components/form/Member'

export default {
  name: 'patentAddPerson',
  data () {
		return {
			form: {
        branch: '',
			  ipr_id: '',
			  applicants: [],
			  inventors: [
          {id: '', share: ''}
        ],
        proposer: '',
			},
		}
  },
  methods: {
  	setForm (data) {
      for(let k in this.form) {
        if(k == 'ipr_id') {
          this.form[k] = data.ipr.id;
        }else if(k == 'applicants') {
          this.form[k] = data[k].map(_=>_.id);
        }else {
          this.form[k] = data[k];
        }
      }
  	},
  	addInventor () {
  		this.form.inventor.push({ inventor: '', percent: '' });
  	},
  	deleteInventor (index) {
  		this.form.inventor.splice( index, 1 );
  	}
  },
  components: { AppCollapse, Inventors, Ipr, Applicant, Member, Branch }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>