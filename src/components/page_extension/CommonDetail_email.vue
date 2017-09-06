<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData"></table-component>
		<email-detail ref="email_detail"></email-detail>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import EmailDetail from '@/components/page_extension/Email_detail'

export default {
  name: 'commonDetailEmail',
  data () {
		return {
		  option: {
		  	'is_search': false,
		  	'columns': [
		  		{ type: 'array', label: '发件人邮箱', prop: 'from', render: _=>[_.value ? _.value : _], sortable: true },
		  		{ type: 'array', label: '收件人邮箱', prop: 'to', render: arr=>arr.map(_=>_.value ? _.value : _), sortable: true },
		  		{ type: 'text', label: '邮件标题', prop: 'subject', overflow: true },
		  		{ type: 'text', label: '发送时间', prop: 'mail_date', sortable: true },
		  		{ type: 'text', label: '是否有附件', prop: 'attach', render: (h,item)=>h('span', item ? '是' : '否') },
		  		// {
		  		// 	type: 'action',
		  		// 	width: '100',
		  		// 	btns: [
		  		// 		{ type: 'view', click: ()=>{alert('查看')} }
		  		// 	]
		  		// }
		  	],
		  	'rowClick': this.handleRowClick,
		  },
		}
  },
  methods: {
  	handleRowClick ({id}) {
  		this.$refs.email_detail.show(id);
  	}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailMails;
  	}
  },
  components: { TableComponent, EmailDetail }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>