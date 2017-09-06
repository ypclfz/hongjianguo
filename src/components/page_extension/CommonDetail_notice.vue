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
          { type: 'text', label: '通知书名称', prop: 'notice_name', width: '210' },

          { type: 'text', label: '发文序列号', prop: 'notice_serial', width: '210' },
          { type: 'text', label: '发文日', prop: 'mail_date', width: '210' },
          { type: 'text', label: '法定期限', prop: 'deadline', width: '210' },
          { type: 'text', label: '审查员', prop: 'examiner', width: '210' },
          { type: 'text', label: '审查部门', prop: 'examiner_dept', width: '210' },
          { type: 'text', label: '审查员电话', prop: 'examiner_phone', width: '210' },
          {
            type: 'action',
            'min_width': '200',
            btns: [
              { type: 'download', click: ({downloadUrl})=>{ window.location.href = downloadUrl } },
              // { type: 'delete',  click: ({notice_name})=>{ this.$message({message: `暂时不可删除${notice_name}`, type: 'warning'}) } },
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