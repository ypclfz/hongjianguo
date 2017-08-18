<template>
  <app-collapse col-title="相关案件">
      <el-form label-width="120px">
        <el-form-item label="相关提案">
          <proposal v-model="form.proposals" multiple></proposal>
        </el-form-item>
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
import Proposal from '@/components/form/Proposal'
import Priorities from '@/components/form/Priorities'
import RelativeProjects from '@/components/form/RelativeProjects'

export default {
  name: 'patentAddCase',
  data () {
    return {
      form: {
        proposals: [],
        priorities: [],
        relative_projects: [],
      }
    }
  },
  methods: {
    setForm (data) {
      this.$tool.coverObj(this.form, data);

      this.form['proposals'] = data['proposals'].map(_=>_.id);
        
    },
  },
  components: { AppCollapse, Priorities, RelativeProjects, Proposal }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>