<template>
  <div class="main">
    <!-- <strainer v-model="filter" @refresh="refresh"></strainer> -->
  	<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  	<pop-panel ref="pop" @refresh="handlePopRefresh"></pop-panel>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
// import Strainer from '@/components/page_extension/strainer'
import PopPanel from '@/components/page_extension/InventorList_pop'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/inventors'

export default {
  name: 'inventorList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
        'name': 'inventorList',
        'url': URL,
        'height': 'default2',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPop },
          { type: 'delete' },
		  		{ type: 'control' },
		  	],
		  	'columns': [
          { type: 'selection' },
		  		{ type: 'text', label: '发明人姓名', prop: 'name', sortable: true, width: '200' },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true, width: '400' },
		  		{ type: 'text', label: '地区', prop: 'citizenship', sortable: true, width: '200' },
		  		{ type: 'text', label: '手机', prop: 'mobile', sortable: true, width: '200' },
		  		{ type: 'text', label: '邮箱', prop: 'email', sortable: true, width: '200' },
		  		{ type: 'text', label: '不公开姓名', prop: 'not_disclose_name', render: (h,item)=>h('span',item ? '不公开' : '公开'), sortable: true, width: '200' },
		  		{ type: 'text', label: '英文姓名', prop: 'name_en', render: (h,item, row)=>h('span', `${row.given_name}${row.family_name}`), width: '200' },
		  		{ 
		  			type: 'action',
            width: '200',
		  			btns: [
		  				{ type: 'edit', click: this.editPop },
		  				{ type: 'delete', click: this.deleteSingle },
		  			]
		  		}
		  	]
		  },
		  tableData: [],
      filter: {},
		}
  },
  methods: {
  	addPop () {
  		this.$refs.pop.show();
  	},
  	editPop (col) {
  		this.$refs.pop.show('edit', col);
  	},
  	deleteSingle ({id, name}) {
  		this.$confirm(`删除后不可恢复，确认删除发明人‘${name}’？`)
        .then(_=>{
          const url = `${URL}/${id}`;
          const success = _=>{
            this.$message({message: '删除发明人成功', type: 'success'});
            this.update();
          };

          this.axiosDelete({url, success});
        })
        .catch(_=>{});
  	},
  	refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option);
      const success = _=>{ this.tableData = _.data };

      this.axiosGet({url, data, success});
  	},
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    handlePopRefresh (key) {
      if(key == 'add') {
        this.refresh();
      }
      if(key == 'edit') {
        this.update();
      }
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent, PopPanel }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>