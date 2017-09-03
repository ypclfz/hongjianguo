<template>
<app-collapse col-title="任务筛选" default-close>
  <el-form label-width="100px" :model="form" ref="form">   
  	<el-form-item label="指定期限" prop="due_time">
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
        <el-form-item label="案件类型" prop="categoey">
          <el-select v-model="form.category">
            <el-option
              v-for="item in options.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理机构" prop="agency">
          <agency v-model="form.agency"></agency>
        </el-form-item>
        <el-form-item label="流程节点" prop="task_def_id">
          <flow-nodes v-model="form.task_def_id"></flow-nodes>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="IPR" prop="ipr">
          <ipr v-model="form.ipr"></ipr>
        </el-form-item>
        <el-form-item label="代理人" prop="agent">
          <agent v-model="form.agent"></agent>
        </el-form-item>
        <el-form-item label="承办人" prop="person_in_charge">
          <member v-model="form.person_in_charge"></member>
        </el-form-item>
      </el-col>
    </el-row>
  	<el-row style="text-align: center">
      <el-button type="info" size="small" @click="query">查询</el-button>
      <el-button type="danger" size="small" @click="clear" style="margin-left: 20px">清空</el-button>
    </el-row>
  </el-form>
</app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Agency from '@/components/form/Agency'
import FlowNodes from '@/components/form/FlowNodes'
import Agent from '@/components/form/Agent'
import Ipr from '@/components/form/Ipr'
import Member from '@/components/form/Member'
import DateArea from '@/components/form/DateArea'

export default {
  name: 'pendingTaskStrainer',
  data () {
		return {
		  form: {
		  	'category': '',
		  	'ipr': '',
    		'agency': '',
				'agent': '',
				'task_def_id': '',
				'person_in_charge': '',
		  	'due_time': ['',''],
		  	'deadline': ['',''],
		  	'end_time': ['',''],
		  },
		  options: {
		  	'project_type': [
		  		{label: '提案', value: 0},
          {label: '专利', value: 1},
		  		{label: '版权', value: 3},
		  		// {label: '项目', value: 4},
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
  components: { Agency, FlowNodes, Ipr, Agent, Member, DateArea, AppCollapse }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>