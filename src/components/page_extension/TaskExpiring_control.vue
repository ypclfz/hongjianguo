<template>
	<el-tree 
		:data="data" 
		@node-click="handleNodeClick"
		:render-content="renderContent"
	>		
	</el-tree>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

export default {
	name: 'taskExpiringControl',
	mixins: [ AxiosMixins ],
	data () {
		return {
			data: [],
		}
	},
	methods: {
		handleNodeClick () {

		},
		renderContent () {

		},
	},
	created () {
		const url = '/tasks/expiring';
		const success = _=>{console.log(_)};

		this.axiosGet({url, success});
	}
}
</script>
