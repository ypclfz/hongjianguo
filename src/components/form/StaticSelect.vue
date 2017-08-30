<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    :placeholder="config.placeholder"
  >
  	<el-option
  		v-for="item in config.options"
  		:key="item.value"
  		:label="item.label"
  		:value="item.value"
  	>
  	</el-option>
  </el-select>
</template>


<script>
import formSelect from '@/mixins/form-select'

const config = [
	['agency_scope', {
		placeholder: '请选择代理机构业务范围',
		options: [
			{ label: '国内新申请', value: '国内新申请'},
			{ label: '国外新申请', value: '国外新申请'},
			{ label: '国内无效诉讼', value: '国内无效诉讼'},
			{ label: '国外无效诉讼', value: '国外无效诉讼'},
			{ label: '分析', value: '分析'},
		]
	}]
];
const map = new Map(config);

export default {
  name: 'ipr',
  mixins: [formSelect],
  props: ['type'],
  computed: {
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>