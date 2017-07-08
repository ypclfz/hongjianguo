<template>
  <div class="main">
  	<table-component :tableOption="option" :data="tableData"></table-component>
  	<popForm @refreshData="refreshData"></popForm>
  	<modify @refreshData="refreshData"></modify>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopForm from '@/components/page_extension/SettingUser_form'
import Modify from '@/components/page_extension/SettingUser_modify'

export default {
  name: 'settingUser',
  data () {
		return {
			option: {
				'handleSearch': this.search,
				'header_btn': [
					{ type: 'add',  click: this.add },
					{ type: 'enable', click: this.enableSelection },
					{ type: 'disable', click: this.disableSelection },
					{ type: 'delete', click: this.deleteSelection },
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
							{ type: 'edit', click: this.edit },
							{ label: '修改密码', icon: 'edit', btn_type: 'text', click: this.modify },
						]
					},
				],
			},
			tableData: [
		  	{ login_name: 'yp', id: 1 }
		  ],
		  popType: '',
		}
  },
  methods: {
  	add () {
  		this.popType = 'add';
  		this.$refs.popForm.show();
  	},
  	edit (col) {
  		this.popType = 'edit';
  		this.$refs.popForm.show(col);
  	},
  	modify () {
  		this.$refs.modify.show();
  	},
  	enableSelection () {

  	},
  	disableSelection () {

  	},
  	deleteSelection () {

  	},
  	search (val) {
  		console.log(val);
  	}
  },
  components: { TableComponent, PopForm, Modify },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>