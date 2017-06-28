<template>
  <div class="main">
    <app-filter :data="filterData"></app-filter>
    <table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
  </div>
</template>

<script>
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import $ from 'jquery'

export default {
  name: 'pendingTask',
  methods: {
    edit (row, element) {
      this.$refs.table.expandType = 'edit';
      $(element.target).parents("tr").find(".el-table__expand-icon").click();
    },
    detail (row, element) {
      this.$refs.table.expandType = 'detail';
      $(element.target).parents("tr").find(".el-table__expand-icon").click();
    },
    finish (row, element) {
      this.$refs.table.expandType = 'finish';
      $(element.target).parents("tr").find(".el-table__expand-icon").click();
    },
    editRender (h, scope) {
      return h(
        'el-form',
        {
          attrs: {
            'label-position': 'right',
            'label-width': '120px',
          }
        },
        [
          h('el-form-item', { attrs: { label: '任务处理人' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '指定完成时间' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '官方绝限' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '任务类型' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '任务阶段' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '客户期限' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '撰稿人/外代' } }, [h('el-input')]),
          h('el-form-item', { attrs: { label: '备注' } }, [h('el-input')]),
        ]
      );
    },
  },
  data () {
    return {
      filterData: [
        {
          'label': '任务阶段：',
          'key': 'jd',
          'items': ['专利撰稿','专利内审中', '发明人审核'],
        },
        {
          'label': '完成期限：',
          'key': 'time',
          'items': ['已过期', '本周', '下月'],
        },
        {
          'label': '是否一撰：',
          'key': 'is',
          'items': ['仅显示一撰', '二撰及以后'],
        }
      ],
      tableOption: {
        'header_btn': [
          { type: 'custom', label: '新增', icon: 'plus' },
          { type: 'custom', label: '转出', icon: '' },
          { type: 'dropdown', label: '数据', icon: ''},
          { type: 'control', label: '字段'},
          { type: 'custom', label: '设定', icon: '' }
        ],
        'columns': [
          { 
            type: 'expand',
            render: {
              'edit': this.editRender,
              'detail': (h,scope)=>{ return h('h1', '这里是详情') },
              'finish': (h,scope)=>{ return h('h1', '这里是线上完成') },
            } 
          },
          { type: 'selection'},
          { type: 'text', label: '案号', prop: 'number'},
          { type: 'text', label: '地区'},
          { type: 'text', label: '案件类型'},
          { type: 'text', label: '客户'},
          { type: 'text', label: '案件名称', show: false},
          { type: 'text', label: '申请号', show: false},
          { type: 'text', label: '注册号/专利号', show: false},
          { type: 'text', label: '任务名称'},
          { type: 'text', label: '任务开始时间'},
          { type: 'text', label: '指定完成时间'},
          { type: 'text', label: '官方绝限', show: false},
          { type: 'text', label: '客户绝限', show: false},
          { type: 'text', label: '完成时间', show: false},
          { type: 'text', label: '任务处理人'},
          { type: 'text', label: '案件负责人', show: false},
          { type: 'text', label: '任务来源', show: false},
          { type: 'text', label: '任务来源', show: false},
          { type: 'text', label: '撰稿人/外代', show: false},
          { type: 'text', label: '任务状态', show: false},
          { type: 'text', label: '备注', show: false},
          { 
            type: 'action', 
            label: '操作',
            width: '300px',
            btns: [
              { 
                type: 'dropdown', 
                label: '发送邮件',
                items: [
                  { text: '立案通知' },
                  { text: '发明人看稿' },
                  { text: 'IPR看稿' },
                  { text: '委案处理' },
                ],
              },
              { btn_type: 'text', label: '编辑', click: this.edit },
              { btn_type: 'text', label: '详情', click: this.detail },
              { btn_type: 'text', label: '线上完成', click: this.finish },
            ],
          }
        ],
      },
      tableData: [
        { number: '测试数据', id: 1 },
        { number: '测试数据', id: 2 },
        { number: '测试数据', id: 3 },
        { number: '测试数据', id: 4 },
        { number: '测试数据', id: 5 },
      ],
    };
  },
  components: { AppFilter, TableComponent },
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>