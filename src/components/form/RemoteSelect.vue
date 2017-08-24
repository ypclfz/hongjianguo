<template>
	<el-select
		:value="value2"
	  @input="handleInput"
	  filterable
	  remote
	  :placeholder="PLACEHOLDER"
	  :disabled="disabled"
	  :remote-method="remoteMethod"
	  :loading="loading"
	  multiple
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

const map = new Map([
	['member', {
		URL: '/api/members',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入用户关键词',
	}],
	['applicant', {
		URL: '/api/applicants',
		DATA_KEY: 'applicants',
		PLACEHOLDER: '请输入申请人关键词',
	}],
	['inventor', {
		URL: '/api/inventors',
		DATA_KEY: 'inventors',
		PLACEHOLDER: '请输入发明人关键词',
	}],
	['agent', {
		URL: '/api/agents',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入代理人关键词',
	}],
	['agency', {
		URL: '/api/agencies',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入代理机构关键词',
	}],
]);

export default {
  name: 'member',
  mixins: [ AxiosMixins, RemoteSelect ],
  props: {
  	'type': [String, Object]
  },
  computed: {
  	choose () {
  		if(typeof this.type == 'string') {
  			return map.get(this.type);	
  		}else {
  			return this.type;
  		}
  		
  	},
  	URL () {
  		return this.choose.URL;
  	},
  	DATA_KEY () {
  		return this.choose.DATA_KEY;
  	},
  	PLACEHOLDER () {
  		return this.choose.PLACEHOLDER;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>