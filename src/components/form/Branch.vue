<template>
	<div>
	  <el-input placeholder="选择部门" readonly @focus="$refs.tree.show()" :value="branchText" :disabled="disabled"  ></el-input>
	  <pop-tree 
	    title="选择部门"
	    :data="branchData" 
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
  name: 'branch',
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
  	branchData () {
  		return this.$store.getters.branchData;
  	},
  	branchMap () {
  		return this.$store.getters.branchMap;
  	},
  	branchText () {
  		const v = this.value;
  		const map = this.branchMap;
  		let t;
  		if(this.multiple) {
  			t = v.length != 0 ? v.map(d=>map.get(d).name).join("；") : '';
  		}else {
  			t = v ? map.get(v).name : '';
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

