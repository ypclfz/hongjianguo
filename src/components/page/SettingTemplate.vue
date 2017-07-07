<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'settingTemplate',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.add },
		  		{ type: 'delete', click: this.delete },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '模板名称' },
		  		{ type: 'text', label: '应用场景' },
		  		{ type: 'text', label: '默认模板' },
		  		{ type: 'text', label: '模板类型' },
		  		{ type: 'text', label: '标题' },
		  		{ 
		  			type: 'action', 
		  			btns: [
		  				{ type: 'edit', click: this.edit },
		  			] 
		  		},
		  	] 
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
  		alert("编辑")
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>