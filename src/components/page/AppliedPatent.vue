<template>
  <div class="main">
    <div class="row">
      <div class="left">
        <app-tree :option="treeOption"></app-tree>
      </div>
      <div class="right">
        <app-filter :data="filterData"></app-filter>
        <table-component :tableOption="tableOption" :data="tableData">
          
            <h1 slot="text1">where</h1>
          
        </table-component>
      </div>
    </div>
  </div>
</template>

<script>
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import AppTree from '@/components/common/AppTree'

const text1 = '测试';
const text2 = '测试';
const text3 = '测试';

export default {
  name: 'appliedPatent',
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
          tidy: ['标签一', '标签二', '标签三'],
          items: ['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八'],
          multipled: true
        },
        {
          label: '时间',
          key: 'time',
          items: ['2017', '2016', '2015', '2014', '2013'],
          multipled: true
        },
        {
          label: '类别',
          key: 'type',
          items: ['类别一', '类别二', '类别三', '类别四', '类别五'],
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
              {text: '筛选', click: ()=>{alert("筛选")}},
              {text: '导出', click: ()=>{alert("导出")}},
              {text: '删除', click: ()=>{alert("删除")},  divided: true},
              {text: '放弃申请', click: ()=>{alert("放弃申请")}},
              {text: '放弃维持', click: ()=>{alert("放弃维持")}}
            ]
          }, 
          {
            type: 'control',
            label: '字段'
          }
        ],
        'columns': [

          { type: 'expand', render: {'': (h, scope)=>{return h('h1', 'fire!!!')} } },
          { type: 'selection' },

          { 
            type: 'text', 
            label: '案号', 
            prop: 'text1', 
            render: (h, scope)=>{ return h(
              'div',
              {
                style: { cursor: 'move' },
                attrs: { draggable: true,  'data-id': scope.row.id },
                on: { dragstart: (e)=>{ this.$store.commit('setDragId', e.target.dataset.id) } },
              },
              scope.row.text1,
            )}            
          },
          { type: 'text', label: '地区' },
          { type: 'text', label: '专利类型'},
          { type: 'text', label: '客户'},
          { type: 'text', label: '交底书名称', show: false},
          { type: 'text', label: '标题'},
          { type: 'text', label: '委案日', show: false},
          { type: 'text', label: '申请日'},
          { type: 'text', label: '申请号'},
          { type: 'text', label: '公开日', show: false},
          { type: 'text', label: '公开号', show: false},
          { type: 'text', label: '授权日', show: false},
          { type: 'text', label: '授权号', show: false},
          { type: 'text', label: '申请人', show: false},
          { type: 'text', label: '发明人', show: false},
          { type: 'text', label: '负责代理人'},
          { type: 'text', label: '分所', show: false},
          { type: 'text', label: '案源人', show: false},
          { type: 'text', label: 'IPR'},
          { type: 'text', label: '当前状态'}
        ] 
      },
      tableData: [
        {text1, text2, text3, id: 1},
        {text1: '内容', text2, text3, id: 2},
        {text1: '分发内容', text2, text3, id: 3},
        {text1: '分发内容3', text2, text3, id: 4},
        {text1, text2, text3, id: 5},
        {text1, text2, text3, id: 6},
        {text1, text2, text3, id: 7}
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
    };
  },
  components: {  AppFilter, TableComponent, AppTree}
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
