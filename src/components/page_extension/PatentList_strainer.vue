<template>
  <app-collapse col-title="专利查询" default-close>
  	<el-form :model="form" label-width="80px" ref="form">
  		<el-row>
				<el-col :span="12">
					<el-form-item label="专利标题" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
						<el-form-item label="技术分类" prop="classification">
							<classification></classification>
						</el-form-item>
				</el-col>
  		</el-row>
  	</el-form>
  </app-collapse>
</template>

<script>
export default {
  name: 'patentListStrainer',
  data () {
	return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
