<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-medium" :modal="false">
  	<div style="height: 600px; overflow-y: auto" v-loading="loading" element-loading-text="加载详情中...">
			<div style="font-size: 20px; margin-bottom: 20px; font-weight: bold;">{{ form.subject }}</div>
      
      <app-collapse col-title="详细信息" default-close>
        <el-form label-width="80px">
          <el-form-item label="发件人" >
            <el-tag>{{ form.from.label }}</el-tag>
          </el-form-item>
      
          <el-form-item label="发送时间">
            <span class="form-item-text">{{ form.mail_date }}</span>
          </el-form-item>

          <el-form-item label="收件人">
            <el-tag v-for="item in form.to" :key="item.value">{{ item.label }}</el-tag>
          </el-form-item>

          <el-form-item label="抄送">
            <el-tag v-for="item in form.cc" :key="item.value">{{ item.label }}</el-tag>
          </el-form-item>
        </el-form>
      </app-collapse>
      
			

			
        <template v-if="form.attachments.length != 0">
          <a v-for="item in form.attachments" :href="item.downloadUrl">{{ item.name }}</a>
        </template>
        <span v-else class="form-item-text">无附件</span>
        
			

			
        <div v-html="form.body" style="min-height: 430px; border: solid 1px #ccc; margin-top: 20px; padding: 10px;"></div>
      
  	</div>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppCollapse from '@/components/common/AppCollapse'

export default {
  name: 'inventorListPop',
  mixins: [ AxiosMixins ],
  data () {
		return {
      form: {
        from: '',
        mail_date: '',
        to: [],
        cc: [],
        subject: '',
        attachments: [],
        body: '',
      },
      title: '邮件详情',
      dialogVisible: false,
      loading: false,
		}
  },
  methods: {
    show (id) {
      this.dialogVisible = true;
      this.loading = true;

      const url = `/api/mails/${id}`;
      const success = _=>{
        this.$tool.coverObj(this.form, _.mail);
        this.loading = false;
      }

      this.axiosGet({url, success});
    }
  },
  components: { AppCollapse },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>