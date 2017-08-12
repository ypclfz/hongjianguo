<template>
  <div class="main">
  		<div class="left">
		  <el-tree 
		  	:data="options"
		  	:props="props"
		  	node-key="value"
		  	highlight-current
		  	:expand-on-click-node="false"
		  	:current-node-key="currentNodeKey"
		  	default-expand-all
		  	@current-change="handleCurrentChange"
		  >
	  </el-tree>
	  </div>

  	<div class="right">
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" ></table-component>
  	</div>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/mails';

export default {
  name: 'mailList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  options: [
		  	{ label: '草稿箱', value: 0 },
		  	{ label: '收件箱', value: 1 },
		  	{ label: '发件箱', value: 2 },
		  ],
		  props: {
		  	'label': 'label',
		  	'children': 'children',
		  },
		  currentNodeKey: 1,
		  tableOption: {
		  	// 'is_search': false,
		  	'columns': [
		  		{ type: 'text', label: '发件人邮箱', prop: 'from' },
		  		{ type: 'array', label: '收件人邮箱', prop: 'to', render: _=>{ return _.split(','); } },
		  		{ type: 'text', label: '邮件标题', prop: 'subject' },
		  		{ type: 'text', label: '发送时间', prop: 'sent_time' },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'delete', click: this.mailDelete },
		  			],  
		  		}
		  	]
		  },
		  tableData: [],

		}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const mailbox = this.currentNodeKey == '' ? {} : {'mailbox': this.currentNodeKey};
  		const data = Object.assign({}, option, mailbox);
  		const success = _=>this.tableData = _.mails;

  		this.axiosGet({url, data, success});
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	handleCurrentChange (data) {
  		this.setCurrent(data.value);
  	},
  	setCurrent (id) {
  		this.currentNodeKey = id;
  		this.refresh(); 
  	},
  	mailDelete ({id}) {
  		const url = `${URL}/${id}`;
  		const success = _=>{ this.$message({message: '删除邮件成功', type: 'success'}) };

  		this.axiosDelete({url, success});
  	},

  },
  components: { TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>