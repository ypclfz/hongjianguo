<template>
  <div class="main">
    <strainer @query="strainerQuery" @clear="strainerClear"></strainer>
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" :refresh-proxy="refreshProxy" ref="table">
      <el-select v-if="menusMap && !menusMap.get('/tasks/all')" slot="toggle" v-model="task_toggle" style="width: 110px; margin-left: 5px;">
        <el-option key="mine" label="我的任务" value="personal"></el-option>
        <el-option key="all" label="所有任务" value="all"></el-option>
      </el-select>
    </table-component>
 
    <el-dialog title="申请委案" :visible.sync="dialogAgenVisible" class="dialog-small">
      <el-form :form="agen" ref="agen" label-width="80px" :model="agen">
        <el-form-item label="代理机构" prop="agency_id" :rules="{required: true, type: 'number', message: '代理机构必填', trigger: 'change' }">
          <remote-select type="agency" v-model="agen.agency_id"></remote-select><el-button size="mini" type="text" @click="showAgencyLoad">负载</el-button>
        </el-form-item>
        <el-form-item label="代理人" prop="agency_agent" v-show="agen.agency_id !== '' ? true : false">
          <remote-select type="agent" v-model="agen.agency_agent" :para="{'agency': agen.agency_id}" ref="agent"></remote-select>
        </el-form-item>
        <el-form-item label="代理类型" prop="agency_type" :rules="{ required: true, type: 'number', message: '代理类型必填', trigger: 'change' }">
          <static-select type="agency_type" v-model="agen.agency_type"></static-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="agen.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px"><el-button @click="agenSubmit" type="primary" :disabled="btn_disabled">申请委案</el-button></el-form-item>
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

    <el-dialog title="新增任务" :visible.sync="dialogAddVisible" class="dialog-medium">
      <edit type="add" @addSuccess="addSuccess" ref="add"></edit>
    </el-dialog>
    <el-dialog title="编辑任务" :visible.sync="dialogEditVisible" class="dialog-medium">
      <edit type="edit" :row="currentRow" @editSuccess="editSuccess"></edit>
    </el-dialog>
    <el-dialog title="移交任务" :visible.sync="dialogTranserVisible" class="dialog-medium">
      <el-form label-width="80px">
        <el-form-item label="承办人">
          <remote-select type="member" v-model="transfer_person"></remote-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="transferTask" style="margin-bottom: 0px;">提交</el-button>
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

    <app-shrink :visible.sync="dialogShrinkVisible" :title="isCommon ? detailBase.title : shrinkTitle" @close="handleShrinkClose">
      <span slot="header" style="margin-left: 10px;">
        <el-tag>{{ currentRow.flow_node }}</el-tag>
        <el-tag>{{ isCommon ? detailBase.serial : currentRow.serial }}</el-tag>
      </span>
      <span slot="header" style="float: right">
        <el-button size="small" type="primary" @click="dialogEditVisible = true" v-if="menusMap && !menusMap.get('/tasks/update')">编辑</el-button>
        <el-button size="small" style="margin-left: 0px;" v-if="menusMap && !menusMap.get('/tasks/transfer')" @click="dialogTranserVisible = true; transfer_person = {id: currentRow.person_in_charge, name: currentRow.person_in_charge_name }">移交</el-button>
      </span>
      <el-tabs v-model="activeName">        
        <el-tab-pane label="前往处理" name="finish" v-if="task_status == 0">
          <task-finish :id="currentRow.id" @submitSuccess="finishSuccess" @more="handleMore"></task-finish>
        </el-tab-pane>
        <el-tab-pane label="详细信息" name="edit">          
          <information :row="currentRow" @more="handleMore"></information>          
        </el-tab-pane>
        <el-tab-pane label="相关任务" name="cccc">          
          <detail :row="currentRow" style="margin: 10px 0;"></detail>          
        </el-tab-pane>
      </el-tabs>
    </app-shrink>

    
    <common-detail 
      :type="categoryType" 
      :id="currentRow.project_id" 
      :visible.sync="moreVisible" 
      :title="currentRow.title"
      @editSuccess="editProjectSuccess"
      ref="detail">
    </common-detail>

    </app-shrink>

    

  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import Detail from '@/components/page_extension/TaskCommon_detail'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

