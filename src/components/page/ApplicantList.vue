<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<pop  @refresh="refresh" ref="pop"></pop>
  </div>
</template>

<script>

import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/ApplicantList_pop'

const URL = '/api/applicants';

export default {
  name: 'applicantList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
        'name': 'applicant',
        'url': '/api/applicants',
        'height': 'default2',
		  	'header_btn': [
		  		{ type: 'add', click: this.addPopUp },
          { type: 'delete' },
		  		{ type: 'control' },
		  	],
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '申请人姓名', prop: 'name', sortable: true, width: '250' },
		  		{ type: 'text', label: '申请人类型', prop: 'type_name', sortable: true, width: '200' },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true, width: '200' },
		  		{ type: 'text', label: '地区', prop: 'area', sortable: true, width: '200',
            render: (h,item)=>{
              const d = this.areaMap.get(item);
              return h('span', d ? d : '');
            }  
          },
		  		{ type: 'text', label: '省份', prop: 'province', sortable: true, width: '200', 
            render: (h, item)=>{ 
              const d = this.provinceMap.get(Number.parseInt(item));
              return h('span', d ? d : '');
            } 
          },
		  		{ type: 'text', label: '城市', prop: 'city', sortable: true, width: '200', 
            render: (h, item)=>{ 
              const d = this.cityMap.get(item);
              return h('span', d ? d : '');
            }
          },
		  		{ type: 'text', label: '详细地址', prop: 'address', sortable: true, width: '200' },
		  		{ type: 'text', label: '邮编', prop: 'postcode', sortable: true, width: '200' },
		  		{ type: 'text', label: '费用备案', prop: 'fee_discount', sortable: true, width: '200', render: (h, item)=>h('span', item ? '已完成' : '未完成') },
		  		{ type: 'text', label: '英文姓名', prop: 'ename', sortable: true, width: '200' },
		  		{ type: 'text', label: '英文地址', prop: 'eaddress', sortable: true, width: '200' },
		  		{ 
		  			type: 'action',
            width: '150',
		  			btns: [
		  				{ type: 'edit', click: this.editPopUp },
		  				{ type: 'delete', click: this.applicantDelete },
		  			] 
		  		}
		  	],
		  },
		  tableData: [],
	    filter: {},
	    popType: '',
		}
  },
  computed: {
    provinceMap () {
      return this.$store.getters.provinceMap;
    },
    cityMap () {
      return this.$store.getters.cityMap;
    },
    areaMap () {
      return this.$store.getters.areaMap;
    } 
  },
  methods: {
  	addPopUp () {
  		this.$refs.pop.show('add');
  	},
  	editPopUp (row) {
  		this.$refs.pop.show('edit',row);
  	},
  	applicantDelete ({id, name} ) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除申请人成功', type: 'success'});
  					this.update();
  				}
  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{});
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const data = Object.assign({}, option);
  		const success = _=>{ this.tableData = _.applicants };

  		this.axiosGet({url, data, success});
  	},
    refresh () {
    	this.$refs.table.refresh();
    },
    update () {
    	this.$refs.table.update();
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
