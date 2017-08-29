<template>
  <div class="main">
  	<strainer @refresh="refresh" v-model="filter"></strainer>
  	<table-component :tableOption="tableOption" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/NoticeCommon_strainer'

export default {
  name: 'noticeCommon',
  data () {
  	return {
			tableOption: {
				'header_btn': [
					// { type: 'custom', label: '筛选', icon: '', click: ()=>{alert("筛选")} },
					// { type: 'custom', label: '统计', icon: '', click: ()=>{alert("统计")} },
					{ type: 'delete' },
					{ type: 'export' },
					{ type: 'import' },
					{ type: 'control', label: '字段' },
					{ type: 'custom', label: '上传', icon: '', click: ()=>{alert("上传")} },
					// { type: 'custom', label: '批量上传', icon: '', click: ()=>{alert("批量上传")}},
				],
				'import_action': '',				
				'columns': [
					{ type: 'selection' },
					{ type: 'text', label: '上传日', prop: 'upload_time' },
					{ type: 'text', label: '通知书名称', prop: 'name' },
					{ type: 'text', label: '上传用户', prop: 'uploader' },
					{ type: 'text', label: '处理状态', prop: 'status' },
					{ type: 'text', label: '案号', prop: 'serial' },
					{ type: 'text', label: '申请日', prop: 'apd' },
					{ type: 'text', label: '发文日', prop: 'mail_date' },
					{ type: 'text', label: '案件名称', prop: 'title' },
					{ type: 'text', label: '发文序列号', prop: 'mail_serial' },
					{ type: 'text', label: '申请号', prop: 'apn' },
					{ 
						type: 'action', 
						label: '操作',
						btns: [
							{ label: '上传', btn_type: 'text', click: ()=>{alert("上传")} },
							{ label: '忽略', btn_type: 'text', click: ()=>{alert("忽略")} },
						],
					}
				]
			},
			tableData: [
				{test: 'test', id: 1},
				{test: 'test', id: 2},
				{test: 'test', id: 3},
				{test: 'test', id: 4},
				{test: 'test', id: 5},
				{test: 'test', id: 6},
				{test: 'test', id: 7},
			],
			filter: {},
	  }
	},
	computed: {
		type () {
			let type = this.$route.meta.type;

			return type ? type : '';
		}
	},
	methods: {
		refresh () {}
	},
	components: { TableComponent, Strainer },
	created () {
		this.tableOption.import_action = this.type == 'patent' ? 'getPatentNotices' : 'getCopyrightNotices';
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>