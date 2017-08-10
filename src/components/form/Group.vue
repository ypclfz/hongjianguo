<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="选择用户组"
  >
  	<el-option
		v-for="item in groupOptions"
		:key="item.id"
		:label="item.name"
		:value="item.id"
  	>
  	</el-option>
  </el-select>
</template>

<script>
import formSelect from '@/mixins/form-select'

export default {
  name: 'group',
  mixins: [ formSelect],
  computed: {
  	groupOptions () {
  		return this.$store.getters.groupOptions;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>