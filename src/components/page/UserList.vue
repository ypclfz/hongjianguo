<template>
  <div class="main">
  	<div class="row">
			<div class="left">
				<app-tree :option="treeOption"></app-tree>
			</div>
			<div class="right">
				<table-component :tableOption="tableOption" :data="tableData" ref="userList"></table-component>
			</div>
  	</div>
  	<el-dialog :title="popType == 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogFormVisible">
		  <el-form :model="formData" :label-width="formLabelWidth" ref="userForm" :rules="formRules">
		    <el-form-item label="用户名" prop="username">
		    	<el-input v-model="formData.username" :disabled="popType == 'edit'"></el-input>
		    </el-form-item>
		    <template v-if="popType == 'add'">
			    <el-form-item label="密码" prop="password">
			    	<el-input type="password" v-model="formData.password"></el-input>
			    </el-form-item>
			    <el-form-item label="确认密码" prop="password_again">
			    	<el-input type="password" v-model="formData.password_again"></el-input>	
			    </el-form-item>
		    </template>
		    <el-form-item label="昵称" prop="nickname">
		    	<el-input v-model="formData.nickname"></el-input>	
		    </el-form-item>
		    <el-form-item label="邮箱" prop="email">
		    	<el-input v-model="formData.email"></el-input>	
		    </el-form-item>
		    <el-form-item label="手机号" prop="mobile">
		    	<el-input v-model="formData.mobile"></el-input>	
		    </el-form-item>
		    <el-form-item label="微信号" prop="weixin">
		    	<el-input v-model="formData.weixin"></el-input>	
		    </el-form-item>
		    <el-form-item label="QQ" prop="qq">
		    	<el-input v-model="formData.qq"></el-input>
		    </el-form-item>

		    <el-form-item>
		    	<el-button type="primary" @click="saveSubmit">确 定</el-button>
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    </el-form-item>
		  </el-form>
		</el-dialog>
  </div>
</template>

<script>
import AppTree from '@/components/common/AppTree'
import TableComponent from '@/components/common/TableComponent'

const userList = 'http://www.zhiq.wang/member/lists';
const userAdd = 'http://www.zhiq.wang/member/save';
const userDelete = 'http://www.zhiq.wang/member/delete';

const nullData = {
	username: '',
	password: '',
	password_again: '',
	nickname: '',
	email: '',
	mobile: '',
	weixin: '',
	qq: '',
};

export default {
  name: 'userList',
  data () {
		return {
		  formLabelWidth: '100px',
		  popType: '',
		  dialogFormVisible: false,
		  formData: {
		  	username: '',
		  	password: '',
		  	password_again: '',
		  	nickname: '',
		  	email: '',
		  	mobile: '',
		  	weixin: '',
		  	qq: '',
		  },
		  formRules : {
		  	'username': [
		  		{ required: true, message: '用户名不能为空', trigger: 'blur'},
		  		{ pattern: /^[^~!@#$%^&*]+$/, message: '用户名不能包含非法字符', trigger: 'blur' }
		  	],
		  	'password': [
		  		{ required: true, message: '密码不能为空', trigger: 'blur'},
		  	],
		  	'password_again': [
		  		{ required: true, message: '确认密码不能为空', triggrt: 'blur'},
		  	],
		  	'email': { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur' },
		  	'mobile': { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号码不正确', trigger: 'blur'},
		  	'qq': { pattern: /^[1-9][0-9]{4,9}$/, message: 'qq号码格式错误', trigger: 'blur'},

		  },
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