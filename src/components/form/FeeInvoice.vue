<template>
  <el-select
    class="fee-invoice"
		:value="value"
    @input="handleInput"
    filterable
    remote
    :placeholder="placeholder"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    multiple
    :multiple-limit="multiple ? 0 : 1"
	>
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		>
		</el-option>
	</el-select>
</template>

<script>
//使用RemoteSelect,必须书写URL参数
import RemoteSelect from '@/mixins/remote-select'

export default {
  name: 'patent',
  mixins: [ RemoteSelect ],
  props: ['feeType'],
  data () {
    return {
      URL: '/api/invoices',
      PARAMS: { debit: this.feeType ? 1 : 0 },
      DATA_KEY: 'invoices',
    };
  },
  computed: {
    placeholder () {
      return this.feeType ? '请输入请款单关键词' : '请输入付款单关键词';
    },
  }
}
</script>
<style>
.fee-invoice .el-input__inner {
  padding-right: 10px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>