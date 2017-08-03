<template>
	<el-select
		:value="value"
    @input="handleInput"
    filterable
    remote
    placeholder="请输入申请人关键词"
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
	  name: 'applicant',
	  data () {
			return {
				options: [],
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
	  		this.$axios.get('/api/applicants', { params }).then(response=>{
	  			this.loading = false;
	  			this.options = response.data.members.data.map(d=>{return {value: d.id, label: d.name}});
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