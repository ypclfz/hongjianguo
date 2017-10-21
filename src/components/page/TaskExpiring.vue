<template>
	<div class="main">
	<div class="left">
		<div style="padding-left: 2px;" class="left-tree-header">
			<!-- <span>期限管控</span> -->
			<el-select v-model="date" placeholder="请选择期限类型" size="mini" style="width: 70px;">
				<el-option
			      v-for="item in dates"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			  </el-option>
			</el-select>
			<el-select v-model="day" placeholder="请选择期限" size="mini" style="width: 120px">
			    <el-option
			      v-for="item in days"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
		</div>
		<el-tree
			:data="treeData"
			:render-content="renderContent"
			node-key="value"
			highlight-current
		  	@current-change="handleCurrentChange"
			:style="`font-size: 12px; height:${innerHeight - 98}px; overflow-y: auto; overflow-x: hidden;`"
		>
		</el-tree>
	</div>
	<div class="right">
		<table-component :tableOption="option" :data="tableData"></table-component>
	</div>

	<app-shrink :visible.sync="dialogShrinkVisible" :title="currentRow.title">
      
      <span slot="header" style="margin-left: 10px;">
        <el-tag>{{ currentRow.flow_node }}</el-tag>
        <el-tag>{{ currentRow.serial }}</el-tag>
      </span>

      <el-tabs v-model="activeName">        
        <el-tab-pane label="前往处理" name="finish">
          <task-finish :id="currentRow.id"></task-finish>
        </el-tab-pane>
        <el-tab-pane label="详细信息" name="edit">          
          <information :row="currentRow"></information>          
        </el-tab-pane>
        <el-tab-pane label="相关任务" name="cccc">          
          <detail :row="currentRow" style="margin: 10px 0;"></detail>          
        </el-tab-pane>
      </el-tabs>

    </app-shrink>
</div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import { mapGetters } from 'vuex'

import AppShrink from '@/components/common/AppShrink'
import TaskFinish from '@/components/common/TaskFinish'
import Information from '@/components/page_extension/TaskCommon_information'
import Detail from '@/components/page_extension/TaskCommon_detail'

export default {
	name: 'taskExpiring',
	mixins: [AxiosMixins],
	data () {
		return {
			option: {
				'is_header': false,
				'is_pagination': false,
				'is_border': false,
				'height': 'default4',
				'empty_text_position': 'topLeft',
				'columns': [
				       
					{type: 'text', label: '案号', prop: 'serial' ,width: '200'},
					{type: 'text', label: '案件名称', prop: 'title',width: '200'},
					{type: 'text', label: '管制事项', prop: 'name',width: '200'},
					{type: 'text', label: '流程节点', prop: 'node_name',width: '200'},
					{type: 'text', label: '承办人', prop: 'person_in_charge_name',width: '200'},
					{type: 'text', label: '指定期限', prop: 'due_time',width: '200'},
					{type: 'text', label: '定稿期限', prop: 'review_deadline',width: '200'},
					{type: 'text', label: '管控期限', prop: 'inner_deadline',width: '200'},
					{type: 'text', label: '法定期限', prop: 'deadline',width: '200'},
					{
						type: 'action',
						width: '100',
						btns: [
							{	
								btn_type: 'text',
								label: '邮件提醒',
								click: this.handleEmail,
							}
							
						]
					}
				],
				'highlightCurrentRow': true, 
        'rowClick': this.handleRowClick,


			},
			tableData: [],
			treeData: [],
			currentRow: '',
			currentNode: '',
			day: -10,
			date: 'due_time',
			days: [
				{label: '已过期10天及以上', value: -10},
				{label: '已过期6-10天', value: -6},
				{label: '已过期3-5天', value: -3},
				{label: '已过期1-2天', value: -1},
				{label: '2天内到期', value: 2},
				{label: '5天内到期', value: 5},
				{label: '10天内到期', value: 10},
			],
			dates: [
				{label: '指定期限', value: 'due_time'},
				{label: '管控期限', value: 'inner_deadline'},
				{label: '法定期限', value: 'deadline'},
			],
			activeName: 'finish',
			dialogShrinkVisible: false,
		}
	},
	computed: {
		...mapGetters([
	      'innerHeight',
	    ]),
	},
	methods: {
		renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}({data.count})</span>
          </span>
          <span></span>
        </span>       
      );
  	},
  	handleCurrentChange (d) {
  		this.currentNode = d;  		
  	},
  	handleRowClick (row) { 
    	this.currentRow = row;
    	if( !this.dialogShrinkVisible ) this.dialogShrinkVisible = true;
  	},
  	refresh () {
  		if(!this.currentNode || !this.day || !this.date) return;

  		const url = "/api/tasks/expiring";
  		const data = {
  			type: this.currentNode.value,
  			days: this.day,
  			date: this.date,
  		};
  		const success = _=>{
  			this.tableData = _.data;
  		}

  		this.axiosPost({url, data, success});
  	},
  	refreshTreeData () {
  		if( !this.day || !this.date) return;
  		const url = '/api/tasks/expiring';

			const data = {
				date: this.date,
				days: this.day,
			}
			const success = _=>{this.treeData = _.data};
			this.axiosGet({url, data, success});
  	},
  	handleEmail ({id}) {
  		this.$message({message: '该功能暂未上线', type: 'warning'});
  		// const url = `tasks/${id}/remind`;
  		// const success = _=>{this.$message({message: '发送邮件提醒成功', type: 'success'})};

  		// this.axiosPost({url, success});
  	}
	},
	created () {
		this.refreshTreeData();
	},
	watch: {
		currentNode (val) {
			this.refresh();
		},
		day (val) {
			this.refreshTreeData();
			this.refresh();
		},
		date (val) {
			this.refreshTreeData();
			this.refresh();
		}
	},
	components: {
		TableComponent,
		AppShrink,
		TaskFinish,
		Information,
		Detail,
	}

}
</script>