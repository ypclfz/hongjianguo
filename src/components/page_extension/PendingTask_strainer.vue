<template>
  <el-form label-width="100px" :model="form" ref="form">   
  	<el-form-item label="指定完成时间" prop="due_time">
  		<date-area v-model="form.due_time"></date-area>
  	</el-form-item>
  	<el-form-item label="法定期限" prop="deadline">
  		<date-area v-model="form.deadline"></date-area>
  	</el-form-item>
  	<el-form-item label="完成时间" prop="end_time">
  		<date-area v-model="form.end_time"></date-area>
  	</el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="案件类型" prop="project_type">
          <el-select v-model="form.project_type">
            <el-option
              v-for="item in options.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理机构" prop="project_agency">
          <agency v-model="form.agency"></agency>
        </el-form-item>
        <el-form-item label="任务节点" prop="task_def_id">
          <task-def v-model="form.task_def_id"></task-def>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="IPR" prop="project_ipr">
          <ipr v-model="form.project_ipr"></ipr>
        </el-form-item>
        <el-form-item label="代理人" prop="project_agent">
          <agent v-model="form.project_agent"></agent>
        </el-form-item>
        <el-form-item label="任务处理人" prop="person_in_charge">
          <member v-model="form.person_in_charge"></member>
        </el-form-item>
      </el-col>
    </el-row>
  	<el-row style="text-align: center">
      <el-button type="info" size="small" @click="query">查询</el-button>
      <el-button type="danger" size="small" @click="clear" style="margin-left: 20px">清空</el-button>
    </el-row>
  </el-form>
</template>

<script>
import Agency from '@/components/form/Agency'
import TaskDef from '@/components/form/TaskDef'
import Agent from '@/components/form/Agent'
import Ipr from '@/components/form/Ipr'
import Member from '@/components/form/Member'
import DateArea from '@/components/form/DateArea'

export default {
  name: 'pendingTaskStrainer',
  data () {
		return {
		  form: {
		  	'project_type': '',
		  	'project_ipr': '',
    		'project_agency': '',
				'project_agent': '',
				'task_def_id': '',
				'person_in_charge': '',
		  	'due_time': [],
		  	'deadline': [],
		  	'end_time': [],
		  },
		  options: {
		  	'project_type': [
		  		{label: '专利', value: 1},
		  		{label: '商标', value: 2},
		  		{label: '版本', value: 3},
		  		{label: '项目', value: 4},
		  	]
		  }
		}
  },
  methods: {
  	query () {
  		const copy = this.$tool.deepCopy(this.form);
  		this.$emit('query', copy);
  	},
  	clear () {
  		this.$refs.form.resetFields();
  		this.$emit('clear');
  	}
  },
  components: { Agency, TaskDef, Ipr, Agent, Member, DateArea }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>