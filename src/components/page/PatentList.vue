<template>
  <div class="main">
    <strainer v-model="filter" @refresh="refresh"></strainer>
    
    <table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" :refresh-proxy="refreshProxy">
      <el-button slot="download" :loading="downloadLoading" icon="share" @click="downloadPop" type="primary" style="margin-left: 5px;">批量下载</el-button>
    </table-component>
    
    <app-shrink :title="currentRow.title" :visible.sync="shrinkVisible" @close="close">
      <common-detail type="patent" :id="currentRow.id"></common-detail>
    </app-shrink>
    <el-dialog title="批量下载" :visible.sync="downloadVisible">
      <el-form>
        <el-form-item label="文件类型">
          <static-select type="file_type" v-model="downloadFileType" multiple></static-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="downloadAxios">下载</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppFilter from '@/components/common/AppFilter'
import TableComponent from '@/components/common/TableComponent'
import AppTree from '@/components/common/AppTree'
import AppDatePicker from '@/components/common/AppDatePicker'
import Strainer from '@/components/page_extension/PatentList_strainer'
import AppShrink from '@/components/common/AppShrink'
import CommonDetail from '@/components/page_extension/Common_detail'
import StaticSelect from '@/components/form/StaticSelect'

const URL = '/api/patents';
const PATENT_TYPE = ['发明专利', '实用新型', '外观设计']; 

export default {
  name: 'patentList',
  mixins: [ AxiosMixins ],
  data () {
    return {
      refreshProxy: '',
      currentRow: '',
      shrinkVisible: false,
      
      downloadVisible: false,
      downloadIds: [],
      downloadFileType: [],
      downloadLoading: false,
      
      tableOption: {
        'name': 'patentList',
        'url': URL,
        'height': 'default',
        'highlightCurrentRow': true, 
        'rowClick': this.handleRowClick,
        'is_filter': true,
        'import_type': 'patent',
        'upload_type': 'patent',
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete' }, 
          { type: 'export' },
          { type: 'import' },
          { type: 'batch_upload' },
          { type: 'control', label: '字段' },
        ],
        'header_slot': ['download'],
        'columns': [

          { type: 'selection' },
          // { type: 'text', label: '专利状态', prop: 'status', render: (h,item)=>h('span', item ? '正常' : '暂停处理') },
          { type: 'text', label: '案号', prop: 'serial', sortable: true, width: '142' },
          { type: 'text', label: '专利类型', prop: 'type', render_simple: 'name', sortable: true, is_import: true, width: '142',  },
          { type: 'text', label: '地区', prop: 'area', render_simple: 'name', sortable: true, is_import: true, width: '142' },
          { type: 'text', label: '专利标题', prop: 'title', sortable: true, is_import: true, width: '142' },
          { type: 'text', label: '当前状态', prop: 'progress', render_simple: 'name', sortable: true, width: '180' },
          { type: 'text', label: '专利摘要', prop: 'abstract', sortable: true, width: '500'},
          { type: 'text', label: '申请日', prop: 'apd', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: '申请号', prop: 'apn', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: '公开日', prop: 'public_date', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: '公开号', prop: 'public_number', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: '初审合格日', prop: 'pre_exam_ok_date', sortable: true, width: '263'},
          { type: 'text', label: '进入实审日', prop: 'sub_exam_start_date', sortable: true, width: '263'},
          { type: 'text', label: '公告日', prop: 'issue_date', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: '公告号', prop: 'issue_number', sortable: true, is_import: true, width: '263'},
          { type: 'text', label: 'IPR', prop: 'ipr', render_simple: 'name', sortable: true, is_import: true, width: '175' },
          { type: 'text', label: '主国际分类号', prop: 'main_ipc', sortable: true, width: '263'},
          { type: 'text', label: '国际申请日', prop: 'pct_apd', sortable: true, width: '263'},
          { type: 'text', label: '国际申请号', prop: 'pct_no', sortable: true, width: '263'},
          { type: 'text', label: '国际优先权日', prop: 'pct_priority_date', sortable: true, width: '263'},
          { type: 'text', label: '国际公开日', prop: 'pct_public_date', sortable: true, width: '263'},
          { type: 'text', label: '国际公开语言', prop: 'pct_public_language', sortable: true, width: '263'},
          { type: 'text', label: '国际公开号', prop: 'pct_public_no', sortable: true, width: '263'},
          { type: 'text', label: '复审委内编号', prop: 'board_number', sortable: true, width: '263'},
          { type: 'text', label: '说明书字数', prop: 'words', sortable: true, width: '263'},
          { type: 'text', label: '备注', prop: 'remark', sortable: true, width: '500'},
          { 
            type: 'text', 
            label: '提案人',
            prop: 'proposer',
            sortable: true,
            width: '123',
            is_import: true,
            render_simple: 'name',
          },
          {
            type: 'array',
            label: '申请人',
            prop: 'applicants',
            width: '300',
            is_import: true,
            render: _=>{
              return _.map(_=>_.name);
            }
          },
          {
            type: 'array',
            label: '发明人',
            width: '238',
            prop: 'inventors',
            is_import: true,
            render: _=>_.map(_=>_.name),
          },
          {
            type: 'array',
            label: '标签',
            prop: 'tags',
            is_import: true,
            width: '145',
          },
          { type: 'text', label: '部门名称', prop: 'branch', sortable: true, render:  (h,item)=>h('span', item.name), width: '142' },
          { 
            type: 'text', 
            label: '技术分类', 
            width: '142' ,
            prop: 'classification', 
            sorable: true,
            is_import: true,
            render_simple: 'name', 
          },
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
            type: 'array',
            label: '相关案件',
            prop: 'relative_projects',
            width: '200',
            render: _=>_.map(_=>`${_.title}-${_.serial}`),

          },
          {
            type: 'action',
            width: '145',
            btns: [
              // { type: 'detail', click: this.detail },
              { type: 'delete', click: this.deletePatent },
            ], 
          },
        ] 
      },
      tableData: [],
      filter: {},
    };
  },
  computed: {
    areaMap () {
      return this.$store.getters.areaMap;
    }
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
          window.location.href = d.patents.downloadUrl;
        }else {
          this.tableData = d.patents;
        }
        
      };

      this.refreshProxy = this.axiosGet({url, data, success});
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
    },
    handleRowClick (row) {
      this.currentRow = row;
      if(!this.shrinkVisible) this.shrinkVisible = true;
    },
    close () {
      this.$refs.table.setCurrentRow();
    },
    downloadPop () {
      const select = this.$refs.table.getSelect();
      
      if(select) {
        this.downloadIds = this.$tool.splitObj(select, 'id');
        this.downloadVisible = true;
      }
    },
    downloadAxios () {
      if(this.downloadFileType == '') {
        this.$message({message: '请选择文件类型', type: 'warning'});
        return;
      }

      const url = '/patents/documents/download';
      const data = {ids: this.downloadIds, type: this.downloadFileType };
      const success = _=>{ 
        window.location.href = _.url;
      };
      const complete = _=>{ this.downloadLoading = false; };

      this.downloadVisible = false;
      this.downloadLoading = true;
      this.axiosPost({url, data, success, complete})
    }
  },
  mounted () {
    this.$refs.table.refresh();
  },
  components: {  
    AppFilter, 
    TableComponent, 
    AppTree, 
    AppDatePicker, 
    Strainer, 
    AppShrink, 
    CommonDetail,
    StaticSelect,
  },
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
