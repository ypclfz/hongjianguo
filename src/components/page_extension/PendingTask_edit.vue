<template>
  
  	<el-form label-width="100px" :model="form" ref="form">
      <el-form-item label="关联案件" prop="project_id">
        <project v-model="form.project_id"></project>
      </el-form-item>
      <el-form-item label="任务流程类型" prop="task_def_id">
        <el-select v-model="form.task_def_id">
          <el-option>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务起始阶段" prop="flow_node_id">
        <el-select v-model="form.flow_node_id">
          <el-option>
          </el-option>
        </el-select>
      </el-form-item>

  		<el-form-item label="承办人" prop="person_in_charge">
  			<member v-model="form.person_in_charge"></member>
  		</el-form-item>
      		  
  		<el-form-item label="承办期限" prop="due_time">
  			<el-date-picker type="date" v-model="form.due_time" placeholder="请选择承办期限"></el-date-picker>
  		</el-form-item>
      <el-form-item label="法限" prop="deadline">
        <el-date-picker type="date" v-model="form.deadline" placeholder="请选择法限"></el-date-picker>
      </el-form-item>
  		<el-form-item label="备注" prop="remark">
  			<el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
  		</el-form-item>
      <el-form-item label="附件" prop="attachments">
        <upload v-model="form.attachments"></upload>
      </el-form-item>
  		<el-form-item>
        <el-button type="primary" @click="add" v-if="type == 'add'">新建</el-button>
  			<el-button type="primary" @click="edit" v-if="type == 'edit'">编辑</el-button>
  		</el-form-item>
  	</el-form>
  
</template>

<script>
import Member from '@/components/form/Member'
import Upload from '@/components/form/Upload'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/tasks';

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'type', 'row' ],
  methods: {
    add () {
      const url = URL;
      const data = this.$tool.shallowCopy(this.form);
      const success = _=>{ this.$emit('addSuccess') };

      this.axiosPost({url, data, success});  
    },
    edit () {
      const url = `${URL}/${this.row.id}`;
      const data = this.$tool.shallowCopy(this.form);
      const success = _=>{ this.$emit('editSuccess') };
      
      this.axiosPut({url, data, success});
    }
  },
  data () {
  	return {
  	  form: {
        project_id: '',
        task_def_id: '',
        flow_node_id: '',
        person_in_charge: '',
        due_time: '',
        deadline: '',
        remark: '',
        attachments: [],
      }
  	}
  },
  computed: {

  },
  components: { Member, Upload }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>