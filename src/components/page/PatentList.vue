<template>
  <div class="main">
    <strainer v-model="filter" @refresh="refresh"></strainer>
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import AppTree from '@/components/common/AppTree'
import AppDatePicker from '@/components/common/AppDatePicker'
import Strainer from '@/components/page_extension/PatentList_strainer'

const URL = '/api/patents';

export default {
  name: 'patentList',
  mixins: [ AxiosMixins ],
  computed: {
    leftHeight () {
      return document.querySelector(".row").clientHeight;
    }
  },
  data () {
    return {
      filterData: [
        {
          label: '标签',
          key: 'tag',
          items: ['标签一', '标签二', '标签三'],
          multipled: true
        }
      ],
      tableOption: {
        'url': URL,
        'header_btn': [
          {
            type: 'custom', 
            label: '新增', 
            icon: 'plus', 
            click: this.add,
          },
          {
            type: 'delete',
          }, 
          {
            type: 'control',
            label: '字段'
          },
          {
            type: 'export',
          }
        ],
        'columns': [

          { type: 'selection' },
          { type: 'text', label: '专利状态', prop: 'status', render: (h,item)=>h('span', item ? '正常' : '暂停处理') },
          { type: 'text', label: '专利标题', prop: 'title', sortable: true },
          { type: 'text', label: '专利摘要', prop: 'abstract'},
          { type: 'text', label: '备注' },
          { type: 'text', label: '创建时间', prop: 'create_time', sortable: true },
          { type: 'text', label: '更新时间', prop: 'update_time', sortable: true },
          { type: 'text', label: '删除时间', prop: 'delete_time', sortable: true },
          { type: 'text', label: '技术分类', prop: 'classification', sortable: true, render: (h,item)=>h('span', item.name) },
          { type: 'text', label: '部门名称', prop: 'branch', sortable: true, render:  (h,item)=>h('span', item.name) },
          { 
            type: 'array', 
            label: '产品名称', 
            prop: 'products', 
            sortable: true, 
            render: arr=>{
              return arr.map(d=>d.name);
            }, 
          },
          { 
            type: 'text', 
            label: '专利人', 
            prop: 'proposer', 
            render: (h, item)=>h('span', item.name),
          },
          {
            type: 'array',
            label: '发明人',
            prop: 'inventors',
            render: arr=>{
              return arr.map(d=>`${d.name}: ${d.share}%`);
            },
          },
          {
            type: 'array',
            label: '标签',
            prop: 'tags',
          },
          {
            type: 'action',
            width: '130px',
            btns: [
              { type: 'detail', click: this.detail },
              { type: 'delete', click: this.deletePatent },
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
      this.$router.push('/patent/add');
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option, this.filter);
      const success = d=>{this.tableData = d.patents};
      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    deletePatent ({ title, id }) {
      this.$confirm(`删除后不可恢复，确认删除‘${title}’吗？`)
        .then(()=>{
          const url=`${URL}/${id}`;
          const success = _=>{this.$refs.table.update()};
          this.axiosDelete({url, success});    
        })
        .catch(()=>{});
    },
    detail ({id}) {
      const path = `/patent/list/detail/${id}`; 
      this.$router.push( path );
    }
  },
  mounted () {
    this.$refs.table.refresh();
  },
  components: {  AppFilter, TableComponent, AppTree, AppDatePicker, Strainer }
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
