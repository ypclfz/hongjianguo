<template>
	<div style="position: relative">
		<input type="text" :placeholder="placeholder" @input="handleInput" :value="value" class="el-input__inner" style="padding-right: 35px; font-size: 14px;" @keyup.enter="handleEnter"></input>
		<i class="el-icon-search" title="点击搜索" style="position: absolute; top: 10px; right: 10px; cursor: pointer; opacity: .5;" @click="handleClick"></i>
	</div>
</template>

<script>
export default {
  name: 'searchInput',
  props: {
  	'value': [String, Number],
  	'placeholder': {
  		type: String,
  		default: '',
  	}
  },
  methods: {
  	handleInput (event) {
  		this.$emit('input', event.target.value);
  	},
  	handleEnter () {
  		this.$emit('enter', this.value)
  	},
  	handleClick () {
  		this.$emit('click', this.value)
  	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>