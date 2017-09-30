<template>
  <div class="main">
	  <table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
    <el-dialog :visible.sync="dialogVisible" :title="row.name" class="dialog-medium" :modal="false">
      <el-form label-width="60px" label-position="left">
        <el-form-item label="标题">
          <span style="font-size: 18px; font-weight: bold;">{{ row.title }}</span>
        </el-form-item>
        <el-form-item label="內容">
          <div v-html="row.content" style="border: solid 1px #ccc; padding: 0 15px; border-radius: 5px; height: 500px; overflow: auto;" ></div>
        </el-form-item>
      </el-form>
    </el-dialog>
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
		  	'is_header': false,
        'height': 'default3',
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '模板名称', prop: 'name', width: '300' },
		  		{ type: 'text', label: '模板标题', prop: 'title' },
		  		// { type: 'text', label: '模板内容', prop: 'content' },
		  		{ 
		  			type: 'action', 
            width: '100',
		  			btns: [
		  				{ type: 'edit', click: this.edit },
		  			] 
		  		},
        ], 
        'rowClick': this.rowClick
		  },
		  tableData: [],
      row: {
        name: '',
        title: '',
        content: '',
      },
      dialogVisible: false,
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
  	},
    rowClick (row) {
      this.row = row;
      this.dialogVisible = true;
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