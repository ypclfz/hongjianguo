<template>
  <app-collapse col-title="委案信息">
      <el-form label-width="120px">
				<el-form-item label="代理机构名称">
					{{ agent }}
				</el-form-item>
				<el-form-item label="代理机构案号">
					{{ agent_serial }}
				</el-form-item>
				<el-form-item label="代理类型">
					{{ agency_type }}
				</el-form-item>
				<el-form-item label="代理人信息">
					{{ agency }}
				</el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'

export default {
  name: 'patentAddAgent',
  data () {
		return {
			form: {
				agency: '',
				agent_serial: '',
				agency_type: '',
				agent: '',
			}
    }
  },
  methods: {
  	setForm (data) {
      this.$tool.coverObj(this.form, data); 
  	}
  },
  computed: {
  	agent () {
  		return this.form.agency ? this.form.agency.name : '暂无代理机构信息';
  	},
  	agent_serial () {
  		return this.form.agent_serial ? this.form.agent_serial : '暂无代理机构信息';
  	},
  	agency_type () {
  		return this.form.agency_type ? this.form.agency_type : '未知代理类型';
  	},
  	agency () {
  		return this.form.agent ? this.form.agent.name : '暂无代理人信息';
  	}
  },
  components: {  AppCollapse }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>