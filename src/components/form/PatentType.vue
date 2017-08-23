<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择专利类型"
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
import formSelect from '@/mixins/form-select'

export default {
  name: 'patentType',
  mixins: [formSelect],
  data () {
  	return {
  		options: [
  			{label: '发明专利', value: 1},
  			{label: '实用新型', value: 2},
  			{label: '外观设计', value: 3},
  		]
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>