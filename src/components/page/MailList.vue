<template>
  <div class="main">
			<strainer v-model="filter" @refresh="refresh"></strainer>
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" >
        <el-select v-model="mailbox" slot="mailbox" style="width: 150px">
          <el-option v-for="item in options.mailbox" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/MailList_strainer'
import AxiosMixins from '@/mixins/axios-mixins'


const URL = '/api/mails';

export default {
  name: 'mailList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  options: {
        mailbox: [
  		  	{ label: '收件箱', value: 1 },
  		  	{ label: '发件箱', value: 2 },
          { label: '草稿箱', value: 0 },
          { label: '系统内消息', value: 3 }
  		  ] 
      },
		  props: {
		  	'label': 'label',
		  	'children': 'children',
		  },
		  currentNodeKey: 1,
		  tableOption: {
		  	'header_btn': [
		  		{ type: 'custom', label: '写邮件', icon: 'edit', click: this.add },
		  		{ type: 'delete' },
		  	],
        'header_slot': [ 'mailbox' ],
		  	// 'is_search': false,
		  	'columns': [
		  		{ type: 'selection', width: '50' },
		  		{ type: 'array', label: '发件人邮箱', prop: 'from', render: _=>[_.value ? _.value : _], sortable: true, width: '200' },
		  		{ type: 'array', label: '收件人邮箱', prop: 'to', render: arr=>arr.map(_=>_.value ? _.value : _), sortable: true, width: '200' },
		  		{ type: 'text', label: '邮件标题', prop: 'subject', overflow: true },
		  		{ type: 'text', label: '发送时间', prop: 'mail_date', sortable: true, width: '200' },
		  		{ 
		  			type: 'action',
            width: '150',
		  			btns: [
              { type: 'edit', click: this.edit, btn_if: ({mailbox})=>mailbox === 0 ? true : false, },
		  				{ type: 'delete', click: this.mailDelete },
		  			],  
		  		}
		  	],
        rowClick: this.handleRowClick,

		  },
		  tableData: [],
		  filter: {},
      mailbox: 1,
		}
  },
  methods: {
  	add () {
  		this.$router.push('/mailList/mailAdd');
  	},
    edit ({id}) {
      this.$router.push({path: '/mailList/mailEdit', query: {id} });
    },
    refreshTableData (option) {
      const url = URL;
      const mailbox = {'mailbox': this.mailbox};
      const data = Object.assign({}, this.filter, option, mailbox);
      const success = _=>{this.tableData = _.mails;}

      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    handleCurrentChange (data) {
      this.setCurrent(data.value);
    },
    setCurrent (id) {
      this.currentNodeKey = id;
      this.refresh(); 
    },
  	mailDelete ({id}) {
  		const url = `${URL}/${id}`;
  		const success = _=>{ this.$message({message: '删除邮件成功', type: 'success'}) };

  		this.axiosDelete({url, success});
  	},
    handleRowClick ({id}) {
      const url = `${URL}/${id}`;
      const success = _=>{console.log(_)};

      this.axiosGet({url, success});
    }
  },
  watch: {
    mailbox () {
      this.refresh();
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent, Strainer },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>