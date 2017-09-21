<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" >
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="发明人姓名" prop="name">
  			<el-input v-model='form.name' placeholder='请输入发明人姓名'></el-input>
  		</el-form-item>

			<el-form-item label="证件号码" prop="identity">
				<el-input v-model="form.identity" placeholder="请输入证件号码"></el-input>
			</el-form-item>

			<el-form-item label="地区" prop="citizenship">
				<region v-model="form.citizenship"></region>
			</el-form-item>

			<el-form-item label="手机" prop="mobile">
				<el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
			</el-form-item>

			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>

			<el-form-item label="不公开姓名" prop="not_disclose_name">
				<el-checkbox v-model="form.not_disclose_name" :true-label="1" :false-label="0">不公开姓名</el-checkbox>
			</el-form-item>

			<el-form-item label="英文名" prop="given_name">
        <el-input v-model="form.given_name" placeholder="请输入英文名"></el-input>
      </el-form-item>
      <el-form-item label="英文姓" prop="family_name">
				<el-input v-model="form.family_name" placeholder="请输入英文姓"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
				<el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import Region from '@/components/form/Region'
export default {
  name: 'inventorListPop',
  mixins: [ AxiosMixins, PopMixins ],
  data () {
		return {
      form: {
        name: '',
        identity: '',
        citizenship: '',
        mobile: '',
        email: '',
        not_disclose_name: 0,
        given_name: '',
        family_name: '',
      },
      rules: {
        name: { required: true, message: '发明人姓名不能为空', trigger: 'blur' }
      }
		}
  },
  components: { Region },
  URL: '/api/inventors',
  REMINDER_TEXT: '发明人',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>