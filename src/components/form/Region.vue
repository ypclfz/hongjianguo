<template>
  <el-select :value="value" @input="handleInput" :multiple="multiple" :disabled="disabled" placeholder="请选择地区" value-key="id">
  	<el-option
			v-for="item in areaData"
			:key="item.id"
			:label="item.name"
      :value="item.id"      
	  ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'area',
  props: {
  	'value': [String, Object, Array],
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