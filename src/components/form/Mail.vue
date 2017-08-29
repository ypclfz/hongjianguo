<template>
	<el-select
		:value="value"
		placeholder="请输入邮箱"
    @input="handleInput"
		multiple
   	filterable
   	allow-create
   	value-key="id"
   	default-first-option
	>
		<el-option :value="{id: 'sss', label: 'Shawn'}" label="Shawn" :key="1"></el-option>
		<el-option :value="{id: 'aaa', label: 'Anna'}" label="Anna" :key="2"></el-option>
	</el-select>
</template>

<script>


export default {
  name: 'mail',
  props: ['value'],
  data () {
		return {
			options: [],
		}
  },
  computed: {
  	value2 () {
  		this.value.map(_=>_.value);
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