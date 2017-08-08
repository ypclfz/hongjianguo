<template>
  <el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入账单关键词"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
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
  URL: '/api/invoices',
  PARAMS: { debit: '1' },
  DATA_KEY: 'invoices',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>