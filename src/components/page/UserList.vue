<template>
  <div class="main">
  	<div class="row">
			<div class="left">
				<group :choose-group.sync="choose_group"></group>
			</div>
			<div class="right">
				<el-form-item>
				</el-form-item>
				<table-component @refresh-table-data="refreshTableData" :tableOption="tableOption" :data="tableData" ref="table"></table-component>
			</div>
  	</div>
  	<pop :popType="popType" @refresh="refresh"></pop>
  </div>
</template>

<script>
import AppTree from '@/components/common/AppTree'
import TableComponent from '@/components/common/TableComponent'
import Group from '@/components/page_extension/userList_group'
import Pop from '@/components/page_extension/pop'
const URL = 'api/members'

export default {
  name: 'userList',
  data () {
		return {
		  formLabelWidth: '100px',
		  popType: '',
		  tableOption: {
		  	'header_btn': [
		  		{ type: 'custom', label: '添加', icon: 'plus', click: this.add },
		  		{ type: 'custom', label: '删除', icon: 'plus', click: this.bulkDelete },
		  		{ type: 'control', label: '字段' },
		  	],
		  	columns: [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '用户名', prop: 'username' },
		  		{ type: 'text', label: '昵称', prop: 'nickname' },
		  		{ type: 'text', label: '邮箱', prop: 'email' },
		  		{ type: 'text', label: '手机号', prop: 'mobile' },
		  		{ type: 'text', label: '微信号', prop: 'weixin' },
		  		{ type: 'text', label: 'QQ', prop: 'qq' },
		  		{ 
		  			type: 'action', label: '操作',
		  			btns: [
		  				{ label: '编辑', icon: 'edit', click: this.edit },
		  				{ label: '删除', icon: 'delete', click: this.delete }
		  			],
		  		},
		  	]
		  },
			treeOption: {
	      data: [{
	        label: '部门1',
	        type: 'department',
	        children: [{
	          label: '部门1-1',
	          type: 'department',
	          children: [{
	            label: '部门1-1-1',
	            type: 'department'
	          }]
	        }]
	      }],
	      props: {
	        children: 'children',
	        label: 'label',
	      }
			},
			tableData: [],
			choose_group: '',
		};
	},
	methods: {
		add () {
			this.popType = 'add';
			Object.assign(this.formData, nullData);
			this.dialogFormVisible = true;
		},
		edit (row) {
			this.popType = 'edit';
			Object.assign(this.formData, row, {'password': '', 'password_again': ''});
			this.dialogFormVisible = true;
		},
		delete (row) {
			const uid = row.uid;
			this.$confirm("确认删除该用户?")
					.then(()=>{
						this.$http.post(userDelete, { uid }).then(
							data=>{console.log(data)},
							error=>{console.log(error)}
						);
					});
		},
		bulkDelete () {
			const arr = this.$refs.getSelection();
			const uid = [];

			if(arr.length == 0) {
				this.$alert("请选择需要删除的用户");
			}else {	
				for(let a of arr) {
					uid.push(arr.uid);
				}

				this.$http.post(userDelete, { uid }).then(
					data=>{console.log(data)},
					error=>{console.log(error)}
				);
			} 
		},
		saveSubmit () {
			this.$refs.userForm.validate(valid=>{
				if(valid) {
					this.$http.post(userAdd, this.formData).then(data=>{
						const body = data.body;
						if(body.status) {
							console.log(body);
						}else {
							this.$alert("添加失败");
						}
					},
					error=>{this.$alert("网络连接错误")}, {type: warning, closeOnClickModal: true});
				}else {
					this.$alert("请正确填写各字段！", {type: 'warning', closeOnClickModal: true});
				}
			});
		},
	},
  created () {
  	this.$http.get(userList).then(
  		data=>{
  			const body = data.body;
  			if(body.status) {
  				this.tableData = body.data;
  			}else {
  				this.$alert("请求数据失败");
  			}
  		}, 
  		error=>{console.log(error)})
  },
  components: { AppTree, TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>