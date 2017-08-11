<template>
  <app-collapse col-title="申请人筛选" default-close>
    <el-form :model="form" ref="form" >
    </el-form>
        <el-button @click="search(form)">查询</el-button>
        <el-button @click="clear($refs.form)">清空</el-button>

  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Strainer from '@/mixins/strainer'
import FeeStatus from '@/components/form/FeeStatus'
import Member from '@/components/form/Member'
import FeeCode from '@/components/form/FeeCode'

export default {
  name: 'FeeCommonStrainer',
  mixins: [ Strainer ],
  props: ['feeType'],
  data () {
		return {      
		  form: {
        type: [],
        name: [],
        identity: '',
        area: '',
        province: '',
        city: '',
        deadline: '',
        pay_time: '',
      }
		}
  },
  watch: {},
  components: { AppCollapse, FeeStatus, Member, FeeCode },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>