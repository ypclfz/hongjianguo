<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" @open="open">
  	<el-form label-width="100px" ref="form" :model="form" :rules="type == 'add' || type == 'edit' ? rules : {}">
  		
  		<el-form-item label="发明人姓名" prop="name">
  			<el-input v-model='form.name' placeholder='请输入发明人姓名'></el-input>
  		</el-form-item>

			<el-form-item label="证件号码">
				<el-input v-model="form.identity" placeholder="请输入证件号码"></el-input>
			</el-form-item>

			<el-form-item label="地区">
				<el-input v-model="form.area" placeholder="请输入地区"></el-input>
			</el-form-item>

			<el-form-item label="手机">
				<el-input v-model="form.mobile" placeholder="情输入手机号码"></el-input>
			</el-form-item>

			<el-form-item label="邮箱">
				<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>

			<el-form-item label="不公开姓名">
				<el-input v-model="form.public_name" placeholder="请输入不公开姓名"></el-input>
			</el-form-item>

			<el-form-item label="英文姓名">
				<el-input v-model="form.name_en" placeholder="请输入英文姓名"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submit" v-if="type === 'add'">添加</el-button>
				<el-button type="primary" @click="submit" v-else-if="type === 'edit'">编辑</el-button>
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
  name: 'inventorListPop',
  data () {
		return {
			type: '',
			id: 0,
		  form: {
		  	name: '',
		  	identity: '',
		  	area: '',
		  	mobile: '',
		  	email: '',
		  	public_name: '',
		  	name_en: '',
		  },
		  rules: {
		  	name: { required: true, message: '发明人姓名不能为空', trigger: 'blur' }
		  },
		  dialogVisible: false,
		}
  },
  computed: {
  	title () {
  		const t = this.type;
  		return t == 'add'
  							? '新增发明人' 
  							: t == 'edit'
  								? '编辑发明人'
  								: '设置筛选条件';
  	}
  },
  methods: {
  	show ( type='add', data ) {
  		this.type = type;
  		this.dialogVisible = true;
  		if(type == 'add') {
  			this.$tool.clearObj(this.form);
  		}

  		// if( this.$refs.form ) {
  		// 	this.$refs.form.resetFields();	
  		// }
  		
  		
  	},
  	open () {
  		this.$refs.form.resetFields();
  	},
  	submit () {
  		this.$refs.form.validate((valid)=>{
  			if(valid) {
  				const id = this.id;
  				console.log(Object.assign({}, this.form, { id }));
  				this.$emit('refreshTableData');
  			}
  		});
  	},
  	filter () {
  		const copy = this.$tool.deepCopy(this.form);
  		this.$emit('refreshFilter', form);
  	},
  	clear () {
  		this.$emit('clearFilter');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>