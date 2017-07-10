<template>
  <div class="main">
    <div class="row">
      <div class="left">
        <app-tree :option="treeOption"></app-tree>
      </div>
      <div class="right">
        <app-filter :data="filterData"></app-filter>
        <table-component :tableOption="tableOption" :data="tableData">         
        </table-component>
      </div>
    </div>
    <pl-filter @refreshFilter="refreshFilter" :formData="form" ref="filter"></pl-filter>
  </div>
</template>

<script>
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import AppTree from '@/components/common/AppTree'
import AppDatePicker from '@/components/common/AppDatePicker'
import PlFilter from '@/components/page_extension/PatentList_filter'

const text1 = '测试';
const text2 = '测试';
const text3 = '测试';
const urlList = 'http://www.zhiq.wang/project/lists';

export default {
  name: 'patentList',
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
        'header_btn': [
          {
            type: 'custom', 
            label: '新增', 
            icon: 'plus', 
            click () {
              alert("新增");
            }
          },
          {
            type: 'dropdown',
            label: '数据',
            icon: '',
            items: [
              { text: '筛选', click: ()=>{ this.$refs.filter.show() } },
              {text: '导出', click: ()=>{ alert("导出")} },
              {text: '删除', click: ()=>{ alert("删除")},  divided: true},
              {text: '放弃申请', click: ()=>{ alert("放弃申请")} },
              {text: '放弃维持', click: ()=>{ alert("放弃维持")} }
            ]
          }, 
          {
            type: 'control',
            label: '字段'
          }
        ],
        'columns': [

          { type: 'selection' },

          { 
            type: 'text', 
            label: '案号', 
            prop: 'serial', 
            render: (h, text, row)=>{ return h(
              'div',
              {
                style: { cursor: 'move' },
                attrs: { draggable: true,  'data-id': row.id },
                on: { dragstart: (e)=>{ this.$store.commit('setDragId', e.target.dataset.id) } },
              },
              text,
            )}            
          },
          { type: 'text', label: '地区', prop: 'area' },
          { type: 'text', label: '专利类型', prop: 'type'},
          { type: 'text', label: '客户'},
          { show: false, type: 'text', label: '交底书名称' },
          { type: 'text', label: '标题', prop: 'title'},
          { show: false, type: 'text', label: '委案日', prop: 'entrust_date'},
          { type: 'text', label: '申请日', prop: 'application_date' },
          { type: 'text', label: '申请号', prop: 'applicaton_number' },
          { show: false, type: 'text', label: '公开日', prop: 'public_date' },
          { show: false, type: 'text', label: '授权日', prop: 'issue_date' },
          { show: false, type: 'text', label: '公开号', prop: 'public_number' },
          { show: false, type: 'text', label: '授权号', prop: 'issue_number' },
          { show: false, type: 'array_name', label: '申请人', prop: 'applicant', render: (arr)=>arr.map((d)=>d.name) },
          { show: false, type: 'array_name', label: '发明人', prop: 'inventor', render: (arr)=>arr.map((d)=>d.name) },
          { show: false, type: 'text', label: '代理机构', prop: 'agency', render: (h,text)=>h('div', text.name) },
          { show: false, type: 'text', label: '代理人', prop: 'agent', render: (h,text)=>h('div', text.name) },
          { show: false, type: 'text', label: '状态', prop: 'status', render: (h, text)=>h('div', text.name) },
          { show: false, type: 'text', label: '提案人', prop: 'proposer', render: (h, text)=>h('div', text.name) },
          { show: false, type: 'text', label: '所属部门', prop: 'department', render: (h, text)=>h('div', text.name) },
          { show: false, type: 'text', label: '负责IPR', prop: 'ipr', render: (h, text)=>h('div', text.name) },
          { show: false, type: 'array', label: '标签', prop: 'tag' },
          { show: false, type: 'text', label: '技术分类', prop: 'class', render: (h, text)=>h('div', text.name) },
          { show: false, type: 'text', label: '备注', prop: 'remark' },
        ] 
      },
      tableData: [
        { serial: text1, text2, text3, id: 1},
        { serial: text1, text2, text3, id: 2},
        { serial: text1, text2, text3, id: 3},
        { serial: text1, text2, text3, id: 4},
        { serial: text1, text2, text3, id: 5},
        { serial: text1, text2, text3, id: 6},
        { serial: text1, text2, text3, id: 7}
      ],
      treeOption: {
        data: [{
          label: '一级 1',
          type: 'department',
          children: [{
            label: '二级 1-1',
            type: 'department',
            children: [{
              label: '三级 1-1-1',
              type: 'staff'
            }]
          }]
        }, {
          label: '一级 2',
          type: 'department',
          children: [{
            label: '二级 2-1',
            type: 'department',
            children: [{
              label: '三级 2-1-1',
              type: 'staff'
            }]
          }, {
            label: '二级 2-2',
            type: 'department',
            children: [{
              label: '三级 2-2-1',
              type: 'staff'
            }]
          }]
        }, {
          label: '一级 3',
          type: 'department',
          children: [{
            label: '二级 3-1',
            type: 'department',
            children: [{
              label: '三级 3-1-1',
              type: 'staff',
            }]
          }, {
            label: '二级 3-2',
            type: 'department',
            children: [{
              label: '三级 3-2-1',
              type: 'staff',
            }]
          }]
        }],
        props: {
          children: 'children',
          label: 'label',
        }
      },
      form: {
        tag: [],
        keyword: '',
      }
    };
  },
  methods: {
    refreshFilter (filter) {
      const copy = this.$tool.deepCopy(filter);
      this.form = Object.assign({}, this.form, copy);
    },
    refreshTableData () {

    }
  },
  components: {  AppFilter, TableComponent, AppTree, AppDatePicker, PlFilter }
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
