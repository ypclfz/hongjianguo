<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入提案人关键词"
    :remote-method="remoteMethod"
    :loading="loading"
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
	  name: 'proposer',
	  props: {
	  	'value': [Number, String],
	  	'defaultOptions': {
	  		type: Array,
	  		default: ()=>[],
	  	}
	  },
	  data () {
			return {
				options: this.defaultOptions,
			  loading: false,
			}
	  },
	  methods: {
	  	handleInput (val) {
	  		this.$emit('input', val);
	  	},
	  	remoteMethod (keyword) {
	  		const params = { keyword };

	  		this.loading = true;
	  		this.$axios.get('/api/members', {params}).then(response=>{
	  			this.loading = false;
	  			this.options = response.data.data.data.map(d=>{return {id: d.uid, name: d.username}});
	  		});
	  	}
	  }
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>