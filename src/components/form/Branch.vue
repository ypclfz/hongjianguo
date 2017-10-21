<template>
	<div>
	  <el-input placeholder="选择部门" readonly @focus="$refs.tree.show()" :value="text" :disabled="disabled"  ></el-input>
	  <pop-tree 
	    title="选择部门"
	    :data="data" 
	    :props="props"
	    :value="value"
	    :multiple="multiple"
	    @update:value="handleValue" 
	    ref="tree"
	    :disabled="isDisabled"
	  >
	  </pop-tree>
	</div>
</template>

<script>
import PopTree from '@/components/common/PopTree'
import FormTree from '@/mixins/form-tree' 

export default {
  name: 'branch',
  mixins: [ FormTree ],
  DATA_KEY: 'branchData',
  MAP_KEY: 'branchMap',
  REFRESH_KEY: 'refreshBranch',
  components: { PopTree },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

