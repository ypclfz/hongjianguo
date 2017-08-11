<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择用户角色"
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
  name: 'userRole',
  mixins: [formSelect],
  props: {
    'default': {
      type: Boolean,
      default: false,
    }
  },
  computed: {
  	options () {
  		const arr = [
        {label: '发明人', value: 1},
        {label: 'IPR', value: 2},
        {label: '流程', value: 3},
        {label: '代理机构', value: 10},
        {label: '代理人', value: 11},
        {label: '代理机构流程', value: 12},
        {label: '代理机构财务', value: 13},
      ]

      if(this.default) {
        arr.unshift({label: '所有角色', value: ''});
      }

      return arr;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>