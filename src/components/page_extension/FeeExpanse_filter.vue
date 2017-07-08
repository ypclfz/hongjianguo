<template>
  <el-form>
  	<el-form-item label="案号"><el-input></el-input></el-form-item>
  	<el-form-item label="费用对象"><el-input></el-input></el-form-item>
  	<el-form-item label="收款人"><el-input></el-input></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FeeExpanseFilter',
  data () {
	return {
	  form: {},
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>