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
		  		{ type: 'text', label: '文件类型', prop: 'type' },
		  		{ type: 'text', label: '文件格式', prop: 'ext' },
		  		{ type: 'text', label: '文件大小', prop: 'size' },
		  		{ type: 'text', label: '上传人', prop: 'uploader' },
		  		{ type: 'text', label: '上传时间', prop: 'create_time' },
		  		{ type: 'action',
		  			width: '134',
		  			btns: [
		  				{ type: 'download', text: '下载', click: ({downloadUrl})=>{window.open(downloadUrl)} },
		  				{ type: 'view', text: '查看', click: ({viewUrl})=>{window.open(viewUrl)} },
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