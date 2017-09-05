<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" >
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		

			<el-form-item label="收件人">
				<el-label></el-label>
			</el-form-item>

			<el-form-item label="抄送">
				
			</el-form-item>

			<el-form-item label="密送">
				
			</el-form-item>

			<el-form-item label="主题">
				
			</el-form-item>

			<el-form-item label="附件">
        
			</el-form-item>

			<el-form-item label="正文">
        
      </el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import AppSwitch from '@/components/form/AppSwitch'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'inventorListPop',
  mixins: [ AxiosMixins, PopMixins ],
  data () {
		return {
      form: {
        name: '',
        contact: '',
        address: '',
        telephone: '',
        email: '',
        scope: [],
        status: 1,
        is_core_partner: 1,
      },
      rules: {
      
      }
		}
  },
  components: { AppSwitch, StaticSelect },
  URL: '/api/mails',
  REMINDER_TEXT: '邮件详情',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>