<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/templates'

export default {
  name: 'settingTemplate',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
		  	'is_search': false,
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '模板名称', prop: 'name' },
		  		{ type: 'text', label: '模板标题', prop: 'title' },
		  		{ type: 'text', label: '模板内容', prop: 'content' },
		  		{ 
		  			type: 'action', 
		  			btns: [
		  				{ type: 'edit', click: this.edit },
		  			] 
		  		},
		  	] 
		  },
		  tableData: [],
		}
  },
  methods: {
  	refreshTableData (option) {
  		const url = URL;
  		const data = option;
  		const success = _=>{ this.tableData = _.tasks };

  		this.axiosGet({url, data, success});
  	},
  	edit ({id}) {
  		this.$router.push({path: '/setting/template/edit', query: {id} });
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>