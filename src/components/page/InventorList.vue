<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
	<pop-panel ref="pop"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopPanel from '@/components/page_extension/InventorList_pop' 

export default {
  name: 'inventorList',
  data () {
		return {
		  option: {
		  	'header_btn': [
		  		{ type: 'add', click: this.addPopUp },
		  		{ type: 'filter', click: this.filterPopUp },
		  		{ type: 'control' },
		  	],
		  	'columns': [
		  		{ type: 'text', label: '发明人姓名', prop: 'name' },
		  		{ type: 'text', label: '证件号码', prop: 'identity' },
		  		{ type: 'text', label: '地区', prop: 'area' },
		  		{ type: 'text', label: '手机', prop: 'mobile' },
		  		{ type: 'text', label: '邮箱', prop: 'email' },
		  		{ type: 'text', label: '不公开姓名', prop: 'public_name' },
		  		{ type: 'text', label: '英文姓名', prop: 'name_en' },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.editPopUp },
		  				{ type: 'delete', click: this.delete },
		  			]
		  		}
		  	]
		  },
		  tableData: [{
		  	id: '1',
  			name:"name",//发明人姓名
        identity:"identity",//证件号码
        area:"area",//地区代码
        mobile:"mobile",//手机
        email:"email",//邮箱
        public_name:"public_name",//不公开姓名   
        name_en:"name_en",//英文姓名
      }],
      filter: {},
		}
  },
  methods: {
  	addPopUp () {
  		this.$refs.pop.show();
  	},
  	filterPopUp () {
  		this.$refs.pop.show('filter', this.filter);
  	},
  	editPopUp (col) {
  		this.$refs.pop.show('edit', col);
  	},
  	delete (col) {
  		this.$alert(`删除${col.id}`);
  	},
  	refreshTableData (data) {
  		this.tableData = data;
  	}
  },
  components: { TableComponent, PopPanel }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>