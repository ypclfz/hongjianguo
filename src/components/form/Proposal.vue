<template>
	<el-select
		:value="value2"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入提案关键词"
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
import RemoteSelect from '@/mixins/remote-select'
import AxiosMixins from '@/mixins/axios-mixins'

export default {
  name: 'proposals',
  mixins: [ AxiosMixins, RemoteSelect ],
  data () {
    return {
      URL: '/api/proposals',
      DATA_KEY: 'proposals',  
    }
  },
}
</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>