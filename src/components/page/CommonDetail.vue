<template>
  <div class="main">
  	<app-tag :tags="tags">
			<router-view></router-view>
		</app-tag>
  </div>
</template>

<script>
import AppTag from '@/components/common/AppTag'

export default {
  name: 'commonDetail',
  data () {
		return {
		  msg: 'Welcome to Your Vue.js App',
		  tags: [
		  	{ 'text': '基本信息', key: 'babel' },
		  	{ 'text': '流程管理', key: 'control' },
		  	{ 'text': '官方来文', key: 'notice' },
		  	{ 'text': '所有费用', key: 'fee' },
		  	{ 'text': '往來邮件', key: 'email' },
		  	{ 'text': '其他文档', key: 'documents' },
		  ]
		}
  },
  created () {
  	const path = this.$route.path;
  	this.$store.commit('setDetailType', path);
  },
  components: { AppTag },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>