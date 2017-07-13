<template>
	<el-dialog :title="titile" :visible.sync="dialogVisible">
		<el-form label-width="80px;">

			<el-form-item label="申请人姓名">
				<el-input v-model='form.name'></el-input>
			</el-form-item>
			
			<el-form-item label="申请人类型">
				<el-select v-model="form.type">
					<el-option
						v-for="item in option.type"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="证件号码">
				<el-input v-model="form.identity"></el-input>
			</el-form-item>

			<el-form-item label="地区">
				<el-input v-model="form.area"></el-input>
			</el-form-item>

			<el-form-item label="省份">
				<el-input v-model="province"></el-input>
			</el-form-item>

			<el-form-item label="城市">
				<el-input v-model="form.city"></el-input>
			</el-form-item>

			<el-form-item label="详细地址">
				<el-input v-model="form.address"></el-input>
			</el-form-item>

			<el-form-item label="邮编">
				<el-input v-model="form.city"></el-input>
			</el-form-item>

			<el-form-item label="费用备案">
				<el-select v-model="form.fee_discount">
					<el-option 
						v-for="item in option.fee_discount"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="英文姓名">
				<el-input v-model="form.ename"></el-input>
			</el-form-item>

			<el-form-item label="英文地址">
				<el-input v-model="form.eaddress"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button v-if="type == 'add'" @click="submit">添加</el-button>
				<el-button v-else-if="type == 'edit'" @click="submit">编辑</el-button>
				<template v-else-if="type == 'filter'">
					<el-button @click="filter">筛选</el-button>
					<el-button @click="clear">清空</el-button>
				</template>
			</el-form-item>

		</el-form>
	</el-dialog>
</template>

<script>
export default {
  name: 'applicantListPop',
  data () {
		return {
		  type: '',
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
		  		{ label: '大专院校', value: '1' },
		  		{ label: '科研单位', value: '2' },
		  		{ label: '工矿企业', value: '3' },
		  		{ label: '事业单位', value: '4' },
		  		{ label: '个人', value: '5' },
		  	],
		  	fee_discount: [
		  		{ label: '未完成', value: '0' },
		  		{ label: '已完成', value: '1' },
		  	],
		  }
		  dialogVisible: false,
		}
  },
  computed () {
  	title () {
  		return type == 'add' 
  						? '新增申请人'
  						: type == 'edit'
  							? '编辑申请人'
  							: '设置筛选条件';
  	}
  },
  methods () {
  	show (type, data) {
  		type = type ? type : 'add';
  		this.type = type;
  		if( type == 'add' ) {

  		}else if( type == 'edit' ) {

  		}else if( type == '' )
  	},
  	submit () {

  	},
  	filter () {

  	},
  	clear () {
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>