<template>
  <app-collapse col-title="人员信息">
      <el-form label-width="120px">
        <el-form-item label="部门">
          <branch v-model="form.branch"></branch>
        </el-form-item>
      	<el-form-item label="IPR">
          {{ user.name }}
      	</el-form-item>
      	<el-form-item label="申请人">
          <remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
      	</el-form-item >
      	<el-form-item label="发明人">
					<inventors v-model="form.inventors" multiple></inventors>
      	</el-form-item>
        <el-form-item label="提案人">
          <remote-select type="member" v-model="form.proposer"></remote-select>
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
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'

export default {
  name: 'patentAddPerson',
  data () {
    const ipr = this.$store.getters.getUser.id;
		return {
			form: {
        branch: '',
			  ipr,
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
        if( k == 'branch' || k == 'ipr') {
          this.form[k] = data[k] ? data[k]['id'] : "";
        }else {
          this.form[k] = data[k];
        }
      }
  	},
    submitForm () {
      return this.form;
    },
  	addInventor () {
  		this.form.inventor.push({ inventor: '', percent: '' });
  	},
  	deleteInventor (index) {
  		this.form.inventor.splice( index, 1 );
  	}
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    }
  },
  components: { AppCollapse, Inventors, Ipr, Applicant, Member, Branch, StaticSelect, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>