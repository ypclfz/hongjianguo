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
    <app-filter :data="appFilterData"></app-filter>
    		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData">
          <template slot="expand" scope="scope">
            <el-steps :space="200" :active="1">
              <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>
          </template>
          <template slot="action" scope="scope">
            <el-button icon="information" size="mini" @click="detail(scope.row)" v-if="scope.row.status">详情</el-button>
            <el-button icon="edit" size="mini" @click="edit(scope.row)" v-else>编辑</el-button>
            <el-button icon="delete" size="mini" @click="deleteSingle(scope.row)">删除</el-button>
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
            console.log('aaaaaaaa');
            const url = URL;
            const data = { ids: this.$tool.splitObj(s, 'id') };
            const success = _=>{ this.update() };
            console.log(url, data);

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
      const params = Object.assign({}, option, this.filter, this.screen_value);
      
      this.$axios.get('/api/proposals', { params }).then(response=>{this.tableData = response.data.proposals; this.filters=response.data.proposals.filters;});
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
        'url': URL,
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete', click: this.deleteMul },
          { type: 'export' },
          { type: 'control', label: '字段' },
        ],
        'default_sort': { prop: 'create_time', order: 'descending' },
        'sortChange': this.sortChange,
        'columns': [
          { type: 'expand' },
          { type: 'selection'},
          { type: 'text', label: '创建时间', prop: 'create_time', sortable: true, width: '176' },
          { type: 'text', label: '更新时间', prop: 'update_time', sortable: true, width: '172' },
          { type: 'text', label: '案件名称', prop: 'title',sortable: true, width: '120' },
          { type: 'text', label: '案件摘要', prop: 'abstract', sortable: true, width: '122' },
          { type: 'text', label: '当前节点', prop: 'flow_node', sortable: true, width: '118' },
          { 
            type: 'text', 
            label: '技术联系人', 
            prop: 'proposer',
            sortable: true,
            render:  (h,item)=>{return h('span', item.name)},
            width: '148',
          },
          { 
            type: 'array', label: '发明人', prop: 'inventors',
            render: (arr)=>{
             return arr.map(d=>d.name);
            },
            width: '158'
          },
          { type: 'array', label: '标签', prop: 'tags', width: '135' },
          { type: 'text', label: '备注', prop: 'remark', sortable: true },
          // { type: 'text', label: '案件状态', prop: 'status', sortable: true },
          { type: 'text', label: '相关专利', prop: 'projects', width: '103' },
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
      filter: {
      },
      title: '',
      classification: [],
      product: [],
      proposer: [],
      tags: [],
      inventors: [],
      filters: {},
    }
  },
  computed: {

    appFilterData () {
      const f = this.filters;
      const filterArr = [
        {
          label: '提案阶段',
          key: 'flownodes',
          items: [],
        },
        {
          label: '创建时间',
          key: 'time',
          items: [],
        }
      ];
      filterArr.forEach(d=>{
        const item = f[d.key];
        if(item) {
          item.forEach(d2=>{
            d.items.push({label: d2.name, value: d2.id, count: d2.count});
          });
        }
      });
      return filterArr;
    },
    screen_value () {
      const obj = {};
      this.$store.getters.screen_value.forEach((d,k)=>{obj[k] = d[0]});
      return obj;
    }
  },
  watch: {
    screen_value (val) {
      this.refresh();
    }
  },
  components: { TableComponent, AppFilter, AppCollapse, Classification, Product, InventorSelect, Member, Tag, AppFilter } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>