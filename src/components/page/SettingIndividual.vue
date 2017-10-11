<template>
	<div id="main">
		<el-form v-loading="loading" element-loading-text="加载个人信息中..." :model="form" label-width="100px">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="form.mobile"></el-input>
			</el-form-item>
			<el-form-item label="职务代理人" prop="agent">
				<remote-select type="member" v-model="form.agent"></remote-select>
			</el-form-item>
			<el-form-item label="邮件通知" prop="message_subscribe_mail">
				<el-checkbox label="是否订阅邮件通知" v-model="form.message_subscribe_mail" :true-label="1" :false-label="0"></el-checkbox>
			</el-form-item>
			<el-form-item label="系统内通知" prop="message_subscribe_system">
				<el-checkbox label="是否订阅系统内通知" v-model="form.message_subscribe_system" :true-label="1" :false-label="0"></el-checkbox>
			</el-form-item>
			<el-form-item label="邮箱地址" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="邮箱密码" prop="email_password">
				<edit-password v-model="form.email_password" ref="psd"></edit-password>
			</el-form-item>
<!-- 			<el-form-item label="邮箱密码" prop="email_password">
				<el-input v-model="form.email_password" type="password"></el-input>
			</el-form-item> -->
			<el-form-item label="POP服务器" prop="pop_server">
				<el-input v-model="form.pop_server"></el-input>
			</el-form-item>
			<el-form-item label="POP收信端口" prop="pop_port">
				<el-input v-model="form.pop_port"></el-input>
			</el-form-item>
			<el-form-item label="SMTP服务器" prop="smtp_server">
				<el-input v-model="form.smtp_server"></el-input>
			</el-form-item>
			<el-form-item label="SMTP端口" prop="smtp_port">
				<el-input v-model="form.smtp_port"></el-input>
			</el-form-item>
			<el-form-item prop="is_ssl">
				<el-checkbox label="连接使用SSL (若POP端口为110不需要勾选，若POP端口为995必须勾选)" v-model="form.is_ssl" :true-label="1" :false-label="0"></el-checkbox>
			</el-form-item>
			<el-form-item label="邮件签名" prop="signature">
				<el-input v-model="form.signature" type="textarea"></el-input>
			</el-form-item>
			<el-form-item style="margin-bottom: 0">
				<el-button @click="save" type="primary" :disabled="btn_disabled">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import AppTag from '@/components/common/AppTag'
import RemoteSelect from '@/components/form/RemoteSelect'
import EditPassword from '@/components/form/EditPassword'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/members';

export default {
  name: 'settingIndividual',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  form: {
		  	"name": "",
		    "mobile": "",
		    "agent": "",
		    "message_subscribe_mail": 0,
		    "message_subscribe_system": 0,
		    "email": "",
		    "email_password": "",
		    "pop_server": "",
		    "pop_port": "",
		    "smtp_server": "",
		    "smtp_port": "",
		    "is_ssl": 0,
		    "signature": ""
		  },
		  loading: true,
		  btn_disabled: false,
		}
  },
  computed: {
  	id () {
  		const user = this.$store.getters.getUser;
  		if(user) return user.id;	
  	}
  },
  methods: {
  	refreshForm () {
  		if(this.id) {
  			const url = `${URL}/${this.id}/config`;
  			const success = _=>{ 
  				for(let k in this.form) {
  					if(k == 'email_password') continue;
  					const d = _.data[k];
  					this.form[k] = d;
  				} 
  			};
  			const complete = _=>{
  				window.setTimeout(_=>{this.loading = false}, 300);
  			};

  			this.axiosGet({url, success, complete});
  		}
  	},
  	save () {
  		if(this.checkForm()) return;

  		const url = `${URL}/${this.id}/config`;
  		const success = _=>{ 
  			this.$message({message: '保存成功', type: 'success'});
  			this.$store.dispatch('refreshUser');
  			this.$refs.psd.clearEditPsd();
  		};
  		const data = this.form;
  		const complete = _=>{ this.btn_disabled = false };

  		this.btn_disabled = true;
  		this.axiosPut({url, data, success, complete});
  	},
  	checkForm () {
  		return this.$refs.psd.check();
  	}
  },
  watch: {
  	id () {
  		this.refreshForm();
  	}
  },
  mounted () {
  	this.refreshForm();
  },
  components: { 
  	RemoteSelect,
  	EditPassword,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
