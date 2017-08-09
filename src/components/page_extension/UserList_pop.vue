<template>
  <el-dialog :title="popType == 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogFormVisible">
		<el-form :model="form" :label-width="100px" ref="userForm" :rules="rules">
	    <el-form-item label="用户名" prop="username" >
	    	<el-input v-model="form.username" :disabled="popType == 'edit'"></el-input>
	    </el-form-item>
	    <template v-if="popType == 'add'">
		    <el-form-item label="密码" prop="password">
		    	<el-input type="password" v-model="form.password"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" prop="password_again">
		    	<el-input type="password" v-model="form.password_again"></el-input>	
		    </el-form-item>
	    </template>
	    <el-form-item label="昵称" prop="nickname">
	    	<el-input v-model="form.nickname"></el-input>	
	    </el-form-item>
	    <el-form-item label="邮箱" prop="email">
	    	<el-input v-model="form.email"></el-input>	
	    </el-form-item>
	    <el-form-item label="手机号" prop="mobile">
	    	<el-input v-model="form.mobile"></el-input>	
	    </el-form-item>
	    <el-form-item label="微信号" prop="weixin">
	    	<el-input v-model="form.weixin"></el-input>	
	    </el-form-item>
	    <el-form-item label="QQ" prop="qq">
	    	<el-input v-model="form.qq"></el-input>
	    </el-form-item>

	    <el-form-item>
	    	<el-button type="primary" @click="add" v-if="popType == 'add'">确定</el-button>
	    	<el-button type="primary" @click="edit" v-if="popType == 'edit'">编辑</el-button>
	    	<el-button @click="dialogFormVisible = false">取消</el-button>
	    </el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
const URL = 'api/members'

export default {
  name: 'userListPop',
  props: {
  	'popType': {
  		type: String, 
  		default: 'add',
  	}
  },
  data () {
		return {
		  'form': {
		  	username: '',
		  	password: '',
		  	password_again: '',
		  	nickname: '',
		  	email: '',
		  	mobile: '',
		  	weixin: '',
		  	qq: '',
		  },
		  'rules': {
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
		  dialogVisible: false,
		}
  },
  computed: {
  	dialogTitle () {
  		return this.popType == 'add' ? '添加用户' : '编辑用户';
  	},
  },
  methods: {
  	show (row) {
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			const t = this.popType;
  			if(t == 'add') {
  				this.form.resetFields();
  			}else {
  				this.$tool.coverObj(this.form, row);
  			}
  		});
  	},
  	add () {
  		const url = URL;
  		const data = this.form;
  		const success = _=>{
  			this.$alert('添加用户成功', {type: 'success', closeOnClickModal: true});
  			this.$emit('refresh');
  		}

  		this.axiosPost({url, data, success});
  	},
  	edit ({id}) {
  		const url = `${URL}/${id}`;
  		const data = this.form;
  		const success = _=>{
  			this.$alert('编辑用户成功', {type: 'success', closeOnClickModal: true});
  			this.$emit('refresh');
  		}

  		this.axiosPut({url, data, success});
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
###AppTag###