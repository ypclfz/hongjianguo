<template>
<app-collapse col-title="任务筛选" default-close>
  <el-form label-width="100px" :model="form" ref="form">   

    <el-row>
      <el-col :span="12">
        <el-form-item label="指定期限" prop="due_time">
          <el-date-picker type="daterange" placeholder="请选择指定期限" v-model="form.due_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="法定期限" prop="deadline">
          <el-date-picker type="daterange" placeholder="请选择法定期限" v-model="form.deadline"></el-date-picker>
        </el-form-item>
        <el-form-item label="案件类型" prop="category">
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
          <remote-select type="agency" v-model="form.agency"></remote-select>
        </el-form-item>
        <el-form-item label="流程节点" prop="flow_node_id">
          <static-select type="flow_node" v-model="form.flow_node_id"></static-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="完成时间" prop="end_time">
          <el-date-picker type="daterange" placeholder="请选择完成时间" v-model="form.end_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="IPR" prop="ipr">
          <ipr type="ipr" v-model="form.ipr"></ipr>
        </el-form-item>
        <el-form-item label="代理人" prop="agent">
          <remote-select type="agent" v-model="form.agent"></remote-select>
        </el-form-item>
        <el-form-item label="承办人" prop="person_in_charge">
          <remote-select type="member" v-model="form.person_in_charge"></remote-select>
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
import Agent from '@/components/form/Agent'
import Ipr from '@/components/form/StaticSelect'
import Member from '@/components/form/Member'
import DateArea from '@/components/form/DateArea'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'pendingTaskStrainer',
  data () {
		return {
		  form: {
		  	'category': '',
		  	'ipr': '',
    		'agency': '',
				'agent': '',
				'flow_node_id': '',
				'person_in_charge': '',
		  	'due_time': [],
		  	'deadline': [],
		  	'end_time': [],
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
      const copy = {};
  		for(let k in this.form) {
        const d = this.form[k]
        if(d instanceof Array) {
          if(d[0]) {
            copy[k] = d.map(_=>this.$tool.getDate(_)).join(",");  
          }
        }else {
          if(d !== '') {
            copy[k] = d;  
          }
        }
      }
  		this.$emit('query', copy);
  	},
  	clear () {
  		this.$refs.form.resetFields();
  		this.$emit('clear');
  	}
  },
  components: { Agency, Ipr, Agent, Member, DateArea, AppCollapse, RemoteSelect, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>