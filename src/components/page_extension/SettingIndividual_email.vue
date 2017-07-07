<template>
  <el-form label-width="120px">
	<el-form-item label="邮件地址："><el-input></el-input></el-form-item>
	<el-form-item label="邮件密码："><el-input></el-input></el-form-item>
	<el-form-item label="POST服务器："><el-input></el-input></el-form-item>
	<el-form-item label="POST收信端口："><el-input></el-input></el-form-item>
	<el-form-item label="SMTP服务器："><el-input></el-input></el-form-item>
	<el-form-item label="SMTP端口："><el-input></el-input></el-form-item>
	<el-form-item><el-button>保存</el-button></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'siEmail',
  data () {
	return {
	  msg: 'Welcome to Your Vue.js App'
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
