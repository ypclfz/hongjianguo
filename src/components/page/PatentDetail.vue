<template>
  <div class="main">
  	<app-tag :tags="tags">
		<div slot="A">
			<el-form label-width="150px">
				<el-form-item label="内部卷号："><span></span></el-form-item>
				<el-form-item label="案件名称："><span></span></el-form-item>
				<el-form-item label="专利类型："><span>19221684</span></el-form-item>
				<el-form-item label="客户名称："><span>19221684</span></el-form-item>
				<el-form-item label="申请人新增："><span>19221684</span></el-form-item>
			</el-form>
		</div>
		<div slot="B">
			内容二
		</div>
		<div slot="C">
			内容三
		</div>
  	</app-tag>
  </div>
</template>

<script>
import AppTag from '@/components/common/AppTag'
export default {
  name: 'patentDetail',
  data () {
    return {
    	tags: [
    		{text: '基本信息', key: 'A', active: true},
    		{text: '流程管理', key: 'B'},
    		{text: '其他信息', key: 'C'}
    	],
    	basic_table: [
    		{ label: '内部卷号', key: 'number' },
    		{ label: '内部卷号', key: 'number' },
    	],
    	basic_data: {
    		'number': '20664-TX17CN54'
    	}
    };
  },
  components: { AppTag }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>