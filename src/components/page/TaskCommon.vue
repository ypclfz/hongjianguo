<template>
  <div class="main">
     <strainer @query="strainerQuery" @clear="strainerClear"></strainer>
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table">
      <el-select slot="toggle" v-model="task_toggle" style="width: 110px; margin-left: 5px;">
        <el-option key="mine" label="我的任务" value="personal"></el-option>
        <el-option key="all" label="所有任务" value="all"></el-option>
      </el-select>
      <template scope="scope" slot="expand">
        <edit :row="scope.row" type="edit" v-if="expandType == 'edit'" @editSuccess="editSuccess"></edit>
        <detail :row="scope.row" v-if="expandType  == 'detail'"></detail>
        <task-finish :id="scope.row.id" v-if="expandType  == 'finish'" @submitSuccess="finishSuccess"></task-finish>
      </template>
    </table-component>

    <el-dialog title="委案" :visible.sync="dialogAgenVisible">
      <el-form :form="agen" ref="agen" label-width="80px">
        <el-form-item label="代理机构" prop="agency_id">
          <remote-select type="agency" v-model="agen.agency_id"></remote-select>
        </el-form-item>
        <el-form-item label="代理人" prop="agency_agent">
          <remote-select type="agent" v-model="agen.agency_agent"></remote-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="agen.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px"><el-button @click="agenSubmit" type="primary" :disabled="btn_disabled">确认委案</el-button></el-form-item>
      </el-form>
    </el-dialog>

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
      <edit type="add" @addSuccess="addSuccess"></edit>
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
import RemoteSelect from '@/components/form/RemoteSelect'
import AxiosMixins from '@/mixins/axios-mixins'
import AppFilter from '@/components/common/AppFilter'
import AppCollapse from '@/components/common/AppCollapse'
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'
import Edit from '@/components/page_extension/TaskCommon_edit'
import Detail from '@/components/page_extension/TaskCommon_detail'
import TaskFinish from '@/components/common/TaskFinish'
import Strainer from '@/components/page_extension/TaskCommon_strainer'
import $ from 'jquery'

const URL = '/api/tasks';

