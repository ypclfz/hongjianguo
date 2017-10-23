<template>
  <div class="main">
  	<table-component :tableOption="option" :data="tableData">
		<template slot="action" slot-scope="scope">
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
import AxiosMixins from '@/mixins/axios-mixins'

export default {
  name: 'hello',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
		  	'is_search': false,
		  	'is_pagination': false,
		  	'columns': [
		  		{ type: 'text', label: '管制事项', prop: 'name' },
		  		{ type: 'text', label: '当前节点', prop: 'node_name' },
		  		{ type: 'text', label: '承办人', prop: 'person_in_charge_name' },
		  		{ type: 'text', label: '开始时间', prop: 'start_time' },
		  		{ type: 'text', label: '指定期限', prop: 'due_time' },
		  		{ type: 'text', label: '代理机构', prop: 'agency' },
		  		{ type: 'text', label: '代理人', prop: 'agent' },
		  		{ 
		  			type: 'action', 
		  			label: '操作',
		  			btns_render: 'action'
		  		},
		  	]
		  },
		  option2: {
		  	'is_search': false,
		  	'is_pagination': false,
		  	'columns': [
		  	 	{ type: 'text', label: '子任务名称', prop: 'flow_node' },
		  	 	{ type: 'text', label: '开始时间', prop: 'start_time' },
		  	 	{ type: 'text', label: '完成时间', prop: 'end_time' },
		  	 	{ type: 'text', label: '承办人', prop: 'person_in_charge_name' },
		  	 	{ 
		  	 		type: 'text', label: '附件', prop: 'attachments',
		  	 		render (h,item) {
		  	 		
		  	 			return h(
		  	 				'span', 
		  	 				item.map(function (g) {
      							return h('a', 
      							{
      								style: {
									    	marginRight: '2px',
											},
											attrs: {
												href: g.downloadUrl,
											},
      							},g.name)
    						})
    					)
		  	 		} 
		  	 	},
		  	 	{ type: 'text', label: '备注', prop: 'remark' },
		  	 	// { 
		  	 	// 	type: 'text', label: '附件', prop: 'attachments',
		  	 	// 	render (h, item) {
		  	 	// 		return h('a', item.name);
		  	 	// 	}
		  	 	// },
		  	 	// { 
		  	 	// 	type: 'action', 
		  	 	// 	label: '操作',
		  	 	// 	btns: [{
		  	 	// 		text: '完成任务',
		  	 	// 		btn_type: 'text',
		  	 	// 		click: ()=>{alert("完成任务")},
		  	 	// 	}, {
		  	 	// 		text: '任务转出',
		  	 	// 		btn_type: 'text',
		  	 	// 		click: ()=>{alert("任务转出")},
		  	 	// 	}]
		  	 	// },
		  	]
		  },
		  tableData2: [],
		  show: null,
		};
  },
  methods: {
  	toggle ({id}) {
  		if(this.show == null || this.show != id) {
  			const url = `/api/tasks/${id}`;
  			const success = _=>{
  				this.tableData2 = _.task.siblings;
  				// console.log(_)
  			};

  			this.axiosGet({url, success});	
  		}

  		this.show = this.show == id ? null : id;
  	}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailTasks;
  	}
  },
  watch: {
  	tableData () {
  		this.show = null;
  	}
  },
  components: { TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>