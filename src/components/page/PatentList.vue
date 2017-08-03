<template>
  <div class="main">

    <table-component :tableOption="tableOption" :data="tableData"></table-component>
    <!-- <pl-filter @refreshFilter="refreshFilter" :formData="form" ref="filter"></pl-filter> -->
  </div>
</template>

<script>
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import AppTree from '@/components/common/AppTree'
import AppDatePicker from '@/components/common/AppDatePicker'
import PlFilter from '@/components/page_extension/PatentList_filter'

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
          { type: 'text', label: '专利状态', prop: 'status', render: (h,item)=>h('span', item ? '正常' : '暂停处理') },
          { type: 'text', label: '专利标题', prop: 'title', sortable: true },
          { type: 'text', label: '专利摘要', prop: 'abstract'},
          { type: 'text', label: '备注' },
          { type: 'text', label: '创建时间', prop: 'create_time', sortable: true },
          { type: 'text', label: '更新时间', prop: 'update_time', sortable: true },
          { type: 'text', label: '删除时间', prop: 'delete_time', sortable: true },
          { type: 'text', label: '技术分类', prop: 'classification', sortable: true, render: (h,item)=>h('span', item.name) },
          { type: 'text', label: '部门名称', prop: 'branch', sortable: true, render:  (h,item)=>h('span', item.name) },
          { type: 'text', label: '产品名称', prop: 'product', sortable: true, render: (h,item)=>h('span', item.name) },
          { 
            type: 'array', 
            label: '专利人', 
            prop: 'proposer', 
            render: arr=>{
              return arr.map(d=>d.name);
            },
          },
          {
            type: 'array',
            label: '发明人',
            prop: 'inventors',
            render: arr=>{
              return arr.map(d=>`${d.name}: ${d.share}%`)
            },
          },
          {
            type: 'array',
            label: '标签',
            prop: 'tags',
          },
          {
            type: 'action',
            btns: [
              { type: 'detail', click: ({id})=>{ this.$router.push(`/patent/list/detail/${id}`); } }
            ], 
          },
        ] 
      },
      tableData: [],
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
  created () {
    this.tableData = {
    total:1,//总数
    data:[{
      id:"1",//专利ID
      status:"1",//专利状态，1-正常 0-暂停处理
      title:"title",//专利标题
      abstract:"1",  //专利摘要
      remark:"remark",//备注
      create_time:"create_time",//创建时间
      update_time:"update_time",//更新时间
      delete_time:"delete_time",//删除时间
      branch:{id:"部门ID",name:"部门名称"},
      product:{id:1,name:"产品名称",remark:"备注"},//
      proposer:[{id:"用户ID",name:"专利人姓名",mobile:"专利人手机",email:"专利人邮箱"}],//专利人
      classification:{id:"技术分类ID",name:"技术分类名称",description:"技术分类描述"},
      product:{id:"产品ID",name:"产品名称",remark:"产品描述"},
      tags:["tag"],//标签
      inventors:[{id:"发明人ID",name:"发明人姓名",share:"发明人份额",sort:"发明人排序"}],//发明人
    }]
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
