<template>
  <app-collapse col-title="扩展信息">
      <el-form label-width="80px">
        <el-form-item label="申请日">
          <el-date-picker v-model="form.application_date" type="date" placeholder="选择申请日"></el-date-picker>
        </el-form-item>
        <el-form-item label="公开日">
          <el-date-picker v-model="form.public_date" type="date" placeholder="选择公开日"></el-date-picker>
        </el-form-item>
        <el-form-item label="授权日">
          <el-date-picker v-model="form.issue_date" type="date" placeholder="选择授权日"></el-date-picker>
        </el-form-item>
        <el-form-item label="申请号">
        	<el-input v-model="form.application_number"></el-input>
        </el-form-item>
        <el-form-item label="公开号">
        	<el-input v-model="form.public_number"></el-input>
        </el-form-item>
        <el-form-item label="公告号">
        	<el-input v-model="form.issue_number"></el-input>
        </el-form-item>
        <el-form-item label="相关案件">
        	<el-select v-model="form.relevance">
						<el-option v-for="(item, index) in option.relevance" :key="index" :label="item.label" :value="item.value"></el-option>
        	</el-select>
        </el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'

export default {
  name: 'patentAddExpand',
  data () {
		return {
		  form: {
		  	application_date: '',
		  	public_date: '',
		  	issue_date: '',
		  	application_number: '',
		  	public_number: '',
		  	issue_number: '',
		  	relevance: [],
		  },
		  option: { 
		  	relevance: [
		  		{ label: '相关案件一', value: { id: 1, type: 1} },
		  		{ label: '相关案件二', value: { id: 2, type: 2} },
		  		{ label: '相关案件三', value: { id: 3, type: 3} },
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