<template>
	<div class="main">
    <app-filter :data="filterParameter" @screenChange="screenChange"></app-filter>
		<table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
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
    screenChange (screen) {
      console.log(screen);
    },
    sortChange (col) {
      console.log(col);
    },
    timeSearch (startTime, endTime) {
      if( startTime && endTime ) {
        console.log(this.getDay(startTime));
        console.log(this.getDay(endTime));
      }else {
        this.$alert("请选择日期", {type: 'warning', closeOnClickModal: true});
      }
    },
    getDay (t) {
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
  },
  data () {
    return {
      tableOption: {
        'header_btn': [
            { type: 'custom', label: '新增', icon: 'plus', click: this.add },
            { type: 'custom', label: '删除', icon: 'delete', click: this.bulkDelete },
            { type: 'control', label: '字段' },
            { type: 'day', search: this.timeSearch },
        ],
        'default_sort': {prop: 'create_time', order: 'descending'},
        'sortChange': this.sortChange,
        'columns': [
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
          key: 'user1',
          items: ['提案人一', '提案人二','提案人三'],
          multipled: true
        },
        {
          label: '发明人',
          key: 'user2',
          items: ['发明人一', '发明人二', '发明人三'],
          multipled: true
        }
      ]
    }
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