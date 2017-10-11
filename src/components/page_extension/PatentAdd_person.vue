<template>
  <app-collapse col-title="人员信息">
      <el-form label-width="120px" :model="form" ref="form">
        <el-form-item label="部门">
          <branch v-model="form.branch"></branch>
        </el-form-item>
      	<el-form-item label="IPR">
          <span class="form-item-text" v-if="type == 'add'">{{ user ? user.name : '暂未取得当前用户信息' }}</span>
          <static-select type="ipr" v-model="form.ipr" v-else></static-select>
      	</el-form-item>
      	<el-form-item label="申请人">
          <remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
      	</el-form-item >
      	<el-form-item label="发明人" prop="inventors" :rules="inventor_rule">
					<inventors v-model="form.inventors"></inventors>
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
import Applicant from '@/components/form/Applicant'
import Inventors from '@/components/form/Inventors'
import Member from '@/components/form/Member'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import { checkInventors } from '@/const/validator.js'

export default {
  name: 'patentAddPerson',
  props: ['type'],
  data () {
		return {
			form: {
        branch: '',
			  ipr: '',
			  applicants: [],
			  inventors: [],
        proposer: '',
        checkClick: false, //区分手动调用validate的标识符
			},
      ipr_name: '',
      inventor_rule: { 
          type: 'array',
          trigger: 'change',
          validator: (a,b,c)=>{
            if(this.checkClick) {
              checkInventors(a, b, c, false);
            }else {
              this.$nextTick(_=>{
                checkInventors(a, this.form.inventors, c, false);
              })  
            }       
          },
        },
		}
  },
  methods: {
    handleInventor (val) {
      this.form.inventors = val;
      this.$refs.form.validateField('inventors');
    },
  	setForm (data) {
      for(let k in this.form) {
        if( k == 'branch' ) {
          this.form[k] = data[k] ? data[k]['id'] : "";
        }else if( k == 'ipr' ) {
          this.form.ipr = data[k]['id'];
          this.ipr_name = data[k]['name'];
        }else {
          this.form[k] = data[k];
        }
      }
  	},
    submitForm () {
      if(this.type == 'add') this.form.ipr = this.user.id;
      return this.form;
    },
    checkForm () {
      
      let flag = false;
      
      this.checkClick = true;//因为代码结构的关系, 避免异步检测

      this.$refs.form.validate(_=>{
        flag = !_;
        this.checkClick = false;
      });

      return flag;
    },
  	addInventor () {
  		this.form.inventor.push({ inventor: '', percent: '' });
  	},
  	deleteInventor (index) {
  		this.form.inventor.splice( index, 1 );
  	},
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    }
  },
  components: { AppCollapse, Inventors, Applicant, Member, Branch, StaticSelect, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>