export default {
  name: 'taskList',
  mixins: [ AxiosMixins ],
  methods: {
    agenPop () {
      const s = this.$refs.table.getSelect();
      if(s) {
        if(this.$refs.agen) this.$refs.agen.resetFields();
        this.dialogAgenVisible = true;
      }
    }, 
    agenSubmit () {
      const ids = this.$refs.table.getSelect().map(_=>_.id);
      const url = '/api/tasks/agency';
      const data = Object.assign({}, this.agen, { ids });
      const success = _=>{
        this.dialogAgenVisible = false; 
        this.$message({type: 'success', message: '委案成功'});
        this.update();
      };
      const complete = _=>{this.btn_disabled = false};

      this.btn_disabled = true;
      this.axiosPost({url, data, success, complete});
    },
    dropGenerator(str) {
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
        form[d] = form[d][0] == ''&&form[d][0] == '' ? '' : form[d].join(',');
      })
      this.filter = form;
    },
    strainerClear () {
      this.filter = {};
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, this.filter, option, this.screen_value, {status: this.task_status}, {scope: this.task_toggle});
      const success = d=>{
        if( data['format'] == 'excel' ) {
          window.open(d.tasks.downloadUrl);
        }else {
          this.tableData = d.tasks;
          this.filters = d.tasks.filters; 
        }
         
      };

      this.axiosGet({url, data, success}); 
    },
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    addSuccess () {
      this.refresh();
    },
    editSuccess () {
      this.update();
      this.$message({message: '编辑成功', type: 'success'});
    },
    refreshOption () {
      const t = this.task_status;
      const h = this.tableOption;
      if( t === 0 ) {
        h.header_btn.splice(3,1,{type: 'custom', label: '暂停处理', click: _=>{ this.handleTask('/api/tasks/pause') }});
      }else if( t === -1 ) {
        h.header_btn.splice(3,1,{type: 'custom', label: '恢复处理', click: _=>{ this.handleTask('/api/tasks/resume') }});
      }

      this.$forceUpdate();
    },
    handleTask(url) {
      const s = this.$refs.table.getSelect();
      if(s) {
        
        const data = { ids: this.$tool.splitObj(s, 'id') };
        const success = _=>{ 
          this.$message({type: 'success', message: '操作成功'})
          this.update() 
        };

        this.axiosPut({ url, data, success });
      }
    },
    proposalEdit ({project_id}) {
      this.$router.push({path: '/proposal/edit', query: {id: project_id}});
    },
    patentEdit ({id}) {
      console.log('patentEdit')
    },
    finishSuccess () {
      this.$message({message: '操作成功', type: 'success'});
      this.refresh();
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
        'name': 'taskList',
        'url': URL,
        'is_filter': true,
        'row_class': ({due_time}, index)=> {
          return this.$tool.detectionTime(due_time);
        },
        'header_btn': [
          { type: 'add', click: ()=>{ this.dialogAddVisible = true; } },
          { type: 'delete' },
          { type: 'export' },
          {},
          { type: 'custom', label: '委案', click: this.agenPop },
          // { type: 'custom', label: '转出', icon: '', click: ()=>{ this.dialogTurnoutVisible = true; } },
          { type: 'control', label: '字段'},
          // { type: 'custom', label: '设定', icon: '', click: ()=>{ this.dialogSettingVisible = true; } }
        ],
        'header_slot': [ 'toggle' ],
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
          { type: 'selection', fixed: false},
          { type: 'text', label: '案号', prop: 'serial', sortable: true, width: '122'},
          { type: 'text', label: '案件名称', prop: 'title', sortable: true, width: '150'},
          { type: 'text', label: '管制事项', prop: 'name', sortasble: true, width: '134' },
          { type: 'text', label: 'IPR', prop: 'ipr', sortable: true, width: 94},
          { type: 'text', label: '承办人', prop: 'person_in_charge_name', show: false, sortable: true, width: '118'},
          // { type: 'text', label: '任务来源', prop: 'sender_name', show: false},
          { type: 'text', label: '代理机构', prop: 'agency', show: false, sortable: true, width: '130'},
          { type: 'text', label: '代理人', prop: 'agent', sortable: true, width: '118'},
          { type: 'text', label: '申请日', prop: 'apd', sortable: true, width: '190'},
          { type: 'text', label: '申请号', prop: 'apn', sortable: true, width: '130'},
          { type: 'text', label: '开始时间', prop: 'start_time', show: false, sortable: true, width: '190'},
          { type: 'text', label: '完成时间', prop: 'end_time', sortable: true, width: '190'},
          { type: 'text', label: '指定期限', prop: 'due_time', show: false, sortable: true, width: '190'},
          { type: 'text', label: '法定期限', prop: 'deadline', show: false, sortable: true, width: '190'},
          { type: 'text', label: '当前节点', prop: 'flow_node', show: false, width: '159'},
          { type: 'text', label: '备注', prop: 'remark', sortable: true, width: '134'},
          { 
            type: 'action',
            fixed: false,
            label: '操作',
            min_width: '250',
            align: 'left',
            btns: [
              // { 
              //   type: 'dropdown', 
              //   label: '发送邮件',
              //   items: [
              //     { text: '立案通知' },
              //     { text: '发明人看稿' },
              //     { text: 'IPR看稿' },
              //     { text: '委案处理' },
              //   ],
              // },
              { btn_type: 'text', label: '详情', click: this.dropGenerator('edit') },
              { btn_type: 'text', label: '相关', click: this.dropGenerator('detail') },
              { btn_type: 'text', label: '完成', click: this.dropGenerator('finish') },
              { btn_type: 'text', label: '删除', click: this.taskDelete },
              { btn_type: 'text', label: '编辑提案', click: this.proposalEdit, btn_if: _=>_.action == 'proposals/edit' },
              { btn_type: 'text', label: '编辑专利', click: this.patentEdit, btn_if: _=>_.action == 'patents/edit'},
            ],
          }
        ],
      },
      tableData: [],
      task_toggle: 'personal',
      agen: {
        agency_id: '',
        agency_agent: '',
        remark: '',
      },
      dialogAgenVisible: false,
      btn_disabled: false,
    };
  },
  computed: {
    task_status () {
      return this.$route.meta.status;
    }
  },
  watch: {
    filter () {
      this.refresh();
    },
    task_toggle () {
      this.refresh();
    },
  },
  mounted () {

    this.refresh();
    this.$store.dispatch('refreshFlows');
    this.$store.dispatch('refreshTaskDefs');

    this.refreshOption();
  },
  components: { RemoteSelect, AppFilter, TableComponent, AppDatePicker, Edit, Detail, Strainer, AppCollapse, TaskFinish },
} 
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>