<template>
  <div class="main">
  	<el-form :model="form" ref="form" label-width="100px">
  		<el-form-item label="接收时间" prop="to">
				<span class="form-item-text">{{ form.mail_date }}</span>
  		</el-form-item>
  		<el-form-item label="标题" prop="cc">
  			<span class="form-item-text">{{ form.subject }}</span>
  		</el-form-item>
  		<el-form-item label="内容" prop="bcc">
				<span class="form-item-text">{{ form.content }}</span>
  		</el-form-item>
  		<el-form-item style="margin-bottom: 0;">
  			<el-button type="danger" @click="$router.push('/news/systemMessage')">返回消息列表</el-button>
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
	methods: {
		refresh () {
			const url = `${URL}/${this.id}`;
			const success = _=>{

				this.$tool.coverObj(this.form, _.mail);
				this.$store.commit('cancelLoading');
				this.$store.dispatch('refreshMesg');
			};

			this.$store.commit('onLoading');
			this.axiosGet({url, success});
		}
	},	
	computed: {
		id () {
			return this.$route.query.id;
		}
	},
	watch: {
		id () {
			this.refresh();
		}
	},
	created () {
		this.refresh();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>