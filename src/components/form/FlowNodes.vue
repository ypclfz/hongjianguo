<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择流程节点"
  >
  	<el-option
		v-for="item in flowOptions"
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
  name: 'flowNode',
  mixins: [formSelect],
  computed: {
  	flowOptions () {
  		return this.$store.getters.flowNodesData;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>