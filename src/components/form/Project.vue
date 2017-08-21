<template>
  <el-select
		:value="value2"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入案件关键词"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    multiple
    :multiple-limit="multiple ? 0 : 1"
    @change="handleChange"
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
//使用RemoteSelect,必须书写URL参数
import RemoteSelect from '@/mixins/remote-select'
import AxiosMixins from '@/mixins/axios-mixins'
// import AxiosMixins from '@/'

export default {
  name: 'project',
  mixins: [ RemoteSelect, AxiosMixins ],
  data () {
    return {
      URL: '/api/projects',
      DATA_KEY: 'projects',  
    }
  },
  methods: {
    handleChange (data) {      
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>