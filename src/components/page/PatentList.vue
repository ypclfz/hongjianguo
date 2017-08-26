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
const PATENT_TYPE = ['发明专利', '实用新型', '外观设计']; 

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
      tableOption: {
        'name': 'patentList',
        'url': URL,
        'is_filter': true,
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete' }, 
          { type: 'control', label: '字段' },
          { type: 'export' },
        ],
        'columns': [

          { type: 'selection' },
          // { type: 'text', label: '专利状态', prop: 'status', render: (h,item)=>h('span', item ? '正常' : '暂停处理') },
          { type: 'text', label: '案号', prop: 'serial', width: '142' },
          { type: 'text', label: '专利类型', prop: 'type', width: '142',
            render: (h,item)=>{
              const tex = PATENT_TYPE[item-1]; 
              return h('span', tex ? tex : '');
            } 
          },
          { type: 'text', label: '地区', prop: 'area', width: '142' },
          { type: 'text', label: '专利标题', prop: 'title', sortable: true, width: '142',
            render: (h,item,{id})=>{
              return h('a', {
                attrs: {
                  href: 'javascript:void(0)'
                },
                on: {
                  click: _=>{this.detail({id})}
                },
              },item);
            }
          },
          { type: 'text', label: '专利摘要', prop: 'abstract', width: '263'},
          { type: 'text', label: '申请日', prop: 'apd', width: '263'},
          { type: 'text', label: '申请号', prop: 'apn', width: '263'},
          { type: 'text', label: '公开日', prop: 'public_date', width: '263'},
          { type: 'text', label: '公开号', prop: 'public_number', width: '263'},
          { type: 'text', label: '初审合格日', prop: 'pre_exam_ok_date', width: '263'},
          { type: 'text', label: '进入实审日', prop: 'sub_exam_start_date', width: '263'},
          { type: 'text', label: '公告日', prop: 'issue_date', width: '263'},
          { type: 'text', label: '公告号', prop: 'issue_number', width: '263'},
          { type: 'text', label: '备注', width: '175' },
          { type: 'text', label: 'IPR', prop: 'ipr', render: (h,item)=>h('span',item.name),sortable: true, width: '175' },
          { type: 'text', label: '主国际分类号', prop: 'main_ipc', width: '263'},
          { type: 'text', label: '国际申请日', prop: 'pct_apd', width: '263'},
          { type: 'text', label: '国际申请号', prop: 'pct_no', width: '263'},
          { type: 'text', label: '国际优先权日', prop: 'pct_priority_date', width: '263'},
          { type: 'text', label: '国际公开日', prop: 'pct_public_date', width: '263'},
          { type: 'text', label: '国际公开语言', prop: 'pct_public_language', width: '263'},
          { type: 'text', label: '国际公开号', prop: 'pct_public_no', width: '263'},
          { type: 'text', label: '复审委内编号', prop: 'board_number', width: '263'},
          { type: 'text', label: '说明书字数', prop: 'words', width: '263'},
          { type: 'text', label: '备注', prop: 'remark', width: '263'},
          { 
            type: 'text', 
            label: '申请人',
            width: '123', 
            prop: 'proposer', 
            render: (h, item)=>h('span', item.name),
          },
          {
            type: 'array',
            label: '发明人',
            width: '238',
            prop: 'inventors',
            render: arr=>{
              return arr.map(d=>`${d.name}: ${d.share}%`);
            },
          },
          {
            type: 'array',
            label: '标签',
            prop: 'tags',
            width: '145',
          },
          { type: 'text', label: '部门名称', prop: 'branch', sortable: true, render:  (h,item)=>h('span', item.name), width: '142' },
          { type: 'text', label: '技术分类', prop: 'classification', sorable: true, render: (h,item)=>('span', item.name), width: '142' },
          { 
            type: 'array',
            label: '优先权',
            prop: 'priorities',
            width: '145',
            render: _=>_.map(_=>_.number),
          },
          { 
            type: 'array', 
            label: '产品名称',
            width: '212', 
            prop: 'products', 
            sortable: true, 
            render: _=>_.map(_=>_.name),
          },
          {
            type: 'text',
            label: '申请人',
            prop: 'proposer',
            width: '145',
            render: (h,item)=>h('span', item.name),
          },
          {
            type: 'array',
            label: '相关案件',
            prop: 'relative_projects',
            width: '145',
            render: _=>_.map(_=>_.title),

          },
          {
            type: 'action',
            width: '145',
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
      const success = d=>{
        if(data['format'] == 'excel') {
          window.open(d.downloadUrl);
        }else {
          this.tableData = d.patents;  
        }
        
      };
      
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
