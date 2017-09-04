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
    @visible-change.once="initialization"
	>
		<el-option
			v-for="item in options"
			:key="item.id"
			:label="item.name"
			:value="item.id"
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
        _.data = _.data.map(_=>{
          if(!_.name) _.name = _.label;
          if(!_.id) _.id = _.value;
          return _;
        });
        console.log(_.data);
  			this.options = _.data;
  			if(this.default) {
  				this.options.unshift({id: '', name: '未选择'});
  			}
  		}
  		
  		this.loading = true;
  		this.axiosGet({url, data, success});
  	},
    initialization () {
      this.remoteMethod('');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>