<template>
  <div class="main">
  	<el-form :model="form" ref="form" label-width="80px">
  		<el-form-item label="发送时间" prop="to">
				<span class="form-item-text">{{ mail_date }}</span>
  		</el-form-item>
  		<el-form-item label="标题" prop="cc">
  			<span class="form-item-text">{{ subject }}</span>
  		</el-form-item>
  		<el-form-item label="内容" prop="bcc">
				<span class="form-item-text">{{ content }}</span>
  		</el-form-item>
  	</el-form>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/mails';

export default {
  name: 'systemMessageDetail',
  mixins: [ AxiosMixins ],
  data () {
		return {
			form: {
				'mail_date': '',
				'subject': '',
				'content': '',
			} 
		}
	},
	computed: {
		id () {
			return this.$route.query.id;
		}
	},
	created () {
		const url = `${URL}/${id}`;
		const success = _=>{console.log(_)};

		this.axiosGet({url, success});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>