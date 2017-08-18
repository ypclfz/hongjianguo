<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="输入姓名搜索"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
	>
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		>
		</el-option>
	</el-select>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

export default {
  name: 'inventorSelect',
  mixins: [ AxiosMixins ],
  props: {
  	'value': [Number, String, Array],
  	'defaultOptions': {
  		type: Array,
  	},
  	'disabled': {
  		type: Boolean,
  		default: false,
  	},
  	'default': {
  		type: Boolean,
  		default: false,
  	},
  	'multiple': {
  		type: Boolean,
  		default: false,
  	}
  },
  data () {
		return {
			query: '',
			options: [],
		  	loading: false,
		}
  },
  methods: {
  	handleInput (val) {
  		this.$emit('input', val);
  	},
  	remoteMethod (keyword) {
  		const url = '/api/inventors';
  		const data = { keyword, listOnly: '1' };
  		const success = _=>{
  			this.loading = false;
  			this.options = _.data;
  			if(this.default) {
  				this.options.unshift({value: '', label: '未选择'});
  			}
  		}
  		
  		this.loading = true;
  		this.axiosGet({url, data, success});
  	}
  },
  created () {
  	this.remoteMethod('');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>