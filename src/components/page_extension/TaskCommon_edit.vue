<template>  
	<el-form label-width="100px" :model="form" ref="form">
    <el-form-item label="关联案件" prop="project_id" v-if="type == 'add'">
      <remote-select type="project" v-model="form.project_id" ref="project"></remote-select>
    </el-form-item>
    <el-form-item label="任务流程" prop="flow_id" v-if="type == 'add' && category != ''">
      <el-select v-model="form.flow_id" placeholder="请选择任务流程">
        <el-option
          v-for="item in flowOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务类型" prop="task_def_id" v-if="type == 'add' && category != ''">
      <el-select v-model="form.task_def_id" placeholder="请选择任务类型">
        <el-option
          v-for="item in defOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>

		<el-form-item label="承办人" prop="person_in_charge" v-if="type == 'add' && category != ''">
      <remote-select type="member" v-model="form.person_in_charge"></remote-select>
		</el-form-item>
    <el-row> 
      <el-col :span="12"> 
        <el-form-item label="承办期限" prop="due_time">
          <el-date-picker type="date" v-model="form.due_time" placeholder="请选择承办期限"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="法限" prop="deadline">
          <el-date-picker type="date" v-model="form.deadline" placeholder="请选择法限"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
		<el-form-item label="备注" prop="remark">
			<el-input type="textarea" placeholder="请填写备注" v-model="form.remark" :rows="1"></el-input>
		</el-form-item>
    <el-form-item label="附件" prop="attachments">
      <upload v-model="form.attachments" :file-list="attachments"></upload>
    </el-form-item>
		<el-form-item style="margin-bottom: 0;">
      <el-button type="primary" @click="add" v-if="type == 'add'" :disabled="btn_disabled">新增</el-button>
			<el-button type="primary" @click="edit" v-if="type == 'edit'" :disabled="btn_disabled">保存</el-button>
		</el-form-item>
	</el-form>  
</template>

<script>
import Member from '@/components/form/Member'
import Upload from '@/components/form/Upload'
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'

const URL = '/api/tasks';

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'type', 'row' ],
  methods: {
    add () {
      const url = URL;
      const data = this.$tool.shallowCopy(this.form, {'date': true});
      const success = _=>{ 
        // this.dialogVisible  = false;
        this.$emit('addSuccess');
      };
      const complete = _=>{ this.btn_disabled = false };

      this.btn_disabled = true;
      this.axiosPost({url, data, success, complete});  
    },
    edit () {
      const url = `${URL}/${this.row.id}`;
      const data = this.$tool.shallowCopy(this.form, {'date': true, 'skip': ['project_id', 'flow_id', 'task_def_id']});
      data.person_in_charge = data.person_in_charge.id;
      const success = _=>{ this.$emit('editSuccess') };
      const complete = _=>{ this.btn_disabled = false };
      
      this.btn_disabled = true;
      this.axiosPut({url, data, success, complete });
    },
    clear () {
      this.$refs.form.resetFields();
    },
    refreshRow () {
      if(this.type == 'edit') {
        
        for( let k in this.form) {
          const d = this.row[k];
          
          if(k == 'attachments') {
            this.form[k] = d.map(_=>_.id);
            this.attachments = d;
          }else if(k == 'person_in_charge') {
            this.form[k] = {id: d, name: this.row['person_in_charge_name']};
            console.log(this.form[k]);
          }else {
            if(d) {
              this.form[k] = d;  
            }else {
              this.form[k] = "";
            }
          }
        }
      }
    }
    // handleProductChange (d) {
    //   this.category = d.category;
    // }
  },
  data () {
  	return {
  	  form: {
        project_id: '',
        flow_id: '',
        task_def_id: '',
        person_in_charge: '',
        due_time: '',
        deadline: '',
        remark: '',
        attachments: [],
      },
      attachments: [],
      category: '',
      btn_disabled: false,
  	}
  },
  computed: {
    flowsData () {
      return this.$store.getters.flowsData;
    },
    taskDefsData () {
      return this.$store.getters.taskDefsData;
    },
    flowOptions () {
      const c = this.category;
      this.form.flow_id = '';
      if( !this.flowsData[c] ) {
        return [];
      }else {
        return this.flowsData[c]['flows'].map(_=>{
          return {label: _.name, value: _.id};
        })  
      }     
    },
    defOptions () {
      const f = this.form.flow_id;
      this.form.task_def_id = '';
      const arr = [];

      this.taskDefsData.forEach(_=>{
        if(_.flow_id == f) arr.push({label: _.label, value: _.value});
      });

      return arr;
    }
  },
  watch: {
    'form.project_id': {
      handler () {
        if(this.type == 'add') {
          this.$nextTick(_=>{
            const select = this.$refs.project.getSelected()[0];
            this.category = select ? select['category'] : '';  
          })
        }
      }
    },
    'row.id': {
      handler () {
        this.refreshRow();
      }
    }
  },
  mounted () {
    this.refreshRow();
  },
  components: { Member, Upload, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>