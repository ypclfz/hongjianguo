<template>
  <el-select
  	:value="value"
  	@input="handleInput"
		:multiple="multiple"
		:disabled="disabled"
  >
  	<el-option
			v-for="item in taskOptions"
			:key="item.value"
			:label="item.label"
			:value="item.value"
  	>
  	</el-option>
  </el-select>
</template>

<script>
export default {
  name: 'taskDef',
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
		  	{ label: '任务节点1', value: 1 },
		  	{ label: '任务节点2', value: 2 },
		  	{ label: '任务节点3', value: 3 },
		  ],
		}
  },
  computed: {
  	taskOptions () {
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