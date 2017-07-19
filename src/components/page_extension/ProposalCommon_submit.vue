	<template>
		<el-dialog title="提案提交" :visible.sync="dialogVisible">
			<el-form>
				<el-form-item label="当前阶段">
				</el-form-item>
				<el-form-item label="下一阶段">
					<el-select v-model="form.a">
						<el-option
							v-for="item in option.stage"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="处理人">
					<el-select v-model="form.b">
						<el-option
							v-for="item in option.person"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="处理意见">
					<el-input type="textarea" v-model="form.c"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="dialogVisible = false" type="primary">提交</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</template>

	<script>
	export default {
	  name: 'ProposalCommonSubmit',
	  data () {
			return {
				dialogVisible: false,
			  form: {
			  	a: '',
			  	b: '',
			  	c: '',
			  },
			  option: {
			  	stage: [
			  		{ label: '部门经理审核', value: '2' },
			  		{ label: 'IPR审核', value: '3' },
			  		{ label: '专利建案', value: '4' },
			  	],
			  	person: [
			  		{ label: '处理人一', value: '1' },
			  		{ label: '处理人二', value: '2' },
			  		{ label: '处理人三', value: '3' },
			  	]
			  }
			}
  	},
  	computed: {
  		type () {
  			return this.$store.getters.proposalType;
  		}
  	},
  	methods: {
  		show () {
  			this.dialogVisible = true;
  		}
  	}
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>