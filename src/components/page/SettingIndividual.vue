<template>
	<app-tag :tags="tags">
		<router-view></router-view>
	</app-tag>
</template>

<script>
import AppTag from '@/components/common/AppTag'

export default {
  name: 'settingIndividual',
  data () {
		return {
		  tags: [
		  	{ text: '基本信息', key: 'base' },
		  	{ text: '通知订阅', key: 'notice' },
		  	{ text: '邮件设置', key: 'email' },
		  ],
		}
  },
  components: { AppTag },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
