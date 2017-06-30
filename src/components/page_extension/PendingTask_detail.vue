<template>
  <div class="task-edit">
  	<el-form>
  		<el-form-item label="任务来源"></el-form-item>
  		<el-form-item label="任务期限"></el-form-item>
  		<el-form-item label="备注列表"></el-form-item>
  		<el-form-item label="任务来源"><el-button type="primary">上传文件</el-button></el-form-item>
  	</el-form>
  </div>
</template>

<script>
export default {
  name: 'taskEdit',
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