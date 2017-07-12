<!-- <template>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'域名' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
  >
    <el-row :gutter="20">
			<el-col :span="14">
				<el-input placeholder="请填写发明人名称"></el-input>
			</el-col>
			<el-col :span="6">
				<el-autocomplete placeholder="请填写贡献率" :fetch-suggestions="handleFetch" v-model="test" style="width: 100%">
					<template slot="append">%</template>
				</el-autocomplete>
			</el-col>
		</el-row>
  </el-form-item>
</template>

<script>
export default {
  name: 'hello',
  data () {
	return {
	  domain: [
	  	{ name: '', percent: '' },
	  ]
	}
  }
}
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped lang="scss">
</style> -->