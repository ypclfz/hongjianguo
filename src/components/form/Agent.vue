<template>
  <el-select
  	:value="value"
  	@input="handleInput"
		:multiple="multiple"
		:disabled="disabled"
  >
  	<el-option
			v-for="item in agentOptions"
			:key="item.value"
			:label="item.label"
			:value="item.value"
  	>
  	</el-option>
  </el-select>
</template>

<script>
export default {
  name: 'agent',
  props: {
  	'value': null,
  	'multiple': {
  		type: Boolean,
  		default: false,
  	},
  	'disabled': {
  		type: Boolean,
  		default: false,
  	}
  },
  data () {
		return {
		  options: [
		  	{ label: '代理人1', value: 1 },
		  	{ label: '代理人2', value: 2 },
		  	{ label: '代理人3', value: 3 },
		  ],
		}
  },
  computed: {
  	agentOptions () {
  		return this.options;
  	}
  },
  methods: {
  	handleInput (val) {
  		this.$emit('input', val);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>