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
				{ type: 'custom', label: '新增', icon: 'plus', click: ()=>{alert("新增")} },
				{ type: 'custom', label: '启用', icon: '', click: ()=>{alert("启用")} },
				{ type: 'custom', label: '禁用', icon: '', click: ()=>{alert("禁用")} },
				{ type: 'custom', label: '新增', icon: 'delete', click: ()=>{alert("删除")} },
			],
			'columns': [
				{ type: 'selection' },
				{ type: 'text', label: '完整名称' },
				{ type: 'text', label: '代理机构代码' },
				{ type: 'text', label: '电子申请用户' },
				{ type: 'text', label: '简称' },
				{ type: 'text', label: '简码' },
				{ type: 'text', label: '状态' },
				{ 
					type: 'action',
					btns: [
						{ label: '编辑', icon: 'edit', click: ()=>{alert("编辑")} },
						{ label: '禁用', icon: '', click: ()=>{alert("禁用")} },
						{ label: '删除', icon: 'delete', click: ()=>{alert("删除")} },
					]
				}
			]
	  },
	  tableData: [],
	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>