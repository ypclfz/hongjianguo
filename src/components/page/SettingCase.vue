<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'settingCase',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: ()=>{alert('新增')} },
		  		{ type: 'delete', click: ()=>{alert('删除')} },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '类型' },
		  		{ type: 'text', label: '地区' },
		  		{ type: 'text', label: '服务名称' },
		  		{ type: 'text', label: '类型代码' },
		  		{ type: 'text', label: '服务费' },
		  		{ type: 'text', label: '关联流程' },
		  		{ type: 'text', label: '销售提成' },
		  		{ type: 'text', label: '撰稿提成一' },
		  		{ type: 'text', label: '撰稿提成二' },
		  		{ 
		  			type: 'action', 
		  			btns: [
		  				{ type: 'edit', click: this.delete_col },
		  				{ type: 'delete', click: this.edit },
		  			], 
		  		},
		  	]
		  },
		  tableData: [],
		}
  },
  methods: {
  	add () {
  		alert('新增');
  	},
  	delete () {
  		alert('删除');
  	},
  	edit () {
  		alert('编辑');
  	},
  	delete_col() {
  		alert('删除');
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>