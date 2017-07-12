<template>
  <div class="main">
  	<table-component :tableOption="option1" :data="tableData1">
		<template slot="action" scope="scope">
			<el-button type="text" size='mini' @click='toggle(scope.row)'>{{ show == scope.row.id ? '隐藏任务详情' : '显示任务详情'}}</el-button>
		</template>
  	</table-component>
  	<template v-if="show ? true : false">
  		<table-component :tableOption="option2" :data="tableData2"></table-component>
  	</template>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
export default {
  name: 'hello',
  data () {
		return {
		  option1: {
		  	'is_search': false,
		  	'columns': [
		  		{ type: 'text', label: '任务名称', prop: 'name' },
		  		{ type: 'text', label: '开始时间', prop: 'start_time' },
		  		{ type: 'text', label: '结束时间', prop: 'end_time' },
		  		{ type: 'text', label: '指定期限', prop: 'duetime' },
		  		{ type: 'text', label: '法定期限', prop: 'deadline' },
		  		{ type: 'text', label: '负责人', prop: 'charger' },
		  		{ type: 'text', label: '状态', prop: 'status' },
		  		{ 
		  			type: 'action', 
		  			label: '操作',
		  			btns_render: 'action'
		  		},
		  	]
		  },
		  option2: {
		  	'is_search': false,
		  	'columns': [
		  	 	{ type: 'text', label: '子任务名称' },
		  	 	{ type: 'text', label: '开始时间' },
		  	 	{ type: 'text', label: '完成时间' },
		  	 	{ type: 'text', label: '承办人' },
		  	 	{ type: 'text', label: '附件' },
		  	 	{ type: 'text', label: '附言' },
		  	 	{ 
		  	 		type: 'action', 
		  	 		label: '操作',
		  	 		btns: [{
		  	 			text: '完成任务',
		  	 			btn_type: 'text',
		  	 			click: ()=>{alert("完成任务")},
		  	 		}, {
		  	 			text: '任务转出',
		  	 			btn_type: 'text',
		  	 			click: ()=>{alert("任务转出")},
		  	 		}]
		  	 	},
		  	]
		  },
		  tableData2: [],
		  show: null,
		};
  },
  methods: {
  	toggle ({id}) {
  		this.show = this.show == id ? null : id;
  	}
  },
  computed: {
  	tableData1 () {
  		return this.store.getters.detail_data.tasks;
  	}
  },
  components: { TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>