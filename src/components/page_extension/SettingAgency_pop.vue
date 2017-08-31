<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" >
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="名称" prop="name">
  			<el-input v-model="form.name" placeholder="请填写代理机构名称"></el-input>
  		</el-form-item>

			<el-form-item label="联系人" prop="contact">
				<el-input v-model="form.contact" placeholder="请填写联系人姓名"></el-input>
			</el-form-item>

			<el-form-item label="详细地址" prop="address">
				<el-input v-model="form.address" placeholder="请填写公司的详细地址"></el-input>
			</el-form-item>

			<el-form-item label="联系电话" prop="telephone">
				<el-input v-model="form.telephone" placeholder="请填写联系电话"></el-input>
			</el-form-item>

			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" placeholder="请填写公司邮箱"></el-input>
			</el-form-item>

			<el-form-item label="状态" prop="status">
        <app-switch type="status" v-model="form.status"></app-switch>
			</el-form-item>

			<el-form-item label="业务范围" prop="scope">
        <static-select type="agency_scope" v-model="form.scope" multiple></static-select>
      </el-form-item>
      <el-form-item label="核心合作伙伴" prop="is_core_partner">
				<app-switch type="is" v-model="form.is_core_partner"></app-switch>
			</el-form-item>

			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
				<el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import AppSwitch from '@/components/form/AppSwitch'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'inventorListPop',
  mixins: [ AxiosMixins, PopMixins ],
  data () {
		return {
      form: {
        name: '',
        contact: '',
        address: '',
        telephone: '',
        email: '',
        scope: [],
        status: 1,
        is_core_partner: 1,
      },
      rules: {
      
      }
		}
  },
  components: { AppSwitch, StaticSelect },
  URL: '/api/agencies',
  REMINDER_TEXT: '代理机构',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>