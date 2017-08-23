<template>
	<el-dialog :title="title" :visible.sync="dialogVisible">
		<el-form label-width="130px" :model="form" :rules="rules" ref="form">

			<el-form-item label="申请人姓名" prop="name">
				<el-input v-model='form.name'></el-input>
			</el-form-item>
			
			<el-form-item label="申请人类型" prop="type">
				<el-select v-model="form.type">
					<el-option
						v-for="item in option.type"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="申请人地区" prop="area">
				<region v-model="form.area"></region>
			</el-form-item>

<!-- 			<el-form-item label="申请人省份与城市" prop="city_name>
				<el-input v-model="form.city_name"></el-input>
			</el-form-item> -->

			<el-form-item label="邮编" prop="province">
				<el-input v-model="form.province"></el-input>
			</el-form-item>

			<el-form-item label="详细地址" prop="address">
				<el-input v-model="form.address"></el-input>
			</el-form-item>

			<el-form-item label="邮编" prop="city">
				<el-input v-model="form.city"></el-input>
			</el-form-item>

			<el-form-item label="费用备案" prop="fee_discount">
				<el-select v-model="form.fee_discount">
					<el-option 
						v-for="item in option.fee_discount"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="英文姓名" prop="ename">
				<el-input v-model="form.ename"></el-input>
			</el-form-item>

			<el-form-item label="英文地址" prop="eaddress">
				<el-input v-model="form.eaddress"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button v-if="type == 'add'" @click="add">添加</el-button>
				<el-button v-else-if="type == 'edit'" @click="edit">编辑</el-button>
			</el-form-item>

		</el-form>
	</el-dialog>
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import Region from '@/components/form/Region'

export default {
  name: 'applicantListPop',
  mixins: [PopMixins],
  data () {
		return {
		  form: {
		  	type: '',
		  	name: '',
		  	identity: '',
		  	area: '',
		  	province: '',
		  	city: '',
		  	address: '',
		  	postcode: '',
		  	fee_discount: '',
		  	ename: '',
		  	eaddress: '',
		  },
		  option: {
		  	type: [
		  		{ label: '大专院校', value: 1 },
		  		{ label: '科研单位', value: 2 },
		  		{ label: '工矿企业', value: 3 },
		  		{ label: '事业单位', value: 4 },
		  		{ label: '个人', value: 5 },
		  	],
		  	fee_discount: [
		  		{ label: '未完成', value: 0 },
		  		{ label: '已完成', value: 1 },
		  	],
		  },
		  rules: {},
		}
  },
  URL: '/api/applicants',
  REMINDER_TEXT: '申请人',
  components: { Region },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>