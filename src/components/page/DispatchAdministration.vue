<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
  	<pop @refresh="handlePopRefresh" ref="pop"></pop>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/DispatchAdministration_pop'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/expresses'

export default {
  name: 'dispatchAdministration',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
		  		{ type: 'control' },		  		
		  	],
        'height': 'default2',
		  	'columns': [
		  		{ type: 'text', label: '快递公司', prop: 'company' },
          { type: 'text', label: '快递单号', prop: 'number' },
          { type: 'text', label: '发件日期', prop: 'mail_date' },
          { type: 'text', label: '收件日期', default: '暂未收件', prop: 'receipt_date' },
          { type: 'text', label: '收件人', render_simple: 'name', prop: 'to' },
          { type: 'text', label: '发件人', render_simple: 'name', prop: 'from' },
          { type: 'array', label: '文件信息', prop: 'projects', 
            render (array) {
              return array.map(_=>`${_.name}: ${_.type.join(";")}`);
            }
          },
          { type: 'text', label: '发文描述', prop: 'description' },
          { 
		  			type: 'action', 
		  			btns: [
		  				{ type: 'edit', click: this.editPop },
		  				{ type: 'delete', click: this.deleteSingle },
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
  		const success = _=>{ 
        console.log(_);
        this.tableData = _.list;
        console.log(this.tableData);
      };

  		this.axiosGet({url, data, success});
  	},
  	edit ({id}) {
  		this.$router.push({path: '/setting/template/edit', query: {id} });
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	update () {
  		this.$refs.table.update();
  	},
  	addPop () {
  		this.$refs.pop.show('add');
  	},
  	editPop (row) {
  		this.$refs.pop.show('edit', row);
  	},
  	deleteSingle ({id}) {
  		this.$confirm('删除后不可恢复，确认删除当前收发文记录？', '提示', {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除成功', type: 'success' });
  					this.update();
  				}

  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{})
  	},
  	handlePopRefresh (t) {
  		t === 'add' ? this.refresh() : this.update();
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { TableComponent, Pop }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>