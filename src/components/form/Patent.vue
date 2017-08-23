<template>
  <el-select
		:value="value2"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入专利关键词"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    multiple
    :multiple-limit="multiple ? 0 : 1"
    ref="select"
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
  name: 'patent',
  mixins: [ AxiosMixins, RemoteSelect ],
  data () {
    return {
      URL: '/api/patents',
      DATA_KEY: 'patents',  
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>