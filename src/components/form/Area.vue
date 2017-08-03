<template>
  <el-select :value="value" @input="handleInput" :multiple="multiple" :disabled="disabled">
  	<el-option
			v-for="item in areaData"
			:key="item.value"
			:label="item.name"
			:value="item.id"
			placeholder="请选择申请地区"
  	></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'area',
  props: {
  	'value': [String, Array],
  	'multiple': {
  		type: Boolean,
  		default: false,
  	},
  	'disabled': {
  		type: Boolean,
  		default: false,
  	}
  },
  computed: {
  	areaData () {
  		return this.$store.getters.areaData;
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