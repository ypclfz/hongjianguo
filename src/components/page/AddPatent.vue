<template>
  <div class="main">
  	<app-collapse col-title="请求表单">
		  <el-form label-width="150px">
        <el-form-item label="内部案号">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="案件名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="申请地区">
          <el-select v-model="form.area"></el-select>
        </el-form-item>
        <el-form-item label="案件类型">
          <el-select v-model="form.type"></el-select>
        </el-form-item>
        <el-form-item label="案件起始阶段">
          <el-select v-model="form.start"></el-select>
        </el-form-item>
      </el-form>
  	</app-collapse>
    <app-collapse col-title="请求表单2">
      <el-form label-width="150px">
        <el-form-item label="承办人/代理人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="内部撰稿期限">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="请选择内部撰稿期限"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="初稿完成期限">
          <el-date-picker
            v-model="form.date2"
            type="date"
            placeholder="请选择向客户提交初稿的期限"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="官方绝限">
          <el-date-picker
            v-model="form.date3"
            type="date"
            placeholder="请选择官方绝限"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </app-collapse>
    <app-collapse col-title="请求表单3">
      <el-form label-width="150px">
        <el-form-item label="订单号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="代理费">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="分所">
          <el-select v-model="form.analysis"></el-select>
        </el-form-item>
        <el-form-item label="客源人/销售">
          <el-select v-model="form.sale"></el-select>
        </el-form-item>
        <el-form-item label="顾问/客服">
          <el-select v-model="form.service"></el-select>
        </el-form-item>
        <el-form-item label="外部代理机构">
          <el-select v-model="form.external_agent"></el-select>
        </el-form-item>
        <el-form-item label="委案日期">
          <el-date-picker
            type="date"
            placeholder="请选择客户委案日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户案号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                 </el-upload>
        </el-form-item> 

      </el-form>
    </app-collapse>
  </div>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
export default {
  name: 'hello',
  data () {
    return {
      form: {
        num: '',
        name: '',
        area: '',
        type: '',
        start: '',
        date1: '',
        date2: '',
        date3: '',
        analysis: '',
        sale: '',
        serviece: '',
        external_agent: ''

      },
      pickerOptions: {
        disabledDate(time) {
           return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  created () {
    this.$store.state.userName = "Leo"
    console.log(this.$store.state.userName);
  },
  components: {AppCollapse} 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-form {
  padding-top: 22px;
}
.el-form-item {
  padding: 0 15px;
}
</style>