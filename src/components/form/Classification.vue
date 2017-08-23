<template>
	<div>
	  <el-input placeholder="选择技术分类" readonly @focus="$refs.tree.show()" :value="text" :disabled="disabled"  ></el-input>
	  <pop-tree 
	    title="选择技术分类"
	    :data="data" 
	    :props="props"
	    :value="value"
	    :multiple="multiple"
	    @update:value="handleValue"
	    action
	    ref="tree"
      url="/api/classifications"
      @refresh="refresh"
	  >
	  </pop-tree>
	</div>
</template>

<script>
import PopTree from '@/components/common/PopTree'
import FormTree from '@/mixins/form-tree'

export default {
  name: 'product',
  mixins: [ FormTree ],
  DATA_KEY: 'classificationData',
  MAP_KEY: 'classificationMap',
  REFRESH_KEY: 'refreshClassification',
  components: { PopTree },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

