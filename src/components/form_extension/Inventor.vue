<template>
	<el-row>
    <el-col :span="12">
      <el-select placeholder="请选择发明人" :value="inventor" @input="handleInventor">
        <el-option 
          v-for="item in option.inventors" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5" :offset="1">
      <el-autocomplete placeholder="贡献率" :fetch-suggestions="handleFetch"  style="width: 100%" readonly :value="percent" @input="handlePercent">
        <template slot="append">%</template>
      </el-autocomplete>
    </el-col>
    <el-col :span="5" :offset="1">
      <el-button size="small" v-if="isDelete" @click="deleteInventor">删除</el-button>
    </el-col>
  </el-row>  
</template>

<script>
export default {
  name: 'inventor',
  props: {
  	'value': Object,
  	'isDelete': {
  		type: Boolean,
  		default: false,
  	}
  },
  data () {
		return {
		  option: {
		  	inventors: [
		  		{ label: '发明人一', value: '1' },
		  		{ label: '发明人二', value: '2' },
		  		{ label: '发明人三', value: '3' },
		  	]
		  },
		}
  },
  computed: {
  	inventor () {
  		return this.value.inventor;
  	},
  	percent () {
  		return this.value.percent;
  	}
  },
  methods: {
  	handleFetch (val, cb) {
      cb([
        {value: '10'},
        {value: '20'},
        {value: '30'},
        {value: '40'},
        {value: '50'},
        {value: '60'},
        {value: '70'},
        {value: '80'},
        {value: '90'},
        {value: '100'},
      ])
    },
    deleteInventor () {
    	this.$emit('deleteInventor');
    },
    handleInventor (val) {
    	const inventor = val;
    	const percent = this.percent;
    	this.$emit('input', { inventor, percent });
    },
    handlePercent (val) {
    	const inventor = this.inventor;
    	const percent = val;
    	this.$emit('input', { inventor, percent });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
