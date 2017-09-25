<template>
  <div class="main">
	  <el-cascader
	  	placeholder="请选择省市"
	    expand-trigger="hover"
	    :options="options"
	    :value=value
	    :props="props"
	    @input="handleInput"
	    clearable
	   >
	  </el-cascader>
  </div>
</template>

<script>
export default {
  name: 'city',
  props: {
  	'value': {
  		type: Array,
  		default () {
  			return [];
  		},
  	}
  },
  data () {
  	return {
  		props: {
  			value: 'zipcode',
  			label: 'name',
  			children: 'child',
  		}
  	}
  },	
  computed: {
  	options () {
      let op = this.$store.getters.cityData;

      if(op == undefined) {
        this.$store.commit('setCity', []);
        this.$store.dispatch('refreshCity');
        op = [];
      }

  		return op; 
  	}
  },
  methods: {
  	handleInput(val) {
  		this.$emit('input', val);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
