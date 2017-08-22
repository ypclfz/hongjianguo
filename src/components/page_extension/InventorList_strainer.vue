<template>
  <app-collapse col-title="发明人筛选" default-close>
    <el-form :model="form" ref="form" label-width="80px">
    	<el-form-item></el-form-item>
    </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Strainer from '@/mixins/strainer'

export default {
  name: 'InventorListStrainer',
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