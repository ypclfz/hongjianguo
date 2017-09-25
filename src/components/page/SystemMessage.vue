<template>
  <div class="main">
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" >

      </table-component>

  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AxiosMixins from '@/mixins/axios-mixins'


const URL = '/api/mails';

export default {
  name: 'systemMessage',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  tableOption: {
		  	'is_header': false,
        'height': 'default3',
		  	'columns': [
		  		// { type: 'array', label: '发件人地址', prop: 'from', render: _=>[_.value ? _.value : _], sortable: true, width: '200' },
		  		// { type: 'array', label: '收件人地址', prop: 'to', render: arr=>arr.map(_=>_.value ? _.value : _), sortable: true, width: '200' },
		  		{ type: 'text', label: '发送时间', prop: 'mail_date', sortable: true, width: '200' },
          { type: 'text', label: '标题', prop: 'subject', overflow: true, width: '300',
            render: (h,item,row)=>{
              return ( <span>{ row.read ? <i class="table-flag table-flag-read"></i> : <i class="table-flag table-flag-unread"></i> }<span style="margin-left: 5px;">{ item }</span></span> );
            } 
          },
          { type: 'text', label: '内容', prop: 'content', overflow: true, overflow: true },
		  	],
        rowClick: this.handleRowClick,

		  },
		  tableData: [],
		}
  },
  methods: {
    refreshTableData (option) {
      const url = URL;
      const mailbox = {'mailbox': 3};
      const data = Object.assign({}, option, mailbox);
      const success = _=>{this.tableData = _.mails;}

      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    handleRowClick ({id}) {
      const query = { id };
      const path = '/news/systemMessage/detail';
      this.$router.push({path, query});
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>