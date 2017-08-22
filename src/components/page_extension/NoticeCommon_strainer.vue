<template>
  <app-collapse col-title="通知书筛选" default-close>
    暂时没有可用于筛选的字段
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Strainer from '@/mixins/strainer'

export default {
  name: 'NoticeCommonStrainer',
  mixins: [ Strainer ],
  data () {
		return {      
		  form: {
      	status: '',
      	target: [],
      	code: [],
      	mail_date: '',
      	create_time: '',
      	due_time: '',
      	deadline: '',
      	pay_time: '',
      }
		}
  },
  watch: {},
  components: { AppCollapse },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>