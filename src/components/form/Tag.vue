<template>
  <el-select
  :value="value"
  @input="handleInput"
	:multiple="multiple"
	:disabled="disabled"
	filterable
  >
  	<el-option
		v-for="item in tagOptions"
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
  name: 'Tag',
  mixins: [formSelect],
  computed: {
  	tagOptions () {
  		return this.$store.getters.tagOptions;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>