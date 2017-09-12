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
import Ipr from '@/components/form/Ipr'
import Applicant from '@/components/form/Applicant'
import Inventors from '@/components/form/Inventors'
import Member from '@/components/form/Member'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'

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
			},
      ipr_name: '',
      inventor_rule: { 
          type: 'array',
          trigger: 'blur',
          validator: (a,b,c)=>{ 
            let msg = '';
            let number = 0;
            const reg = /^[1-9][0-9]*$/;
            if(b.length == 0) {
              msg = 'success';
            }else {
              for(let d of b) {
                if( !d.id || !d.share ) {
                  msg = '请完整填写发明人字段';
                  break;
                }
              }  
            }
            

            if( !msg ) {
              for(let d of b) {
                let n;
                let flag = !!( reg.test(d.share) && (n = Number.parseInt(d.share)) && n >= 10 && n <= 100 && (number += n) );
                if( !flag ) { 
                  msg = '贡献率应为10-100的数字';
                  break;
                }
              }
            }

            if( !msg ) {
              if(number !== 100) {
                msg = '各发明人的贡献率之和应为100';
              }
            }

            if( !msg ) {
              if(b.length > 1) {
                const arr = b.map(_=>_.id);
                const set = new Set(arr);
                if(arr.length != set.size) {
                  msg = '请不要选择重复的发明人';
                }
              }
            }

            if(msg && msg !== 'success') {
              c(msg);              
            }else {
              c();
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
      if(this.type == 'add') this.form.id = user.id;
      return this.form;
    },
    checkForm () {
      let flag = false;
      this.$refs.form.validate(_=>{flag = !_});
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
  components: { AppCollapse, Inventors, Ipr, Applicant, Member, Branch, StaticSelect, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>