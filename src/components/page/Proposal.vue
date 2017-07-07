<template>
	<div class="main">
    <app-filter :data="filterParameter"></app-filter>
		<table-component :tableOption="tableOption" :data="tableData" ref="table">
      <template slot="expand" scope="scope">
        <el-steps :space="200" :active="1">
          <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
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
  name: 'proposal',
  methods: {
    bulkDelete () {
      const s = this.$refs.table.getSelection();
      if(s["length"] == 0) {
        this.$alert("请选择需要删除的提案", {type: 'warning', closeOnClickModal: true});
      }else {
        this.$confirm("确认删除?", {type: 'warning', closeOnClickModal: false}).then(()=>{console.log("删除")}).catch(()=>{console.log("取消")});
      }
    },
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
    sortChange (col) {
      console.log(col);
      this.urlOption.sort_field = col.prop;
      this.urlOption.sort = col.order == 'descending' ? 'desc' : 'asc';
    },
    handleStatus (status) {
      this.urlOption.status = status; 
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
    updateTableData () {

    }
  },
  data () {
    return {
      tableOption: {
        'header_btn': [
          { type: 'custom', label: '新增', icon: 'plus', click: this.add },
          { type: 'custom', label: '删除', icon: 'delete', click: this.bulkDelete },
          { type: 'control', label: '字段' },
          { type: 'date', search: this.timeSearch, clear: this.timeClear },
        ],
        'handleCurrentChange': (page)=>{ this.urlOption.page = page; }, 
        'handleSizeChange': (pagesize)=>{ this.urlOption.pagesize = pagesize; },
        'handleSearch': (val)=>{ this.urlOption.keyword = val; },
        'default_sort': {prop: 'create_time', order: 'descending'},
        'sortChange': this.sortChange,
        'columns': [
          { type: 'expand'},
          { type: 'selection'},
          { type: 'text', label: '提案时间', prop: 'create_time', sortable: true,},
          { type: 'text', label: '案件名称', prop: 'title',sortable: true },
          { type: 'text', label: '案件摘要', prop: 'abstract'},
          { type: 'text', label: '技术联系人', prop: 'proposer', sortable: true },
          { 
            type: 'array', label: '发明人', prop: 'inventors',
            render: ({inventors})=>{
              const arr = [];
              for(let d of inventors) {
                arr.push(d["name"]);
              }
              return arr;
            }
          },
          { type: 'array', label: '标签', prop: 'tags' },
          { type: 'text', label: '案件状态', prop: 'status', sortable: true },
          {
            type: 'action', 
            label: '操作', 
            btns: [{
              label: '编辑',
              icon: 'edit',
              click: this.edit,
            },{
              label: '删除',
              icon: 'delete',
              click: this.delete,
            }]
          },
        ]
      },
      tableData: [],
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
      urlOption: {
        page: 1,
        pagesize: 5,
        status: 1,
        keyword: '',
        tag: [],
        proposer: [],
        inventor: [],
        time: [],
        sort_field: '',
        sort: '',
      },
    }
  },
  computed: {
    screen_value () {
      return this.$store.getters.screen_value;
    }
  },
  watch: {
    screen_value () {
      const map = this.screen_value;
      const arr = ['tag', 'proposer', 'inventor'];
      arr.forEach( (v)=>{ this.urlOption[v] = map.has(v) ? map.get(v) : []; } );
    },
    urlOption: {
      handler: function () {
        console.log("bbbb");
      },
      deep: true,
    },
  },
  created () {

    this.$http.post(url, {'tag': '标签一'}).then(data=>{ data.status ? this.tableData = data.body.list : this.$alert('获取表格数据失败') }, error=>{console.log(error)});
    
    this.$http.get(tag_url)
      .then(data=>{
        const body = data.body; 
        if(body.status) {
          const arr = [];
          for(let d of body.tags) {
            arr.push(d["tag"]);
          }
          this.filterParameter[0].items.push(...arr);
        }else {
          this.$alert('获取标签列表失败!');
        }
      },
      error=>{console.log(error)});
  },
  components: { TableComponent, AppFilter } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>