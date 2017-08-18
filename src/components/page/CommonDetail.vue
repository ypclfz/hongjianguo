<template>
  <div class="main" v-loading.fullscreen.lock='loading' element-loading-text="拼命加载中">
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
		  tags: [
		  	{ 'text': '基本信息', key: 'base' },
		  	{ 'text': '流程管理', key: 'control' },
		  	{ 'text': '官方来文', key: 'notice' },
		  	{ 'text': '所有费用', key: 'fee' },
		  	{ 'text': '往來邮件', key: 'email' },
		  	{ 'text': '文档', key: 'documents' },
		  ],
		  loading: true,
		}
  },
  created () {
  	const path = this.$route.path;
  	const id = this.$route.params.id;
  	const func = ()=>{ this.loading = false };
  	this.$store.commit('setDetailType', path);
  	this.$store.dispatch('refreshDetailData', { id, func });
  },
  components: { AppTag },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>