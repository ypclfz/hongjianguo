<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'commonDetailFee',
  data () {
		return {
		  option: {
		  	'is_search': false,
				'columns': [
					{ type: 'text', label: '费用名称', prop: 'name'},
					{ type: 'text', label: '费用金额', prop: 'fee'},
					{ type: 'text', label: '货币', prop: 'currency'},
					{ type: 'text', label: '汇率', prop: 'roe'},
					{ type: 'text', label: '人民币', prop: 'amount'},
					{ type: 'text', label: '费用类型', prop: 'type'},
					{ type: 'text', label: '是否官费', prop: 'official'},
					{ type: 'text', label: '费用状态', prop: 'status'},
					{ type: 'text', label: '费用期限', prop: 'due_time'},
					{ type: 'text', label: '法定期限', prop: 'deadline'},
					{ type: 'text', label: '付款时间', prop: 'pay_time'},
					{ type: 'text', label: '费用对象', prop: 'target'},
					{ type: 'text', label: '费用备注', prop: 'remark'},
					{ 
						type: 'action',
						btns: [
							{ type: 'edit', click: ()=>{alert('编辑')} },
							{ type: 'delete', click: ()=>{alert('删除')} },
						],
					}
				],	  
		  }
		}
  },
  computed: {
  	tableData () {
  		return this.$store.getters.detailFees;
  	}
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>