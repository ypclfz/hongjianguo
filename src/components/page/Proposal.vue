<template>
	<div class="main">
    <app-collapse style="margin-bottom: 20px;" col-title="提案筛选" default-close>
   
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="提案标题">
              <el-input></el-input>
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

const url = 'http://www.zhiq.wang/proposal/lists';
const delete_url = 'http://www.zhiq.wang/proposal/lists';
const tag_url = 'http://www.zhiq.wang/tag/lists';
const strainerArr = ['classification', 'product', 'proposer', 'tags', 'inventors'];
export default {
  name: 'proposalList',
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
    detail (row) {
      this.$router.push({path: '/proposal/detail', query: {id: row.id}});
    },
    bulkDelete () {
      const s = this.$refs.table.getSelection();
      if(s["length"] == 0) {
        this.$alert("请选择需要删除的提案", {type: 'warning', closeOnClickModal: true});
      }else {
        this.$confirm("确认删除?", {type: 'warning', closeOnClickModal: false}).then(()=>{console.log("删除")}).catch(()=>{console.log("取消")});
      }
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
      const params = Object.assign({}, option, this.filter);
      console.log(params);
      this.$axios.get('/api/proposals', { params }).then(response=>{this.tableData = response.data.proposals});
    },
  },
  data () {
    return {
      tableOption: {
        'header_btn': [
          { type: 'add', click: this.add },
          { type: 'delete', click: this.bulkDelete },
          { type: 'control', label: '字段' },
        ],
        'default_sort': { prop: 'create_time', order: 'descending' },
        'sortChange': this.sortChange,
        'columns': [
          { type: 'expand' },
          { type: 'selection'},
          { type: 'text', label: '创建时间', prop: 'create_time', sortable: true },
          { type: 'text', label: '更新时间', prop: 'update_time', sortable: true },
          { type: 'text', label: '案件名称', prop: 'title',sortable: true },
          { type: 'text', label: '案件摘要', prop: 'abstract', sortable: true },
          { 
            type: 'text', 
            label: '技术联系人', 
            prop: 'proposer',
            sortable: true,
            render:  (h,item)=>{return h('span', item.name)},
          },
          { 
            type: 'array', label: '发明人', prop: 'inventors',
            render: (arr)=>{
             return arr.map(d=>d.name);
            }
          },
          { type: 'array', label: '标签', prop: 'tags' },
          { type: 'text', label: '备注', prop: 'remark' },
          // { type: 'text', label: '案件状态', prop: 'status', sortable: true },
          {
            type: 'action', 
            label: '操作', 
            btns_render: 'action',
          },
        ]
      },
      tableData: [

      ],
      filterParameter: [
        {
          label: '标签',
          key: 'tag',
          items: [],
          multipled: true
        }, 
        {
          label: '提案人',
          key: 'proposer',
          items: [
            {label: '提案人一', value: 1},
            {label: '提案人二', value: 2},
            {label: '提案人三', value: 3},
          ], 
          multipled: true
        },
        {
          label: '发明人',
          key: 'inventor',
          items: [
            {label: '提案人一', value: 1},
            {label: '提案人二', value: 2},
            {label: '提案人三', value: 3}
          ],
          multipled: true
        }
      ],
      filter: {
      },
      title: '',
      classification: [],
      product: [],
      proposer: [],
      tags: [],
      inventors: [],
    }
  },
  created () {
    
  },
  components: { TableComponent, AppFilter, AppCollapse, Classification, Product, InventorSelect, Member, Tag } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>