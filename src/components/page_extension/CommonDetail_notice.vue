<template>
  <div class="main">
	<table-component :tableOption="option" :data="tableData"></table-component>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 

export default {
  name: 'commonDeatailNotice',
  data () {
  	return {
  	  option: {
        'is_search': false,
        'columns': [
          { type: 'text', label: '通知书名称', prop: 'notice_name' },
          { type: 'text', label: '发文日期', prop: 'mail_date' },
          { type: 'text', label: '发文序号', prop: 'serial' },
          { type: 'text', label: '审查员', prop: 'examiner' },
          { type: 'text', label: '审查部门', prop: 'examiner_dept' },
          { type: 'text', label: '审查员电话', prop: 'examiner_phone' },
          { type: 'text', label: '答复/费用期限', prop: 'deadline' },
          {
            type: 'action',
            btns: [
              { type: 'download', click: ({download_url})=>{ window.open(download_url) } },
              { type: 'delete',  click: ({id})=>{ this.$alert(row.id) } },
              { type: 'view', click: ({viewUrl})=>{ window.open(viewUrl) } },
            ]
          }
        ]
      },
  	}
  },
  computed: {
    tableData () { 
      return this.$store.getters.detailNotices; 
    }
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>