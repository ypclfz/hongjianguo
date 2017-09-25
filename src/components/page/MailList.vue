<template>
  <div class="main">
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" >
        <el-select v-model="mailbox" slot="mailbox" style="width: 150px">
          <el-option v-for="item in options.mailbox" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </table-component>
      <Detail ref="mail_detail"></Detail>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/MailList_strainer'
import AxiosMixins from '@/mixins/axios-mixins'
import Detail from '@/components/page_extension/Email_detail'

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
        'height': 'default2',
        'header_slot': [ 'mailbox' ],
		  	// 'is_search': false,
		  	'columns': [
		  		{ type: 'selection', width: '50' },
		  		{ type: 'text', label: '发件人邮箱', prop: 'from', render_simple: 'label', sortable: true, overflow: true, width: '200' },
		  		{ type: 'array', label: '收件人邮箱', prop: 'to', sortable: true, overflow: true, width: '200',
            render: _=>{
              if(_ instanceof Array) {
                return _.map(_=>_.label)
              }else {
                return []
              }
            },  
          },
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
  		this.$router.push('/news/mailList/mailAdd');
  	},
    edit ({id}) {
      this.$router.push({path: '/news/mailList/mailEdit', query: {id} });
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
    update () {
      this.$refs.table.update();
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
  		const success = _=>{ 
        this.update();
        this.$message({message: '删除邮件成功', type: 'success'}) 
      };

  		this.axiosDelete({url, success});
  	},
    handleRowClick ({id}) {
      this.$refs.mail_detail.show(id);
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
  components: { TableComponent, Strainer, Detail },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>