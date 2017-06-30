<template>
  <div class="TaskEdit">
  	<el-form label-width="100px">
  		<el-form-item label="下一阶段"><el-input></el-input></el-form-item>
  		<el-form-item label="承办人"><el-input></el-input></el-form-item>
  		<el-form-item label="附言"><el-input></el-input></el-form-item>
  		<el-form-item label="附件"><el-input></el-input></el-form-item>
  		<el-form-item><el-button type="primary">上传文件</el-button></el-form-item>
  	</el-form>
  </div>
</template>

<script>
export default {
  name: 'taskFinish',
  props: ['row'],
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