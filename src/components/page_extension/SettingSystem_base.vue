<template>
  <el-form label-width="120px">
	<el-form-item label="公司名称："><el-input></el-input></el-form-item>
	<el-form-item label="公司地址："><el-input></el-input></el-form-item>
	<el-form-item label="联系人："><el-input></el-input></el-form-item>
	<el-form-item label="电话："><el-input></el-input></el-form-item>
	<el-form-item label="付款信息"><el-input></el-input></el-form-item>
	<el-form-item label="印章图片"><el-input></el-input></el-form-item>
	<el-form-item label="LOGO图片"><el-input></el-input></el-form-item>
	<el-form><el-button></el-button></el-form>
  </el-form>
</template>

<script>
export default {
  name: 'SettingSystemBase',
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