import AppFilter from '@/components/common/AppFilter'
import AppCollapse from '@/components/common/AppCollapse'
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'

import Edit from '@/components/page_extension/TaskCommon_edit'
import Information from '@/components/page_extension/TaskCommon_information'

import TaskFinish from '@/components/common/TaskFinish'
import Strainer from '@/components/page_extension/TaskCommon_strainer'
import AppShrink from '@/components/common/AppShrink'
import CommonDetail from '@/components/page_extension/Common_detail'

import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
// import $ from 'jquery'

const URL = '/api/tasks';
const colorMap = new Map([
  [-2, '#339'],
  [-1, '#09C'],
  [0, '#3c3'],
  [1, '#f90'],
  [2, '#c03'],
]);

export default {
  name: 'taskList',
  mixins: [ AxiosMixins ],
  methods: {
    ...mapMutations([
      'showAgencyLoad',
      'addScreen',
    ]),
    handleMore (type) {
      this.moreVisible = true;
    },
    handleShrinkClose () {
      this.$refs.table.setCurrentRow();
    },
    addPop () {
      if(this.$refs.add) {
        this.$refs.add.clear();
      }
      this.dialogAddVisible = true;
    },
    agenPop () {
      const s = this.$refs.table.getSelect();
      let confirm = false;

      if(s) {
        for(let d of s) {
          if(d.agency !== "") {
            confirm = true;
            break;
          }
        }
        
        const pop = ()=>{
          if(this.$refs.agen) this.$refs.agen.resetFields();
          this.dialogAgenVisible = true;
        }

        if(confirm) {
          this.$confirm('你选择的任务中包含已委案的任务，确认继续委案？','提示',{ type: 'warning'} )
            .then(pop)
            .catch(_=>{});
        }else {
          pop();
        }
      }
    }, 
    agenSubmit () {
      this.$refs.agen.validate(_=>{
        if(_) {
          const ids = this.$refs.table.getSelect().map(_=>_.id);
          const url = '/api/tasks/agency';
          const data = Object.assign({}, this.agen, { ids });
          const success = _=>{
            this.dialogAgenVisible = false; 
            this.$message({type: 'success', message: '申请委案成功'});
            this.update();
          };
          const complete = _=>{this.btn_disabled = false};

          this.btn_disabled = true;
          this.axiosPost({url, data, success, complete});
        }else {
          this.$message({message: '请认真填写申请委案字段', type: 'warning'});
        }
      })
      
    },
    // dropGenerator(str) {
    //   return (row, element)=>{       
    //     this.expandType = str;
    //     $(element.target).parents("tr").find(".el-table__expand-icon").click();  
    //   }
    // },
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
      this.filter = form;
    },
    strainerClear () {
      this.filter = {};
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, this.filter, option, this.screen_value, {status: this.task_status}, {scope: this.task_toggle}, this.urlParams);
      const success = d=>{
        if( data['format'] == 'excel' ) {
          window.location.href = d.tasks.downloadUrl;
        }else {
          this.tableData = d.tasks;
          this.filters = d.tasks.filters; 
        }

        //初始化接口
        //PS:如果以后多个地方有这样的需求,可将filter改为与query全局相关,而不是用存储内部值的方式,这样不需要特别处理这样的需求
        if(this.install) {
          //找出对应的对象,然后插入
          const s1 = this.filters.filter(_=>_.key == 'flow_node_id')[0];
          const s2 = s1['items'].filter(_=>_.value == this.install);
          console.log(s1, s2);
          this.addScreen({name: s1.label, key: s1.key, items: s2 });
          //只触发一次
          this.install = '';
        }     
      };

      this.refreshProxy = this.axiosGet({url, data, success}); 
    },
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    transferTask () {
      const url = `${URL}/${this.currentRow.id}/transfer`
      const data = {'person_in_charge': this.transfer_person};
      const success = _=>{
        this.dialogTranserVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({message: '移交成功', type: 'success'});

        this.update();        
      }

      this.$axiosPost({url, data, success});
    },
    addSuccess () {
      this.dialogAddVisible = false;
      this.$message({message: '添加成功', type: 'success'});
      this.refresh();
    },
    editSuccess () {
      this.dialogEditVisible = false;
      this.dialogShrinkVisible = false;
      this.$message({message: '编辑成功', type: 'success'});

      this.update();
    },
    editProjectSuccess () {
      this.update();
    },
    refreshOption () {
      const t = this.task_status;
      const h = this.tableOption;
      const menusMap = this.menusMap;

      if( t === 0 ) {
        h.header_btn.splice(3,1,{type: 'custom', label: '暂停处理', click: _=>{ this.handleTask('/api/tasks/pause') }});
      }else if( t === -1 ) {
        h.header_btn.splice(3,1,{type: 'custom', label: '恢复处理', click: _=>{ this.handleTask('/api/tasks/resume') }});
      }
      menusMap && !menusMap.get('/tasks/add_btn') ? h.header_btn.splice(0,1,{ type: 'add', click: this.addPop }) : h.header_btn.splice(0,1,{}); 
      menusMap && !menusMap.get('/tasks/delete_btn') ? h.header_btn.splice(1,1,{ type: 'delete' }) : h.header_btn.splice(1,1,{});
      menusMap && !menusMap.get('/tasks/agency_btn') && t != 1 ? h.header_btn.splice(2,1,{type: 'custom', label: '申请委案', click: this.agenPop}) : h.header_btn.splice(2,1,{});

      this.$forceUpdate();
    },
    handleTask(url) {
      const s = this.$refs.table.getSelect();
      if(s) {
        const data = { ids: this.$tool.splitObj(s, 'id') };
        const success = _=>{ 
          this.$message({type: 'success', message: '操作成功'});
          this.update();
        };

        this.axiosPut({ url, data, success });
      }
    },
    proposalEdit ({project_id}) {
      this.$router.push({path: '/proposal/edit', query: {id: project_id}});
    },
    patentEdit ({id}) {
      // console.log('patentEdit')
    },
    finishSuccess () {
      this.$message({message: '完成任务成功', type: 'success'});
      this.dialogShrinkVisible = false;
      this.refresh();
    },
    titleRender (h,item,data) {
      const color = colorMap.get(data['color']);
      let str = '';
      if(data.flag == 1) {
        str += '(代)';
      }else if(data.flag == 2) {
        str += '(移)';
      }else if(data.flag == 3) {
        str += '@';
      }
      str += item;

      return ( 
        <span>
          <i class="table-flag" style={`background-color: ${color}; margin-right: 10px;`}></i> 
          <span>{ str }</span>
        </span>
      );
    },
    titleClick (data) {
      if(data.category == 0) {
        this.$router.push(`/proposal/detail?id=${data.project_id}`);
      }else if(data.category == 1) {
        this.$router.push(`/patent/list/detail/${data.project_id}`);
      }else if(data.category == 3) {
        this.$router.push(`/copyright/list/detail/${data.project_id}`);
      }
    },
    handleRowClick (row) {
      this.shrinkTitle = row.title; 
      this.currentRow = row;
      if( !this.dialogShrinkVisible ) this.dialogShrinkVisible = true;
    },
    save () {
      this.$refs.detail.edit();
    }
  },
  data () {

    return {
      dialogScreenVisible: false,
      dialogTurnoutVisible: false,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogTranserVisible: false,
      dialogSettingVisible: false,
      dialogShrinkVisible: false,
      moreVisible: false,
      moreType: '',
      filter: {},
      filters: {},
      activeName: 'finish',
      shrinkTitle: '',
      expandOldType: '',
      expandType: 'edit',
      checkedTest: [],
      currentRow: {},
      transfer_person: '',
      refreshProxy: '',
      tableOption: {
        'name': 'taskList',
        'url': URL,
        'height': 'default',
        'is_filter': true,
        'row_class': ({due_time}, index)=> {
          return ;
        },
        'header_btn': [
          {},//部分顶部按钮在refreshOption中渲染
          {},
          {},
          {},
          { type: 'export' },
          // { type: 'custom', label: '转出', icon: '', click: ()=>{ this.dialogTurnoutVisible = true; } },
          { type: 'control', label: '字段'},
          // { type: 'custom', label: '设定', icon: '', click: ()=>{ this.dialogSettingVisible = true; } }
        ],
        'header_slot': [ 'toggle' ],
        'highlightCurrentRow': true, 
        'rowClick': this.handleRowClick,
        // 'expandFun': (row, expanded)=>{ 
        //   const expands = this.$refs.table.expands;
        //   const old_id = expands.shift();
        //   if(old_id != row.id) { 
        //     expands.push(row.id);
        //   }else if( this.expandType != this.expandOldType) {
        //     expands.push(row.id);
        //   }
        //   this.expandOldType = this.expandType;
        // },
        'columns': [
          // { type: 'expand' },
          { type: 'selection' },
          { type: 'text', label: '案号', prop: 'serial', sortable: true, width: '150', show_option: false, render: this.titleRender },
          { type: 'text', label: '案件名称', prop: 'title', sortable: true, width: '200', overflow: true },
          { type: 'text', label: '管制事项', prop: 'name', sortable: true, width: '134' },
          { type: 'text', label: '流程节点', prop: 'flow_node', show: false, width: '159'},
          { type: 'text', label: 'IPR', prop: 'ipr', sortable: true, width: '200'},
          { type: 'text', label: '承办人', prop: 'person_in_charge_name', show: false, sortable: true, width: '118'},
          // { type: 'text', label: '任务来源', prop: 'sender_name', show: false},
          { type: 'text', label: '代理机构', prop: 'agency', show: false, sortable: true, width: '130'},
          { type: 'text', label: '代理人', prop: 'agent', sortable: true, width: '118'},
          { type: 'text', label: '申请日', prop: 'apd', sortable: true, width: '190'},
          { type: 'text', label: '申请号', prop: 'apn', sortable: true, width: '130'},
          { type: 'text', label: '开始时间', prop: 'start_time', show: false, sortable: true, width: '190'},
          { type: 'text', label: '完成时间', prop: 'end_time', sortable: true, width: '190'},
          { type: 'text', label: '指定期限', prop: 'due_time', show: false, sortable: true, width: '190'},
          { type: 'text', label: '定稿期限', prop: 'review_dealine', show: false, sortable: true, width: '190'},
          { type: 'text', label: '管控期限', prop: 'inner_dealine', show: false, sortable: true, width: '190'},
          { type: 'text', label: '法定期限', prop: 'deadline', show: false, sortable: true, width: '190'},
          { type: 'text', label: '备注', prop: 'remark', sortable: true, width: '250',overflow: true},
          { 
            type: 'action',
            fixed: false,
            label: '操作',
            min_width: '150',
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
        agency_type: '',
        remark: '',
      },
      dialogAgenVisible: false,
      btn_disabled: false,
      install: '',
    };
  },
  computed: {
    ...mapGetters([
      'detailBase',
      'menusMap',
    ]),
    task_status () {
      return this.$route.meta.status;
    },
    urlParams () {
      return this.$route.query;
    },
    categoryType () {
      let type = '';
      if(this.currentRow.category == 1) {
        type = 'patent';
      }
      if(this.currentRow.category == 3) {
        type = 'copyright';
      }

      return type;
    },
    isCommon () {
      return this.currentRow.category == 1 || this.currentRow.category == 3;
    }
  },  
  watch: {
    filter () {
      this.refresh();
    },
    task_toggle () {
      this.refresh();
    },
    'agen.agency_id': {
      handler (val) {
        if(val !== '') {
          this.$nextTick(_=>{
            this.$refs.agent.clear()
          });  
        }else {
          this.agen.agency_id = '';
        }
      }
    },
    menusMap () {
      this.refreshOption();
    }
  },
  mounted () {


    if(this.$route.params.id) {
      this.install = this.$route.params.id;
    }
    this.refresh();

    if(this.$store.getters.flowsData === undefined) {
      this.$store.dispatch('refreshFlows');  
    }
    
    if(this.$store.getters.taskDefsData === undefined) {
      this.$store.dispatch('refreshTaskDefs');
    }

    if(this.task_status == 1) {
      this.activeName = 'edit';
    }

    this.refreshOption();
  },
  components: { 
    RemoteSelect,
    StaticSelect,
    AppFilter, 
    TableComponent, 
    AppDatePicker, 
    Edit, 
    Strainer, 
    AppCollapse, 
    TaskFinish, 
    AppShrink, 
    Information,
    CommonDetail,
    Detail,
  },
} 
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>