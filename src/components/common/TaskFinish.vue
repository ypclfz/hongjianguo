<template>
<div>
  
  <el-steps :space="100" :active="0" finish-status="success" style="padding: 5px 40px;">
    <el-step title="步骤 1"></el-step>
    <el-step title="步骤 2"></el-step>
    <el-step title="步骤 3"></el-step>
  </el-steps>
  
  <el-form :model="form" label-width="100px" ref="form" v-loading="loading" style="min-height: 150px;" element-loading-text="数据加载中">
  	<el-form-item :label="data.procedure.label" v-if="data.fields && data.fields.procedure">
      <el-select v-model="next">
        <el-option
          v-for="item in data.procedure.items"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下一节点" v-if="ifNext">
  		<el-select v-model="next" :disabled="data.fields.procedure ? true : false">
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
  		<remote-select type="member" v-model="form.person_in_charge" v-if="defaultVal =='proposer' || defaultVal == 'reviewer' || defaultVal == 'previous' "></remote-select>
  		<remote-select type="agent" v-model="form.person_in_charge" v-else-if="defaultVal == 'agent'"></remote-select>
  		<static-select type="ipr" v-model="form.person_in_charge" v-else-if="defaultVal == 'ipr'"></static-select>
  		<!-- <span v-else>{{ data[defaultVal]['name'] }}</span> -->
  	</el-form-item>
    <el-form-item prop="agency" label="代理机构" v-if="fields.agency" :rules="{ required: true, message: '代理机构不能为空'}">
      <div v-if="fields.agency == 1"><remote-select type="agency" v-model="form.agency"></remote-select><el-button size="mini" type="text" @click="showAgencyLoad">负载</el-button></div>
      <span class="form-item-text">{{ form.agency.name }}</span>
    </el-form-item>
    <el-form-item prop="agency_serial" label="事务所案号" v-if="fields.agency_serial">
      <el-input placeholder="请填写事务所案号" v-model="form.agency_serial"></el-input>
    </el-form-item>
    <el-form-item prop="agent" label="代理人" v-if="fields.agent" v-show="form.agency !== ''">
      <remote-select type="agent" v-model="form.agent" :para="{'agency': form.agency}" ref="agent"></remote-select>
    </el-form-item>
    <el-form-item prop="agency_type" label="代理类型" v-if="fields.agency_type"
      :rules="{ required: true, message: '代理类型不能为空'}"
    >
      <static-select type="agency_type" v-model="form.agency_type"></static-select>
    </el-form-item>
  	<el-form-item prop="due_time" label="承办期限" v-if="fields.due_time">
			<el-date-picker v-model="form.due_time" type="date" placeholder="选择承办期限"></el-date-picker>
  	</el-form-item>
  	<el-form-item prop="dealine" label="法限" v-if="fields.deadline">
			<el-date-picker v-model="form.dealine" type="date" placeholder="选择法限"></el-date-picker>
  	</el-form-item>
    <el-form-item prop="area" label="申请地区" v-if="fields.area" :rules="{type: 'array', required: true, message: '申请地区不能为空'}">
      <static-select type="area" v-model="form.area"  multiple></static-select>
    </el-form-item>
    <el-form-item prop="type" label="专利类型" v-if="fields.type" :rules="{type: 'number', required: true, message: '专利类型不能为空', trigger: 'change'}">
      <static-select type="patent_type" v-model="form.type" ></static-select>
    </el-form-item>
    <el-form-item prop="remark" label="任务备注" v-if="fields.remark && !hide_r_a">
      <el-input type="textarea" v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item prop="attachments" label="附件" v-if="fields.attachments && !hide_r_a">
      <upload v-model="form.attachments" :file-list="attachments">
        <ul v-if="data.description && data.description.length != 0" style="margin: 0; padding: 0;">
          <li v-for="(item, index) in data.description" :key="index">{{ item }}</li>
        </ul>
      </upload>
    </el-form-item>
    <el-form-item prop="rank" label="评分" v-if="fields.rank">
      <el-rate 
        v-model="form.rank" 
        style="margin-top: 10px" 
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']" 
        show-text 
        :texts="['20','40','60','80','100']"
      ></el-rate>
    </el-form-item>
  	<el-form-item style="margin-bottom: 0px;">
  		<el-button type="primary" @click="submitFunc" :disabled="btn_disabled">提交</el-button>
  	</el-form-item>
  </el-form>
