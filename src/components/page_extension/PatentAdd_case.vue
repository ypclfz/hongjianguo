<template>
  <app-collapse col-title="委案信息">
      <el-form label-width="80px">
				<el-form-item label="优先权">
					<priorities v-model="form.priorities"></priorities>
				</el-form-item>
				<el-form-item label="相关案件">
					<relative-projects v-model="form.relative_projects"></relative-projects>
				</el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Priorities from '@/components/form/Priorities'
import RelativeProjects from '@/components/form/RelativeProjects'

export default {
  name: 'patentAddCase',
  data () {
		return {
			form: {
				priorities: [{area: '', apn: '', date: ''}],
				relative_projects: [{id: '', type: ''}],
			}
		}
  },
  methods: {
  	setForm (data) {
  		this.$tool.coverObj(this.form, data);
  	},
  },
  components: { AppCollapse, Priorities, RelativeProjects }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>