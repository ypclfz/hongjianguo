<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择企业"
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
  name: 'invoiceEntity',
  mixins: [ formSelect ],
  computed: {
  	options () {
  		return this.$store.getters.invoiceEntityOptions;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>