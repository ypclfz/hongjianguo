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
					{ type: 'export' },
					{ type: 'delete' },
					{ type: 'control', label: '字段' },
					{ type: 'custom', label: '上传', icon: '', click: ()=>{alert("上传")} },
					// { type: 'custom', label: '批量上传', icon: '', click: ()=>{alert("批量上传")}},
				],
				'columns': [
					{ type: 'selection' },
					{ type: 'text', label: '内部案号', prop: 'test' },
					{ type: 'text', label: '通知书编号', show: false },
					{ type: 'text', label: '通知书代码', show: false },
					{ type: 'text', label: '发明名称' },
					{ type: 'text', label: '发文序列号' },
					{ type: 'text', label: '通知书名称' },
					{ type: 'text', label: '申请号' },
					{ type: 'text', label: '申请日' },
					{ type: 'text', label: '国际申请号', show: false },
					{ type: 'text', label: '委内编号', show: false },
					{ type: 'text', label: '发文日' },
					{ type: 'text', label: '答复日' },
					{ type: 'text', label: '注册代码', show: false },
					{ type: 'text', label: '下载日期', show: false },
					{ type: 'text', label: '公布号', show: false },
					{ type: 'text', label: '公布日', show: false },
					{ type: 'text', label: '进入实审日', show: false },
					{ type: 'text', label: '首次年费年度', show: false },
					{ type: 'text', label: '外观分类号', show: false },
					{ type: 'text', label: '授权公告号', show: false },
					{ type: 'text', label: '授权公告日', show: false },
					{ type: 'text', label: '存储路径', show: false },
					{ type: 'text', label: '生成日期', show: false },
					{ type: 'text', label: '备注', show: false },
					{ type: 'text', label: '是否上传', show: false },
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
	methods: {
		refresh () {}
	},
	components: { TableComponent, Strainer },	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>