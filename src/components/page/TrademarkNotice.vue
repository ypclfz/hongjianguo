<template>
  <div class="main">
  	<table-component :tableOption="tableOption" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
const text1 = '测试';
const text2 = '测试';
const text3 = '测试';
// console.log(this);

export default {
  name: 'copyrightNotice',
  data () {
	return {
		tableOption: {
		  'header_btn': [{
  			type: 'custom',
  			label: '筛选',
  			icon: 'search',
  			click () {
  				alert("筛选");
  			}
	  	},
	  	{
	  			type: 'dropdown',
	  			label: '邮件',
	  			icon: 'message',
	  			items: [
		  			{
		  				text: "发送邮件（所有通知书）",
		  				click () {
		  					alert("发送邮件（所有通知书）");
		  				}
		  			},
		  			{
		  				text: "发送邮件（仅选中通知书）",
		  				click () {
		  					alert("发送邮件（仅选中通知书）");
		  				}
		  			}
	  			]
	  		},
	  		{
	  			type: 'custom',
	  			label: '上传',
	  			icon: 'upload',
	  			click () {
	  				alert("上传");
	  			}
	  		}],
	  		'columns': [
	  			{ 'type': 'selection' },
	  			{ 'type': 'text', 'label': '案号', 'prop': 'text1' },
	  			{ 'type': 'text', 'label': '客户' },
	  			{ 'type': 'text', 'label': '案件名称'},
	  			{ 'type': 'text', 'label': '发文日'},
	  			{ 'type': 'text', 'label': '通知书名称'},
	  			{ 'type': 'text', 'label': '发送状态'},
	  			{	'type': 'action', 
	  				'label': '操作',
		  			'btns': [{
		  			  label: '发送',
		  			  icon: 'message',
		  			  click (row) {
		  			  	console.log("发送：",row);
		  			  }
	  				},
	  			{
	  				label: '忽略',
	  			  icon: 'close',
	  			  click (row) {
	  			  	console.log("忽略：",row);
	  			  }
	  			}]
	  		}]
		  },
		  tableData: [
				{text1, text2, text3, id: 1},
				{text1, text2, text3, id: 2},
				{text1, text2, text3, id: 3},
				{text1, text2, text3, id: 4},
				{text1, text2, text3, id: 5},
				{text1, text2, text3, id: 6},
				{text1, text2, text3, id: 7}
			]
		}
 	},
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
