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
        'columns': [
          { type: 'text', label: '通知书名称', prop: 'name' },
          { type: 'text', label: '发文日期', prop: 'mail_date' },
          { type: 'text', label: '发文序号', prop: 'mail_serial' },
          { type: 'text', label: '答复/费用期限', prop: 'deadline' },
          { 
            type: 'text', 
            label: '附件', 
            render: (h, text, row)=>{
              return h(
                'a', 
                {
                  attrs: {
                    href: row.view_url
                  }
                },
                `${row.name}.${row.ext}`)
            }
          }
        ]
      },
  	}
  },
  computed: {
    tableData () {
      return this.$store.getters.detail_data.notices;
    }
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>