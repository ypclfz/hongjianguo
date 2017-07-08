<template>
  <el-dialog :visible.sync="dialogVisible" :title="type == 'add' ? '新增用户' : 编辑用户">
  	<el-form label-width="120px">
  		<el-form-item label=></el-form-item>
  		<el-form-item></el-form-item>
  		<el-form-item></el-form-item>
  		<el-form-item></el-form-item>
  	</el-form>.
  </el-dialog>
</template>

<script>
export default {
  name: 'SettingUserForm',
  props: ['type'],
  data () {
	return {
	  dialogVisible: false,
	  formData: {},
	}
  }
}
</script>