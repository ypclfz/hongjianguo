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
				{ type: 'add',  click: ()=>{alert("新增")} },
				{ type: 'enable', click: ()=>{alert("启用")} },
				{ type: 'disable', click: ()=>{alert("禁用")} },
				{ type: 'delete', click: ()=>{alert("删除")} },
			],
			'columns': [
				{ type: 'selection' },
				{ type: 'text', label: '登录名', prop: 'login_name' },
				{ type: 'text', label: '姓名' },
				{ type: 'text', label: '用户组' },
				{ type: 'text', label: '工号' },
				{ type: 'text', label: '代码' },
				{ type: 'text', label: '邮箱' },
				{ type: 'text', label: '手机' },
				{ type: 'text', label: 'QQ' },
				{ type: 'text', label: '微信' },
				{ type: 'text', label: '类型' },
				{ type: 'text', label: '状态' },
				{ type: 'text', label: '系数' },
				{ 
					type: 'action',
					width: '160px',
					btns: [
						{ type: 'edit', click: ()=>{alert('编辑')} },
						{ label: '修改密码', icon: 'edit', btn_type: 'text', click: ()=>{alert('修改密码')} },
					]
				},
			],
		},
		tableData: [
	  	{ login_name: 'yp', id: 1 }
	  ],
	}
  },
  components: { TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>