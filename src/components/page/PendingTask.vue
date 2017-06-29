<template>
  <div class="main">
    <app-filter :data="filterData"></app-filter>
    <table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
    <el-dialog title="设置任务提醒偏好" :visible.sync="dialogSettingVisible" class="dialog-mini">
      <el-form label-position="top">
        <el-form-item label="请输入要提前标红色任务到期天数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="请输入要顶部显示的任务到期天数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="编辑任务时的默认案件类型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增任务" :visible.sync="dialogAddVisible" class="dialog-small">
      <el-form label-position="right" label-width="100px" >
        <el-form-item label="案件类型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="关联案件">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="任务阶段">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="任务处理人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="撰稿人/外代">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="指定完成时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="官方绝限">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户期限">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style="margin: 0;">
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="将选中任务转给以下任务处理人" :visible.sync="dialogTurnoutVisible" class="dialog-mini">
      <el-form label-position="top">
        <el-form-item label="任务处理人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="期限">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checkedTest">任务处理人更新为案件的负责人</el-checkbox>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
          h('el-form-item', [h('el-button', { attrs: { type: 'primary' }, on: { click: function(){ console.log(this);} } }, '保存')]),
        ]
      );
    },
  },
  data () {
    return {
      dialogTurnoutVisible: false,
      dialogAddVisible: false,
      dialogSettingVisible: false,
      checkedTest: [],
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
          { type: 'custom', label: '新增', icon: 'plus', click: ()=>{ this.dialogAddVisible = true; } },
          { type: 'custom', label: '转出', icon: '', click: ()=>{ this.dialogTurnoutVisible = true; } },
          { 
            type: 'dropdown', 
            label: '数据', 
            icon: '',
            items: [
              { text: '筛选', click: ()=>{ this.$alert("筛选"); } },
              { text: '导出' },
              { text: '删除', divided: true },
              { text: '标记为已完成状态' },
              { text: '标记未处理中状态', divided: true },
              { text: '标记为待客户确认状态' },
              { text: '客户确认继续' },
            ],
          },
          { type: 'control', label: '字段'},
          { type: 'custom', label: '设定', icon: '', click: ()=>{ this.dialogSettingVisible = true; } }
        ],
        'columns': [
          { 
            type: 'expand',
            render: {
              'edit': this.editRender,
              'detail': (h, scope)=>{ return h('h1', '这里是详情') },
              'finish': (h, scope)=>{ return h('h1', '这里是线上完成') },
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
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>