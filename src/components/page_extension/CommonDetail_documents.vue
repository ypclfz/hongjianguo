<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'commonDetailDocuments',
  data () {
		return {
		  option: {
		  	'is_search': false,
		  	'columns': [
		  		{ type: 'text', label: '文件名称', prop: 'name' },
		  		{ type: 'text', label: '上传时间', prop: 'upload_time' },
		  		{ type: 'text', label: '上传用户', prop: 'upload_user' },
		  		{ type: 'action',
		  			btns: [
		  				{ type: 'download', text: '下载' },
		  				{ type: 'view', text: '查看' },
		  			] 
		  		}
		  	],
		  },
		}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailDocuments;
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>