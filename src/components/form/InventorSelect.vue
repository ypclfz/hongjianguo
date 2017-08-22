<template>
	<el-select
		:value="value2"
    @input="handleInput"
    filterable
    remote
    placeholder="输入姓名搜索"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    multiple="multiple"
    :multiple-limit="multiple ? 0 : 1"
    ref="select"
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
import RemoteSelect from '@/mixins/remote-select'

export default {
  name: 'inventorSelect',
  mixins: [ AxiosMixins,RemoteSelect ],
  props: {
  	'disabled': {
  		type: Boolean,
  		default: false,
  	},
  },
  methods: {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>