<template>
	<div>
	  <el-input readonly @focus="$refs.tree.show()" :value="classificationText" :disabled="disabled"  ></el-input>
	  <pop-tree 
	    title="选择技术分类"
	    :data="classificationData" 
	    :props="props"
	    :value="value"
	    :multiple="multiple"
	    @update:value="handleValue" 
	    ref="tree"
	  >
	  </pop-tree>
	</div>
</template>

<script>
import PopTree from '@/components/common/PopTree'
export default {
  name: 'product',
  props: {
  	'value': [Number, String, Array],
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
		  'props': {
		  	label: 'name',
		  	children: 'children',
		  },
		}
  },
  computed: {
  	classificationData () {
  		return this.$store.getters.classificationData;
  	},
  	classificationMap () {
  		return this.$store.getters.classificationMap;
  	},
  	classificationText () {
  		const v = this.value;
  		const map = this.classificationMap;
  		let t;
  		if(this.multiple) {
  			t = v.length != 0 ? v.map(d=>map.get(d)).join("；") : '';
  		}else {
  			t = v ? map.get(d) : '';
  		}

  		return t;
  	}
  },
  methods: {
  	handleValue (val) {
  		const v = this.multiple ? [...val] : val;
  		this.$emit('input', v);
  	}
  },
  components: { PopTree },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

