<template>
  <div class="main">
    <app-collapse col-title="任务查询" default-close> 
      <strainer
        @query="strainerQuery"
        @clear="strainerClear"
      ></strainer>
    </app-collapse>
     <app-filter :data="appFilterData"></app-filter>
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table">
      <template scope="scope" slot="expand">
        <edit :row="scope.row" v-show="expandType == 'edit'"></edit>
        <detail :row="scope.row" v-show="expandType  == 'detail'"></detail>
        <task-finish :id="scope.row.id" v-show="expandType  == 'finish'"></task-finish>
      </template>
    </table-component>

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
        <el-form-item label="案件类型"><el-input></el-input></el-form-item>
        <el-form-item label="关联案件"><el-input></el-input></el-form-item>
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
import axiosMixins from '@/mixins/axios-mixins'
import AppFilter from '@/components/common/AppFilter'
import AppCollapse from '@/components/common/AppCollapse'
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'
import Edit from '@/components/page_extension/PendingTask_edit'
import Detail from '@/components/page_extension/PendingTask_detail'
import TaskFinish from '@/components/common/TaskFinish'
import Strainer from '@/components/page_extension/PendingTask_strainer'
import $ from 'jquery'

const URL = '/api/tasks';

export default {
  name: 'pendingTask',
  mixins: [axiosMixins],
  methods: {
    dropGenrator(str) {
      return (row, element)=>{       
        this.expandType = str;
        $(element.target).parents("tr").find(".el-table__expand-icon").click();  
      }
    },
    taskDelete ({title, id}) {
      this.$confirm(`此操作将永久删除任务‘${title}’, 是否继续？`)
        .then(()=>{
          const url = `${URL}/${id}`;
          const success = _=>{ this.update() };

          this.axiosDelete({url, success});
        })
        .catch(()=>{});
    },
    strainerQuery (form) {
      const arr = ['due_time', 'deadline', 'end_time'];
      arr.forEach(d=>{
        form[d] = form[d].join(',');
      })
      this.filter = form;
    },
    strainerClear () {
      this.filter = {};
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, this.filter, option, this.screen_value, {status: this.task_status});
      console.log(data);
      const success = d=>{
          this.tableData = d.tasks;
          this.filters = d.tasks.filters;
      };

      this.axiosGet({url, data, success}); 
    },
    update () {
      this.$refs.table.update();
    },
    refresh () {
      this.$refs.table.refresh();
    }
    
  },
  data () {
    return {
      dialogScreenVisible: false,
      dialogTurnoutVisible: false,
      dialogAddVisible: false,
      dialogSettingVisible: false,
      filter: {},
      filters: {},
      expandOldType: '',
      expandType: '',
      checkedTest: [],
      tableOption: {
        'header_btn': [
          { type: 'custom', label: '新增', icon: 'plus', click: ()=>{ this.dialogAddVisible = true; } },
          { type: 'custom', label: '转出', icon: '', click: ()=>{ this.dialogTurnoutVisible = true; } },
          { 
            type: 'dropdown', 
            label: '数据', 
            icon: '',
            items: [
              { text: '筛选', click: ()=>{ this.dialogScreenVisible = true; } },
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
        'expandFun': (row, expanded)=>{ 
          const expands = this.$refs.table.expands;
          const old_id = expands.shift();
          if(old_id != row.id) { 
            expands.push(row.id);
          }else if( this.expandType != this.expandOldType) {
            expands.push(row.id);
          }
          this.expandOldType = this.expandType;
        },
        'columns': [
          { type: 'expand' },
          { type: 'selection'},
          { type: 'text', label: '案号', prop: 'serial'},
          { type: 'text', label: '案件名称', prop: 'title'},
          { type: 'text', label: '任务名称', prop: 'name' },
          { type: 'text', label: 'IPR', prop: 'ipr'},
          { type: 'text', label: '案件负责人', prop: 'person_in_charge', show: false},
          { type: 'text', label: '任务来源', prop: 'sender_name', show: false},
          { type: 'text', label: '代理机构名称', prop: 'agency', show: false},
          { type: 'text', label: '代理人名称', prop: 'agent'},
          { type: 'text', label: '申请日', prop: 'apd'},
          { type: 'text', label: '申请号', prop: 'apn'},
          { type: 'text', label: '开始时间', prop: 'start_time', show: false},
          { type: 'text', label: '法定期限', prop: 'deadline', show: false},
          { type: 'text', label: '指定期限', prop: 'due_time', show: false},
          { type: 'text', label: '完成时间', prop: 'end_time'},
          { type: 'text', label: '任务状态', prop: 'status', show: false},
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
              { btn_type: 'text', label: '编辑', click: this.dropGenrator('edit') },
              { btn_type: 'text', label: '详情', click: this.dropGenrator('detail') },
              { btn_type: 'text', label: '线上完成', click: this.dropGenrator('finish') },
              { type: 'delete', click: this.taskDelete },
            ],
          }
        ],
      },
      tableData: [],
    };
  },
  computed: {
    appFilterData () {
      const f = this.filters;
      const filterArr = [
        {
          label: '代理人',
          key: 'agents',
          items: [],
        },
        {
          label: '指定完成时间',
          key: 'duetime',
          items: [],
        },
        {
          label: '任务阶段',
          key: 'flownodes',
          items: [],
        }
      ];
      filterArr.forEach(d=>{
        const item = f[d.key];
        if(item) {
          item.forEach(d2=>{
            d.items.push({label: d2.name, value: d2.id});
          });
        }
      });
      return filterArr;     
    },
    screen_value () {
      const m = new Map([['agents', 'project_agent'],['duetime', 'due_time'],['roles', 'task_def_id']]);
      const obj = {};

      this.$store.getters.screen_value.forEach((d,k)=>{obj[m.get(k)] = d[0]});
      return obj;
    },
    task_status () {
      return this.$route.meta.status;
    }
  },
  watch: {
    screen_value () {
      this.$refs.table.refresh();
    },
    filter () {
      this.$refs.table.refresh();
    }
  },
  mounted () {
    this.refresh();
  },
  components: { AppFilter, TableComponent, AppDatePicker, Edit, Detail, Strainer, AppCollapse, TaskFinish },
} 
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>