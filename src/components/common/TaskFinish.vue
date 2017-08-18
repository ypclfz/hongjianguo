<template>
  <el-form :model="form" label-width="80px" ref="form" v-loading="loading" element-loading-text="数据加载中">
  	<el-form-item label="下一阶段">
  		<el-select v-model="next">
  		 <el-option
				v-for="item in data.next"
				:key="item.id"
				:label="item.name"
				:value="item.id"
  		 >
  		 </el-option>
  		</el-select>
  	</el-form-item>
  	<el-form-item prop="person_in_charge" label="承办人" v-if="fields.person_in_charge">
  		<member v-model="form.person_in_charge" v-if="defaultVal =='proposer' || defaultVal == 'reviewer' || defaultVal == 'previous' "></member>
  		<agent v-model="form.person_in_charge" v-else-if="defaultVal == 'agent'"></agent>
  		<ipr v-model="form.person_in_charge" v-else-if="defaultVal == 'ipr'"></ipr>
  		<!-- <span v-else>{{ data[defaultVal]['name'] }}</span> -->
  	</el-form-item>
  	<el-form-item prop="agent" label="代理人" v-if="fields.agent">
			<agent v-model="form.agent"></agent>
  	</el-form-item>
  	<el-form-item prop="agency" label="代理机构" v-if="fields.agency">
  		<agency v-model="form.agency"></agency>
  	</el-form-item>
  	<el-form-item prop="due_time" label="承办期限" v-if="fields.due_time">
			<el-date-picker v-model="form.due_time" type="date" placeholder="选择承办期限"></el-date-picker>
  	</el-form-item>
  	<el-form-item prop="dealine" label="法限" v-if="fields.deadline">
			<el-date-picker v-model="form.dealine" type="date" placeholder="选择法限"></el-date-picker>
  	</el-form-item>
  	<el-form-item prop="remark" label="任务备注" v-if="fields.remark">
			<el-input type="textarea" v-model="form.remark"></el-input>
  	</el-form-item>
  	<el-form-item prop="attachments" label="附件" v-if="fields.attachments">
			<upload v-model="form.attachments"></upload>
  	</el-form-item>
  	<el-form-item style="margin-bottom: 0px;">
  		<el-button type="primary" @click="submitFunc">提交</el-button>
  	</el-form-item>
  </el-form>
</template>

<script>
import axiosMixins from '@/mixins/axios-mixins'
import Member from '@/components/form/Member'
import Agent from '@/components/form/Agent'
import Agency from '@/components/form/Agency'
import Ipr from '@/components/form/Ipr'
import Upload from '@/components/form/Upload'

const URL = `/api/tasks`;

export default {
  name: 'taskFinish',
  props: ['id'],
  mixins: [axiosMixins],
  data () {
		return {
			'data': {},
			'next': '',
			'form': {
				person_in_charge: '',
				agency: '',
				agent: '',
				due_time: '',
				deadline: '',
				remark: '',
				attachments: [],
			},
			'defaultVal': '',
			'fields': {},
      'loading': false,
		}
  },
	created () {
		this.refreshData(); 
	},
	methods: {
  	refreshData () {
      this.loading = true; 
  		const url = `${URL}/${this.id}/form`;
  		const success = d=>{
  			this.data = d.data;
  			this.next = d.data.next[0].id;
        this.loading = false;
  		};
      const complete = _=>{ 
        this.loading = false; 
      }
  		this.axiosGet({url, success, complete});
  	},
  	submitFunc () {
  		const url = `${URL}/${this.id}/nexttask`;
  		const data = Object.assign({}, {'flow_node_id': this.next}, this.form);
  		const success = ()=>{this.$emit('submitSuccess')}; 
  		this.axiosPost({url, data, success});
  	},
  	cancel () {
  		this.$emit('cancel')
  	},
  	clear () {
  		this.$refs.form.resetFields();
  	}
	},
	watch: {
		id () {
			this.refreshData();
			this.clear();
		},
		'next': {
			handler: function (val) {
				for (let d of this.data.next) {
					if(d.id == val) {
						this.fields = d.fields;
						this.defaultVal = d.default;
						this.form.person_in_charge = this.data[d.default]['id'];
						break;
					}
				}
				this.$refs.form.resetFields();
			}
		}
	},
	computed () {
	},
	components: { Member, Agent, Agency, Ipr, Upload }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
