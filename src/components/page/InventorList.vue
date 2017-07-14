<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
	<pop-panel ref="pop" @refreshFilter="refreshFilter" @refreshTableData="refreshTableData"></pop-panel>
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
          { type: 'delete', click: this.delete_s },
		  		{ type: 'filter', click: this.filterPopUp },
		  		{ type: 'control' },
		  	],
		  	'columns': [
          { type: 'selection' },
		  		{ type: 'text', label: '发明人姓名', prop: 'name', sortable: true },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true },
		  		{ type: 'text', label: '地区', prop: 'area', sortable: true },
		  		{ type: 'text', label: '手机', prop: 'mobile', sortable: true },
		  		{ type: 'text', label: '邮箱', prop: 'email', sortable: true },
		  		{ type: 'text', label: '不公开姓名', prop: 'public_name', sortable: true },
		  		{ type: 'text', label: '英文姓名', prop: 'name_en', sortable: true },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.editPopUp },
		  				{ type: 'delete', click: this.delete },
		  			]
		  		}
		  	]
		  },
		  tableData: [
        {
  		  	id: '1',
    			name:"name",//发明人姓名
          identity:"identity",//证件号码
          area:"area",//地区代码
          mobile:"mobile",//手机
          email:"email",//邮箱
          public_name:"public_name",//不公开姓名   
          name_en:"name_en",//英文姓名
        },
        { id: '2',name: 'name2' },
        { id: '3',name: 'name3' },
        { id: '4',name: 'name4' },
        { id: '5',name: 'name5' },
        { id: '6',name: 'name6' },
        { id: '7',name: 'name7' },
        { id: '8',name: 'name8' },
        { id: '9',name: 'name9' },
      ],
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
    delete_s () {
      this.$alert('批量删除');
    },
  	refreshTableData (flag) {
  		if(flag) {
        this.$refs.table.reset();
      }

      console.log(Object.assign({}, this.$refs.table.requesOption, this.filter));
  	},
    refreshFilter (filter) {
      this.filter = filter;
    }
  },
  components: { TableComponent, PopPanel }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>