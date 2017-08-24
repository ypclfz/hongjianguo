<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'commonDetailEmail',
  data () {
		return {
		  option: {
		  	'is_search': false,
		  	'columns': [
		  		{ type: 'text', label: '发件人', prop: 'from' },
		  		{ type: 'text', label: '收件人', prop: 'to' },
		  		{ type: 'text', label: 'CC', prop: 'cc' },
		  		{ type: 'text', label: '类型', prop: 'mailbox', render: (h,item)=>h('span', item == '1' ? '收件箱' : '发送箱')  },
		  		{ type: 'text', label: '已读', prop: 'read', render: (h,item)=>h('span', item ? '是' : '否')  },
		  		{ type: 'text', label: '置顶', prop: 'top', render: (h,item)=>h('span', item ? '是' : '否') },
		  		{ type: 'text', label: '邮件主题', prop: 'subject' },
		  		{ type: 'text', label: '发送时间', prop: 'sent_time' },
		  		{ type: 'text', label: '是否有附件', prop: 'attach', render: (h,item)=>h('span', d ? '是' : '否') },
		  		{
		  			type: 'action',
		  			btns: [
		  				{ type: 'view', click: ()=>{alert('查看')} }
		  			]
		  		}
		  	]
		  },
		}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailMails;
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>