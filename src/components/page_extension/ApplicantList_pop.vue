<template>
	<el-dialog :title="title" :visible.sync="dialogVisible">
		<el-form label-width="130px" :model="form" :rules="rules" ref="form">
			
			<el-form-item label="申请人类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择申请人类型">
					<el-option
						v-for="item in option.type"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="申请人姓名" prop="name">
				<el-input v-model="form.name"  placeholder="请填写申请人姓名"></el-input>
			</el-form-item>

			<el-form-item label="证件号码" prop="identity">
				<el-input v-model="form.identity" placeholder="请填写证件号码"></el-input>
			</el-form-item>
			
			<el-form-item label="申请人地区" prop="area">
				<region v-model="form.area"></region>
			</el-form-item>

			<el-form-item label="申请人城市" prop="province_city">
				<city v-model="form.province_city"></city>
			</el-form-item>

<!-- 			<el-form-item label="申请人省份与城市" prop="city_name>
				<el-input v-model="form.city_name"></el-input>
			</el-form-item> -->
			<el-form-item label="详细地址" prop="address">
				<el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
			</el-form-item>

			<el-form-item label="邮编" prop="postcode">
				<el-input v-model="form.postcode" placeholder="请输入邮编"></el-input>
			</el-form-item>

			<el-form-item label="费用备案" prop="fee_discount">
				<el-select v-model="form.fee_discount" placeholder="请选择费用备案">
					<el-option 
						v-for="item in option.fee_discount"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="英文姓名" prop="ename">
				<el-input v-model="form.ename" placeholder="请输入英文姓名"></el-input>
			</el-form-item>

			<el-form-item label="英文地址" prop="eaddress">
				<el-input v-model="form.eaddress" placeholder="请输入英文地址"></el-input>
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
import AxiosMixins from '@/mixins/axios-mixins'
import Region from '@/components/form/Region'
import City from '@/components/form/City'

export default {
  name: 'applicantListPop',
  mixins: [ PopMixins, AxiosMixins ],
  data () {
		return {
		  form: {
		  	type: '',
		  	name: '',
		  	identity: '',
		  	area: '',
		  	address: '',
		  	postcode: '',
		  	fee_discount: '',
		  	ename: '',
		  	eaddress: '',
		  	province_city: [],
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
  methods: {
  	setForm (data) {
  		for(let k in this.form) {
  			const d = data[k];
  			if(k == 'province_city') {
  				let arr = [];
  				arr[0] = Number.parseInt(data['province']);
  				arr[1] = data['city'];
  				console.log(arr);
  				this.form[k] = arr;
  			}else {
  				this.form[k] = d;
  			}
  		}
  	},
  	submitForm () {
  		const o = {};
  		for(let k in this.form) {
  			const d = this.form[k];
  			if(k == 'province_city') {
  				o.province = d[0] ? d[0] : '';
  				o.city = d[1] ? d[1] : '';
  			}else {
  				o[k] = d;
  			}
  		}

  		return o;
  	}
  },
  URL: '/api/applicants',
  REMINDER_TEXT: '申请人',
  components: { Region, City },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>