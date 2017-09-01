<template>
  <app-collapse col-title="邮件筛选" default-close>
    <el-form :model="form" label-width="80px" ref="form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发件人" prop="to">
            <mail v-model="form.to" multiple></mail>
          </el-form-item>
          <el-form-item label="关联案件" prop="project_id">
            <remote-select type="project" v-model="form.project_id"></remote-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收件人" prop="from">
            <mail v-model="form.from" multiple></mail>
          </el-form-item>
          
          <el-form-item label="发送时间" prop="mail_date">
            <el-date-picker type="date" placeholder="请选择发送时间" v-model="form.mail_date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Mail from '@/components/form/Mail'
import RemoteSelect from '@/components/form/RemoteSelect'
import Strainer from '@/mixins/strainer'

export default {
  name: 'MailListStrainer',
  mixins: [ Strainer ],
  data () {
    return {      
      form: {
          to: [],
          from: [],
          mail_date: '',
          project_id: '',
        }
    }
  },
  watch: {},
  components: { AppCollapse, Mail, RemoteSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>