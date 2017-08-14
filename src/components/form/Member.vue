<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入用户关键词"
    :disabled="disabled"
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="multiple"
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
	export default {
	  name: 'member',
	  props: {
	  	'value': [Number, String, Array],
	  	'defaultOptions': {
	  		type: Array,
	  	},
	  	'disabled': {
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
	  		console.log(val);
	  		this.$emit('input', val);
	  	},
	  	remoteMethod (keyword) {
	  		const params = { keyword };

	  		this.loading = true;
	  		this.$axios.get('/api/members', {params}).then(response=>{
	  			this.loading = false;
	  			this.options = response.data.members.data.map(d=>{return {id: d.id, name: d.username}});
	  		});
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