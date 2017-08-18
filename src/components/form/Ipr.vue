<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择IPR"
  >
  	<el-option
  		v-for="item in iprOptions"
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
  name: 'ipr',
  mixins: [formSelect],
  computed: {
  	iprOptions () {
      if(this.$store.getters.iprOptions) {
        return this.$store.getters.iprOptions;
      }else {
        return [];
      }
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>