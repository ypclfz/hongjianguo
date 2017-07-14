<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
	<pop-panel ref="pop" @refreshTableData="refreshTableData" @refreshFilter="refreshFilter"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PopPanel from '@/components/page_extension/ApplicantList_pop'

export default {
  name: 'applicantList',
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
		  		{ type: 'text', label: '申请人姓名', prop: 'name', sortable: true },
		  		{ type: 'text', label: '申请人类型', prop: 'type', sortable: true },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true },
		  		{ type: 'text', label: '地区', prop: 'area', sortable: true },
		  		{ type: 'text', label: '省份', prop: 'province', sortable: true },
		  		{ type: 'text', label: '城市', prop: 'city', sortable: true },
		  		{ type: 'text', label: '详细地址', prop: 'address', sortable: true },
		  		{ type: 'text', label: '邮编', prop: 'postcode', sortable: true },
		  		{ type: 'text', label: '费用备案', prop: 'fee_discount', sortable: true },
		  		{ type: 'text', label: '英文姓名', prop: 'ename', sortable: true },
		  		{ type: 'text', label: '英文地址', prop: 'eaddress', sortable: true },
		  		{ 
		  			type: 'action',
		  			btns: [
		  				{ type: 'edit', click: this.editPopUp },
		  				{ type: 'delete', click: this.delete },
		  			] 
		  		}
		  	],
		  },
		  tableData: [{   		
				id: '1',
	      type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
	      name:"name",//申请人姓名
	      identity:"identity",//证件号码
	      area:"area",//地区代码
	      province:"province",//省份代码
	      city:"city",//城市代码
	      address:"address",//详细地址
	      postcode:"postcode",//邮编
	      fee_discount:"0",//费用备案 0未完成 1已完成
	      ename:"ename",//英文姓名
	      eaddress:"eaddress",//英文地址
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
