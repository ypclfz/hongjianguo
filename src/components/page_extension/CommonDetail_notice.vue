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

          { type: 'text', label: '发文序列号', prop: 'serial' },
          { type: 'text', label: '发文日', prop: 'mail_date' },
          { type: 'text', label: '法定期限', prop: 'deadline' },
          { type: 'text', label: '审查员', prop: 'examiner' },
          { type: 'text', label: '审查部门', prop: 'examiner_dept' },
          { type: 'text', label: '审查员电话', prop: 'examiner_phone' },
          {
            type: 'action',
            btns: [
              { type: 'download', click: ({download_url})=>{ window.open(download_url) } },
              { type: 'delete',  click: ({notice_name})=>{ this.$message({message: `暂时不可删除${notice_name}`, type: 'warning'}) } },
              { type: 'view', click: ({view_url})=>{ window.open(view_url) } },
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