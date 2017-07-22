<template>
	<div class="main">
    <app-filter :data="filterParameter"></app-filter>
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
        <el-button icon="delete" size="mini" @click="delete(scope.row)">删除</el-button>
      </template>
    </table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppFilter from '@/components/common/AppFilter'

const url = 'http://www.zhiq.wang/proposal/lists';
const delete_url = 'http://www.zhiq.wang/proposal/lists';
const tag_url = 'http://www.zhiq.wang/tag/lists';
export default {
  name: 'proposalList',
  methods: {
    add () {
      this.$router.push('/proposal/add');
    },
    edit (row) {
      const arr = [];
      for(let a of row.inventors) {
        arr.push(a.name);
      }
      row.inventors = arr;
      this.$router.push({path: '/proposal/list/edit', query: row});
    },
    delete (row) {
      this.$confirm(`确认删除${row.title}?`, {type: 'warning', closeOnClickModal: false})
        .then(()=>{
          this.$http.post(delete_url, {id: row.id}).then(data=>{
            
            const body = data.body;
            if(body.status) {
              this.tableData = body.list;
            }else {
              this.$alert("删除失败");
            }
          }).catch(err=>{
            console.log(err);
            this.$alert("网络请求错误");
          });
        })
        .catch(()=>{console.log("取消")});
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
    timeSearch (startTime, endTime) {
      if( startTime && endTime ) {
        this.urlOption.time = [this.getDay(startTime), this.getDay(endTime)];
      }else {
        this.$alert("请选择日期范围", {type: 'warning', closeOnClickModal: true});
      }
    },
    timeClear () {
      if(this.urlOption.time.length != 0) this.urlOption.time = []; 
    },
    getDay (t) {
      t = new Date(t);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
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
          { type: 'date', key: 'time' },
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
        tags: '',
        proposer: '',
        inventors: '',
      },
    }
  },
  computed: {
    screen_value () {
      return this.$store.getters.screen_value;
    },
    tagOptions () {
      return this.$store.getters.tagOptions;
    }
  },
  watch: {
    screen_value () {

      const map = this.screen_value;
      const arr = ['tags', 'proposer', 'inventors'];
      arr.forEach( (v)=>{ this.filter[v] = map.has(v) ? map.get(v).join(',') : ""; } );
      this.$refs.table.refresh();

    },
    tagOptions () {
      this.filterParameter[0].items = this.$tool.deepCopy(this.$store.getters.tagOptions);
    }
  },
  created () {
    // this.filterParameter[0].items = this.$tool.deepCopy(this.$store.getters.tagOptions);
    // this.$axios.get('/api/proposals').then(response=>{this.tableData = response.data.proposals});
    // this.$http.post(url, {'tag': '标签一'}).then(data=>{ data.status ? this.tableData = data.body.list : this.$alert('获取表格数据失败') }, error=>{console.log(error)});
    
    // this.$http.get(tag_url)
    //   .then(data=>{
    //     const body = data.body; 
    //     if(body.status) {
    //       const arr = [];
    //       for(let d of body.tags) {
    //         arr.push(d["tag"]);
    //       }
    //       this.filterParameter[0].items.push(...arr);
    //     }else {
    //       this.$alert('获取标签列表失败!');
    //     }
    //   },
    //   error=>{console.log(error)});
  },
  components: { TableComponent, AppFilter } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>