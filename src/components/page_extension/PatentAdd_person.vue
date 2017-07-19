<template>
  <app-collapse col-title="人员与分类">
      <el-form label-width="80px">
        <el-form-item label="部门">
          <el-select v-model="form.department" placeholder="请选择部门">
						<el-option v-for="item in option.department" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.tag" placeholder="请选择标签" multiple>
						<el-option v-for="(item, index) in option.tag" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.class" placeholder="请选择分类">
						<el-option v-for="item in option.class" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人">
          <el-select v-model="form.applicant" placeholder="请选择申请人" multiple>
						<el-option v-for="item in option.applicant" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发明人">
          <inventors v-model="form.inventor" @addInventor="addInventor" @deleteInventor="deleteInventor"></inventors>
        </el-form-item>
        <el-form-item label="提案人">
          <el-select v-model="form.proposer" placeholder="请选择提案人" multiple>
						<el-option v-for="item in option.proposer" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IPR">
          <el-select v-model="form.ipr" placeholder="请选择IPR">
						<el-option v-for="item in option.ipr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Inventors from '@/components/form/Inventors'

export default {
  name: 'patentAddPerson',
  data () {
		return {
			form: {
			  department: '',
			  tag: [],
			  class: '',
			  applicant: [],
			  inventor: [ {inventor: '', percent: ''} ],
			  proposer: [],
			  ipr: '',
			},
			option: {
				department: [
					{ label: '部门一', value: '1' },
					{ label: '部门二', value: '2' },
					{ label: '部门三', value: '3' },
				],
				tag: ['标签一', '标签二', '标签三'],
				class: [
					{ label: '类别一', value: '1' },
					{ label: '类别二', value: '2' },
					{ label: '类别三', value: '3' },
				],
				applicant: [
					{ label: '申请人一', value: '1' },
					{ label: '申请人二', value: '2' },
					{ label: '申请人三', value: '3' },
				],
				inventor: [
					{ label: '发明人一', value: '1' },
					{ label: '发明人二', value: '2' },
					{ label: '发明人三', value: '3' },
				],
				proposer: [
					{ label: '提案人一', value: '1' },
					{ label: '提案人二', value: '2' },
					{ label: '提案人三', value: '3' },
				],
				ipr: [
					{ label: 'IPR一', value: '1' },
					{ label: 'IPR二', value: '2' },
					{ label: 'IPR三', value: '3' },
				],
			}
		}
  },
  methods: {
  	setForm (data) {
  		this.$tool.coverObj(this.form, data);
  	},
  	addInventor () {
  		this.form.inventor.push({ inventor: '', percent: '' });
  	},
  	deleteInventor (index) {
  		this.form.inventor.splice( index, 1 );
  	}
  },
  components: { AppCollapse, Inventors }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>