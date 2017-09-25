<template>
	<div class="edit-password">
		<el-button v-if="!editPsd" type="text" @click="editPsd = true">点击修改</el-button>
		<template v-if="editPsd">
			<el-input type="password" v-model="psd" placeholder="请输入密码..."></el-input>
			<el-input type="password" v-model="psd_again" placeholder="请再次输入密码..." style="margin-top: 5px;"></el-input>
			<el-button type="text" @click="clearEditPsd">取消</el-button>
		</template>
	</div>
</template>

<script>
export default {
	name: 'EditPassWord',
	props: ['value'],
	data () {
		return {
			psd: '',
			psd_again: '',
			editPsd: false,
		}
	},
	methods: {
		clearEditPsd () {
			this.editPsd = false; 
  		this.psd = ''; 
  		this.psd_again = '';
		},
		check () {

			const psd = this.psd;
  		const psd_ag = this.psd_again;

  		let message = "";
  		let flag = false;

  		if( !this.editPsd ) {
  			message = "";
  		}else if(psd == "" || psd_ag == "") {
  			message = "请完整填写密码与确认密码";
  		}else if(psd !== psd_ag) {
  			message = "两次密码输入不一致，请重新输入";
  		}

  		if(message) {
  			this.$message({message, type: 'warning'});
  			flag = true;
  		}

  		return flag;
		}
	},
	watch: {
		psd (val) {
			this.$emit('input', val);
		}
	}
}
</script>