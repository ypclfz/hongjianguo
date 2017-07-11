<template>
  <app-collapse col-title="委案信息">
      <el-form label-width="80px">
				<el-form-item label="代理机构">
					<el-select v-model="form.agency" placeholder="请选择代理机构">
						<el-option v-for="item in option.agency" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="代理人">
					<el-select v-model="form.agent" placeholder="请选择代理机构">
						<el-option v-for="item in option.agent" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="完成期限">
          <el-date-picker v-model="form.entrust_date" type="date" placeholder="选择完成期限"></el-date-picker>
        </el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'

export default {
  name: 'patentAddCase',
  data () {
		return {
			form: {
				agency: '',
		  	agent: '',
		  	entrust_date: '',	
			},
			option: {
				agency: [
					{ label: '代理机构一', value: '1' },
					{ label: '代理机构二', value: '2' },
					{ label: '代理机构三', value: '3' },
				],
				agent: [
					{ label: '代理人一', value: '1' },
					{ label: '代理人二', value: '2' },
					{ label: '代理人三', value: '3' },
				],
			}
		}
  },
  methods: {
  	setForm (data) {
  		this.$tool.coverObj(this.form, data);
  	},
  },
  components: { AppCollapse }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>