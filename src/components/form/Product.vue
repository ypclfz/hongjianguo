<template>
	<div>
	  <el-input placeholder="选择产品分类" readonly @focus="$refs.tree.show()" :value="text" :disabled="disabled"  ></el-input>
	  <pop-tree 
	    title="选择产品分类"
	    :data="data" 
	    :props="props"
	    :value="value"
	    :multiple="multiple"
	    action
	    url="/api/products"
	    @refresh="refresh"
	    @update:value="handleValue" 
	    ref="tree"
	  >
	  </pop-tree>
	</div>
</template>

<script>
import PopTree from '@/components/common/PopTree'
import FormTree from '@/mixins/form-tree'

export default {
  name: 'productForm',
  mixins: [ FormTree ],
  DATA_KEY: 'productData',
  MAP_KEY: 'productMap',
  REFRESH_KEY: 'refreshProduct',
  components: { PopTree },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
