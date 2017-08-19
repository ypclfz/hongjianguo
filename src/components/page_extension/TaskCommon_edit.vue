<template>  
	<el-form label-width="80px" :model="form" ref="form">
    <el-form-item label="关联案件" prop="project_id" v-if="type == 'add'">
      <project v-model="form.project_id"></project>
    </el-form-item>
    <el-form-item label="任务流程" prop="flow_node_id" v-if="type == 'add'">
      <el-select v-model="form.flow_node_id" placeholder="请选择任务流程">
        <el-option
          v-for="item in flowOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务类型" prop="task_def_id" v-if="type == 'add'">
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

		<el-form-item label="承办人" prop="person_in_charge">
			<member v-model="form.person_in_charge"></member>
		</el-form-item>
    <el-row> 
      <el-col :span="12">
        <el-form-item label="法限" prop="deadline">
          <el-date-picker type="date" v-model="form.deadline" placeholder="请选择法限"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12"> 
        <el-form-item label="承办期限" prop="due_time">
          <el-date-picker type="date" v-model="form.due_time" placeholder="请选择承办期限"></el-date-picker>
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
      <el-button type="primary" @click="add" v-if="type == 'add'">新增</el-button>
			<el-button type="primary" @click="edit" v-if="type == 'edit'">编辑</el-button>
		</el-form-item>
	</el-form>  
</template>

<script>
import Member from '@/components/form/Member'
import Upload from '@/components/form/Upload'
import AxiosMixins from '@/mixins/axios-mixins'
import Project from '@/components/form/Project'

const URL = '/api/tasks';

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'type', 'row' ],
  methods: {
    add () {
      const url = URL;
      const data = this.$tool.shallowCopy(this.form, {'date': true});
      const success = _=>{ this.$emit('addSuccess') };

      this.axiosPost({url, data, success});  
    },
    edit () {
      const url = `${URL}/${this.row.id}`;
      const data = this.$tool.shallowCopy(this.form, {'date': true});
      const success = _=>{ this.$emit('editSuccess') };
      
      this.axiosPut({url, data, success});
    },
    // handleProductChange (d) {
    //   this.category = d.category;
    // }
  },
  data () {
  	return {
  	  form: {
        project_id: '',
        flow_node_id: '',
        task_def_id: '',
        person_in_charge: '',
        due_time: '',
        deadline: '',
        remark: '',
        attachments: [],
      },
      attachments: [],
      category: '',
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
      if( !this.flowsData[c] ) {
        return [];
      }else {
        return this.flowsData[c]['flows'].map(_=>{
          return {label: _.name, value: _.id};
        })  
      }     
    },
    defOptions () {
      const f = this.form.flow_node_id;
      const arr = [];

      this.taskDefsData.forEach(_=>{
        if(_.flow_id == f) arr.push({label: _.label, value: _.value});
      });

      return arr;
    }
  },
  watch: {
    'form.project_id': {
      handler (val) {
        this.axiosGet({
          url: '/api/projects',
          data: {
            keyword: '',
            listOnly: '1',
          },
          success: _=>{
            const arr = _.projects;
            for(let d of arr) {
              if(d.value == val) {
                this.category = d.category;
              }
            }
          }
        })
      }
    }
  },
  mounted () {
    if(this.type == 'edit') {

      for( let k in this.form) {
        const d = this.row[k];
        
        if(k == 'attachments') {
          this.form[k] = d.map(_=>_.id);
          this.attachments = d;
        }else {
          this.form[k] = d;
        }
      }
    }
  },
  components: { Member, Upload, Project }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>