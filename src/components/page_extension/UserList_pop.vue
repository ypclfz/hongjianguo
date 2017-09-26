<template>
  <el-dialog :title="popType == 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogVisible" @close="close">
		<el-form :model="form" label-width="100px" ref="form" :rules="rules">
			<el-form-item label="用户组" v-if="popType == 'add'">
				<span class="form-item-text">{{ group && group.id !== 0  ? group.name : '未分配用户组' }}</span>
			</el-form-item>
      <el-form-item label="用户名" prop="username" v-if="popType == 'add'">
        <el-input v-model="form.username" ></el-input>
      </el-form-item>
      <el-form-item label="用户名" v-if="popType == 'edit'">
        <span class="form-item-text">{{ form.username }}</span>
      </el-form-item>

      <template v-if="popType == 'add'">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_again">
          <el-input type="password" v-model="form.password_again"></el-input> 
        </el-form-item>
      </template>
      <template v-if="popType == 'edit'">
        <el-form-item label="密码">
          <edit-password v-model="form.password" ref="psd"></edit-password>
        </el-form-item>
      </template>
      
      <el-form-item label="代理所" v-if="group.id == 6">
        <remote-select type="agency" v-model="form.parent"></remote-select>
      </el-form-item>

	    <el-form-item label="昵称" prop="name">
	    	<el-input v-model="form.name"></el-input>	
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

	    <el-form-item style="margin-bottom: 0;">
	    	<el-button type="primary" @click="add" v-if="popType == 'add'">确定</el-button>
	    	<el-button type="primary" @click="edit" v-if="popType == 'edit'">编辑</el-button>
	    	<el-button @click="dialogVisible = false">取消</el-button>
	    </el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import UserRole from '@/components/form/UserRole'
import AxiosMixins from '@/mixins/axios-mixins'
import EditPassword from '@/components/form/EditPassword'
import RemoteSelect from '@/components/form/RemoteSelect'

const URL = 'api/members'

export default {
  name: 'userListPop',
  mixins: [ AxiosMixins ],
  props: {
  	'popType': {
  		type: String, 
  		default: 'add',
  	},
  	'group': null,
  },
  data () {
		return {
			'id': '',
		  'form': {
		  	groups: [],
		  	username: '',
		  	password: '',
		  	password_again: '',
		  	name: '',
		  	email: '',
		  	mobile: '',
		  	weixin: '',
		  	qq: '',
        parent: '',
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
		  	'email': { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur' },
		  	'mobile': { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号码格式错误', trigger: 'blur'},
		  	'qq': { pattern: /^[1-9][0-9]{4,9}$/, message: 'qq号码格式错误', trigger: 'blur'},
		  },
		  dialogVisible: false,
		  editPsd: false,
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
  		if(this.$refs.form) {
				this.$refs.form.resetFields();
				this.form.username = "";
				this.form.password = "";
				this.form.password_again = "";
			}	
  		// console.log("----------------------------------")
  		// console.log(this.$refs.form.fields);
  		this.$nextTick(()=>{
  		// console.log(this.$refs.form.fields);
  		// console.log("------------------------------------")
  			
  			if(this.popType == 'edit') {
  				this.$tool.coverObj(this.form, row);
  				this.id = row.id;
  			}
  				
  		});
  	},
  	add () {
  		let flag = false;
  		this.$refs.form.validate(_=>{ flag = !_ });
  		if( flag || this.psdCheck() ) return;

  		const url = URL;
  		const data = Object.assign({}, this.form, { group_id: this.group.id });
  		const success = _=>{
  			this.$message({message: '添加用户成功', type: 'success'});
  			this.dialogVisible = false;
  			this.$emit('refresh');
  		}

  		this.axiosPost({url, data, success});
  	},
  	edit () {
  		let flag = false;
  		this.$refs.form.validate(_=>{ flag = !_ })
  		if( flag || this.$refs.psd.check() ) return;

  		const url = `${URL}/${this.id}`;
  		const data = this.form;
  		const success = _=>{
  			this.$message({message: '编辑用户成功', type: 'success'});
  			this.dialogVisible = false;
  			this.$emit('refresh');
  		}

  		this.axiosPut({url, data, success});
  	},
  	psdCheck () {
  		const psd = this.form.password;
  		const psd_ag = this.form.password_again;

  		let message = "";
  		let flag = false;

  		if(psd == "" || psd_ag == "") {
  			message = "请完整填写密码与确认密码";
  		}else if(psd !== psd_ag) {
  			message = "两次密码输入不一致，请重新输入";
  		}

  		if(message) {
  			this.$message({message, type: 'warning'});
  			flag = true;
  		}

  		return flag;

  	},
  	close () {
  		if(this.$refs.psd) {
  			this.$refs.psd.clearEditPsd();
  		}
  	}
  },
  components: { 
  	UserRole,
  	EditPassword,
    RemoteSelect
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<!-- ###AppTag### -->