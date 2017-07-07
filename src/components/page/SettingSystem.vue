<template>
  <app-tag :tags="tags">
	<router-view></router-view>
  </app-tag>
</template>

<script>
import AppTag from '@/components/common/AppTag'

export default {
  name: 'settingSystem',
  data () {
	return {
	  tags: [
	  	{ text: '基本信息', key: 'base' },
	  	{ text: '系统通知邮件服务器', key: 'emil' },
	  	{ text: '案号编码规则', key: 'number' },
	  	{ text: '自动派案设置', key: 'case' },
	  	{ text: '费用设置', key: 'fee' },
	  ],
	}
  },
  components: { AppTag },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>