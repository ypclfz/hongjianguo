<template>
  <div class="filter-tree">
  	<div class="filter-tree-title"></div>
  	<el-input></el-input>
  	<el-tree>
  	</el-tree>
  </div>
</template>

<script>
export default {
  name: 'filterTree',
  props: {
  	'data': {
  		type: [Array, Object],
  		required: true,
  	}
  },
  data () {
		return {
		  
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>