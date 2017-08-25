<template>
  <div class="main">
    <strainer v-model="filter" @refresh="refresh"></strainer>
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/CopyrightList_strainer'
const URL = '/api/copyrights';

export default {
  name: 'copyrightList',
  mixins: [ AxiosMixins ],
  data () {
    return {
      tableOption: {
        'name': 'copyrightList',
        'url': URL,
        'is_filter': true,
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete' },
          { type: 'export' },
          { type: 'control', label: '字段' },
        ],
        'columns': [
          { type: 'selection' },
          { type: 'text', label: '案号', prop: 'serial', width: '203' },
          { type: 'text', label: '版权类型', prop: 'type', width: '121' },
          { type: 'text', label: '标题', prop: 'title', width: '133'},
          { type: 'text', label: '摘要', prop: 'abstract', width: '277' },
          { type: 'text', label: '申请日', prop: 'apd', sortable: true, width: '173' },
          { type: 'text', label: '申请号', prop: 'apn', width: '121' },
          { type: 'text', label: '公告日', prop: 'issue_date', width: '183' },
          { type: 'text', label: '公告号', prop: 'issue_number', width: '121' },
          { type: 'text', label: '代理人', prop: 'ipr', render: _=>_.name, width: '121' },
          { type: 'text', label: '代理机构名称', prop: 'agency', width: '143' },
          { type: 'text', label: '代理机构案号', prop: 'agency_serial', width: '138' },
          { type: 'text', label: '备注', prop: 'remark', width: '285' },
          { type: 'array', label: '申请人', prop: 'applicants', render: _=>_.map(_=>_.name), width: '190' },
          { type: 'array', label: '标签', prop: 'tags', width: '150' },
          { type: 'array', label: '产品名称', prop: 'products', sortable: true, render: _=>_.map(_=>_.name), width: '150' },
          {
            type: 'action',
            width: '150',
            btns: [
              { type: 'detail', click: this.detail },
              { type: 'delete', click: this.deleteSingle },
            ], 
          },
        ] 
      },
      tableData: [],
      filter: {},
    };
  },
  methods: {
    add () {
      this.$router.push('/copyright/add');
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option, this.filter);
      const success = d=>{this.tableData = d.copyrights};
      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    deleteSingle ({ title, id }) {
      this.$confirm(`删除后不可恢复，确认删除‘${title}’吗？`)
        .then(()=>{
          const url=`${URL}/${id}`;
          const success = _=>{this.$refs.table.update()};
          this.axiosDelete({url, success});    
        })
        .catch(()=>{});
    },
    detail ({id}) {
      const path = `/copyright/list/detail/${id}`; 
      this.$router.push( path );
    }
  },
  mounted () {
    this.$refs.table.refresh();
  },
  components: { TableComponent, Strainer }
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
