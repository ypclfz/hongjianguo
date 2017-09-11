<template>
	<div class="main">
    <app-collapse style="margin-bottom: 20px;" col-title="提案筛选" default-close>
   
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="提案标题">
              <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="技术分类">
              <classification v-model="classification" multiple></classification>
            </el-form-item>
            <el-form-item label="产品分类">
              <product v-model="product" multiple></product>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发明人">
              <inventor-select v-model="inventors" multiple></inventor-select>
            </el-form-item>
            <el-form-item label="提案人">
              <member v-model="proposer" multiple></member>
            </el-form-item>
            <el-form-item label="标签">
              <tag v-model="tags" multiple></tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <el-button type="info" size="small" @click="query">查询</el-button>
          <el-button type="danger" size="small" @click="clear" style="margin-left: 20px">清空</el-button>
        </el-row>
      </el-form>
    
    </app-collapse>
    		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData">
          <template slot="action" scope="scope">
            <el-button icon="information" size="mini" @click="detail(scope.row)" v-if="scope.row.status">详情</el-button>
            <el-button icon="edit" size="mini" @click="edit(scope.row)" v-else>编辑</el-button>
            <el-button icon="delete" size="mini" @click="deleteSingle(scope.row)" v-if="!scope.row.status">删除</el-button>
          </template>
        </table-component>

  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppFilter from '@/components/common/AppFilter'
import AppCollapse from '@/components/common/AppCollapse'
import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import InventorSelect from '@/components/form/InventorSelect'
import Member from '@/components/form/Member'
import Tag from '@/components/form/Tag'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/proposals';
const url = 'http://www.zhiq.wang/proposal/lists';
const delete_url = 'http://www.zhiq.wang/proposal/lists';
const tag_url = 'http://www.zhiq.wang/tag/lists';
const strainerArr = ['classification', 'product', 'proposer', 'tags', 'inventors'];
const map = new Map([['flownodes', 'progress'],['time', 'create_time']]);
export default {
  name: 'proposalList',
  mixins: [ AxiosMixins ],
  methods: {
    add () {
      this.$router.push('/proposal/add');
    },
    edit (row) {
      this.$router.push({path: '/proposal/edit', query: {id: row.id}});
    },
    deleteSingle (row) {
      this.$confirm(`删除后不可恢复，确认删除“${row.title}”?`, {type: 'warning'})
        .then(()=>{
          this.$axios
            .delete(`/api/proposals/${row.id}`)
            .then(response=>{
              console.log(response);
              const d = response.data;

              if(d.status) {
                this.$refs.table.refresh();
              }else {
                this.$alert("删除失败！", {type: 'error'});
              }
            })
            .catch(err=>{
              console.log(err);
              this.$alert("网络错误！", {type: 'error'});
            });
        })
        .catch(()=>{})
    },
    deleteMul () {
      const s = this.$refs.table.tableSelect;
      if(s.length == 0) {
        this.$message({message: '请选择需要删除的提案', type: 'warning'});
        return false;
      }else {
        this.$confirm('删除后不可恢复，确认删除？')
          .then(_=>{
            const url = URL;
            const data = { ids: this.$tool.splitObj(s, 'id') };
            const success = _=>{ this.update() };

            this.axiosDelete({ url, data, success });
          })
          .catch(_=>{console.log(_)});
      }
    },
    detail (row) {
      this.$router.push({path: '/proposal/detail', query: {id: row.id}});
    },
    query () {
      const obj = {};
      
      obj.title = this.title;
      strainerArr.forEach(d=>{obj[d] = this[d].join(',')});

      this.filter = obj;
      this.$refs.table.refresh();
    },
    clear () {
      this.title = "";
      strainerArr.forEach(d=>{this[d] = []});

      this.filter = {};
      this.$refs.table.refresh();
    },
    refreshTableData (option) {
      const url = '/api/proposals';
      const data = Object.assign({}, option, this.filter, this.screen_value);
      const success = _=>{
        if(data.format == 'excel') {
          window.open(_.proposals.downloadUrl);
        }else {
          this.tableData = _.proposals;
          this.filters = _.proposals.filters;
        }
      }
      
      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    }
  },
  data () {
    return {
      tableOption: {
        'name': 'proposalList',
        'url': URL,
        'is_filter': true,
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete', click: this.deleteMul },
          { type: 'export' },
          { type: 'control', label: '字段' },
        ],
        'columns': [
          { type: 'selection'},
          { type: 'text', label: '案号', prop: 'serial', sortable: true, width: '200' },
          { type: 'text', label: '提案标题', prop: 'title', sortable: true, width: '300' },
          { type: 'text', label: '提案摘要', prop: 'abstract', sortable: true, width: '400' },
          { type: 'text', label: '创建时间', prop: 'creat_time', sortable: true, width: '250' },
          { type: 'text', label: '部门', prop: 'branch', render_simple: 'name', sortable: true, width: '200' },
          { type: 'text', label: '技术分类', prop: 'classification', render_simple: 'name', sortable: true, width: '200' },
          { type: 'array', label: '产品分类', prop: 'products', render: _=>_.map(_=>_.name), width: '200' },
          { type: 'text', label: '提案人', prop: 'proposer', render_simple: 'name', sortable: true, width: '200' },
          { type: 'array', label: '发明人', prop: 'inventors', render: _=>_.map(_=>`${_.name}：${_.share}%；`), overflow: true, width: '200' },
          { type: 'array', label: '标签', prop: 'tags', width: '200' },
          { type: 'text', label: '备注', prop: 'remark', width: '400' },
          {
            type: 'action',
            label: '操作', 
            btns_render: 'action',
            width: '161',
          },
        ]
      },
      tableData: [

      ],
      filter: {},
      title: '',
      classification: [],
      product: [],
      proposer: [],
      tags: [],
      inventors: [],
      filters: {},
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent, AppFilter, AppCollapse, Classification, Product, InventorSelect, Member, Tag, AppFilter }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>