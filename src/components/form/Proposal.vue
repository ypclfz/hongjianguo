<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入提案关键词"
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
	export default {
	  name: 'member',
	  props: {
	  	'value': [Number, String, Array],
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
	  		const params = { keyword, listOnly:"1" };

	  		this.loading = true;
	  		this.$axios.get('/api/proposals', { params }).then(response=>{
	  			this.loading = false;
	  			this.options = response.data.proposals;
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