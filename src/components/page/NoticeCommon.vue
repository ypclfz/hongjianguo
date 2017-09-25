<template>
  <div class="main">
	<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/NoticeCommon_strainer'
import AxiosMixins from '@/mixins/axios-mixins'

const config = [
	['patent', {
		URL: '/api/patents/notices',

	}],
	['copyright', {
		URL: '/api/copyrights/notices'
	}]
]
const map = new Map(config);

export default {
  name: 'noticeCommon',
  mixins: [AxiosMixins],
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
					// { type: 'custom', label: '上传', icon: '', click: ()=>{alert("上传")} },
					// { type: 'custom', label: '批量上传', icon: '', click: ()=>{alert("批量上传")}},
				],
				'height': 'default2',
				'import_type': '',				
				'columns': [
					{ type: 'selection' },
					// { type: 'text', label: '通知书案件名称', prop: 'title', width: '200', is_import: true },
					{ type: 'text', label: '关联案件', prop: 'project', render_simple: 'name', width: '200', is_import: true },
					{ type: 'text', label: '通知书名称', prop: 'code', render_simple: 'name', width: '200', is_import: true },
					{ type: 'text', label: '发文日', prop: 'mail_date', width: '200', is_import: true },
					{ type: 'text', label: '发文序列号', prop: 'notice_serial', width: '200', is_import: true },
					{ type: 'text', label: '申请号', prop: 'apn', width: '200', is_import: true },
					{ type: 'text', label: '申请日', prop: 'apd', width: '200', is_import: true },
					{ type: 'text', label: '上传日', prop: 'create_time', width: '200' },
					{ type: 'text', label: '上传用户', prop: 'uploader', render_simple: 'name', width: '200' },
					{ type: 'text', label: '审查员', prop: 'examiner', width: '200' },
					{ type: 'text', label: '审查部门', prop: 'examiner_dept', width: '200' },
					{ type: 'text', label: '案号', prop: 'serial', width: '200' },
					// { type: 'text', label: '处理状态', prop: 'status', width: '200' },
					// { type: 'text', label: '备注', prop: 'remark', width: '200' },
					{ 
						type: 'action', 
						label: '操作',
						width: '150',
						btns: [
							{ type: 'view', btn_type: 'text', click: ({viewUrl})=>{window.open(viewUrl)} },
							{ type: 'download', btn_type: 'text', click: ({downloadUrl})=>{window.location.href=downloadUrl} },
						],
					}
				],
				'import_columns': [
					{ type: 'array', label: '费用', prop: 'fees', render: _=>(_=>_.name), width: '200' }
				]
			},
			tableData: [],
			filter: {},
	  }
	},
	computed: {
		type () {
			let type = this.$route.meta.type;

			return type ? type : '';
		},
		config () {
			return map.get(this.type);
		}
	},
	methods: {
		refresh () {
			this.$refs.table.refresh();
		},
		refreshTableData (option) {
			const url = this.config.URL;
			const data = option;
			const success = _=>{
				if(option.format == 'excel') {

					window.location.href = _.list.downloadUrl;
				}
				else {
					this.tableData = _.list;	
				}
				
			};

			this.axiosGet({url, data, success});
		}
	},
	components: { TableComponent, Strainer },
	created () {
		this.tableOption.import_type = this.type == 'patent' ? 'patent_notice' : 'copyright_notice';		
	},
	mounted () {
		this.refresh();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>