</div>
</template>

<script>
import axiosMixins from '@/mixins/axios-mixins'
import Member from '@/components/form/Member'
import Agent from '@/components/form/Agent'
import Agency from '@/components/form/Agency'
import Upload from '@/components/form/Upload'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

import {mapMutations} from 'vuex'

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
        agency_serial: '',
				person_in_charge: '',
				agency: '',
				agent: '',
        agency_type: '',
				due_time: '',
				deadline: '',
				remark: '',
				attachments: [],
        rank: 5,
        area: [],
        type: '',
			},
			'defaultVal': '',
			'fields': {},
      'loading': false,
      'btn_disabled': false,
      'attachments': [],
      'hide_r_a': false,
		}
  },
	created () {
		this.refreshData(); 
	},
	methods: {
    ...mapMutations([
      'showAgencyLoad',
    ]),
  	refreshData () {
      this.loading = true; 
      this.next = "";
  		const url = `${URL}/${this.id}/form`;
  		const success = d=>{
  			this.data = d.data;
        this.fields = d.data.fields;
        if(this.data.next.length != 0) {
          this.next = d.data.next[0].id;
        }else {
          this.next = "";
        }
  		};
      const complete = _=>{ 
        this.loading = false; 
      }
  		this.axiosGet({url, success, complete});
  	},
  	submitFunc () {
      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          const url = `${URL}/${this.id}/nexttask`;
          const data = Object.assign({}, {'flow_node_id': this.next}, this.form);
          if(data.rank) {data.rank *= 20};
          const success = ()=>{ this.$emit('submitSuccess') };
          const complete = _=>{ this.btn_disabled=false }; 
          this.axiosPost({url, data, success, complete}); 
        }else {
          this.$message({message: '请正确填写任务完成字段', type: 'warning'})
        }
      })
  	},
  	cancel () {
  		this.$emit('cancel');
  	},
  	clear () {
  		this.$refs.form.resetFields();
  	},
    proposalFinish ({remark, attachments}) {
      this.form.remark = remark;
      this.form.attachments = attachments.map(_=>_.id);

      this.hide_r_a = true;
    }
	},
	watch: {
		id () {
			this.clear();
      this.refreshData();
		},
		'next': {
			handler: function (val) {
        if(val == "") return;
				for (let d of this.data.next) {
					if(d.id == val) {
						
            this.fields = d.fields;
						this.defaultVal = d.default == 'agent' && !this.data.agent ? 'ipr' : d.default;
            
            if(this.fields.agency) this.form.agency = this.data.agency;
            if(this.fields.agency_type) this.form.agency_type = 1;
            const person_in_charge = this.data[this.defaultVal] ? this.data[this.defaultVal] : '';
        
            this.$nextTick(_=>{
              if(this.fields.agent) this.form.agent = this.data.agent;
              if(this.defaultVal == 'ipr') {
                this.form.person_in_charge = person_in_charge['id'];
              }else {
                this.form.person_in_charge = person_in_charge;
              }
            })
            
						break;
					}
				}
				this.$refs.form.resetFields();
			}
		},
    'form.agency': {
      handler (val) {

        if(val !== '' && !(val instanceof Object)) {
          if(this.$refs.agent) {
            this.$refs.agent.clear();
          }
              
        }else {
          this.form.agent = '';
        }
      }
    }
	},
	computed: {
    ifNext () {
      return this.data.next && this.data.next.length != 0 ? true : false;
    }
	},
	components: { Member, Agent, Agency, Upload, RemoteSelect, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
