<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'hello',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.add },
		  		{ type: 'delete', click: this.delete },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '客户或供应商' },
		  		{ type: 'text', label: '场景' },
		  		{ type: 'text', label: '收件人名称' },
		  		{ type: 'text', label: '收件人邮箱' },
		  		{ type: 'text', label: '抄送邮箱' },
		  		{ type: 'text', label: '客户或供应商' },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.edit },
		  				{ type: 'delete', click: this.delete_col },
		  			], 
		  		}
		  	],
		  },
		  tableData: [],
		}
  },
  methods: {
  	add () {
  		alert("添加");
  	},
  	delete () {
  		alert("删除");
  	},
  	edit () {
  		alert("编辑");
  	},
  	delete_col () {
  		slert("删除");
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>