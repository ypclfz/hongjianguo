<template>
  <div class="pending-task-edit">
  	<el-form label-width="100px">
  		<el-form-item label="任务处理人">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="指定完成时间">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="官方绝限">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="任务类型">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="任务阶段">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="客户期限">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="撰稿人/外代">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item label="备注">
  			<el-input></el-input>
  		</el-form-item>
  		<el-form-item>
  			<el-button type="primary" @click="save">保存</el-button>
  		</el-form-item>
  	</el-form>
  </div>
</template>

<script>
export default {
  name: 'taskEdit',
  props: ['row'],
  methods: {
    save () {
      console.log(this.row);
    }
  },
  data () {
  	return {
  	  formData: {}
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>