<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" >
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<!-- <el-form-item label="发件人" prop="from">
  			<remote-select type="member" v-model="form.from"></remote-select>
  		</el-form-item> -->

			<el-form-item label="收件人" prop="to">
				<remote-select type="member" v-model="form.to"></remote-select>
			</el-form-item>

			<el-form-item label="快递公司" prop="company">
				<el-autocomplete
          v-model="form.company"
          :fetch-suggestions="querySearch"
          placeholder="请输入快递公司名称"
        ></el-autocomplete>
			</el-form-item>

			<el-form-item label="快递单号" prop="number">
				<el-input v-model="form.number" placeholder="请填写快递单号"></el-input>
			</el-form-item>

			<el-form-item label="发文日期" prop="mail_date">
				<el-date-picker v-model="form.mail_date" type="date" placeholder="请选择发文日期"></el-date-picker>
			</el-form-item>

      <el-form-item label="收文日期" prop="receipt_date" v-if="type != 'add'">
        <el-date-picker v-model="form.receipt_date" type="date" placeholder="请选择收件日期"></el-date-picker>
      </el-form-item>

			<el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="请填写描述信息..."></el-input>
      </el-form-item>
      <el-form-item label="文件清单" prop="projects">
				<express-list v-model="form.projects"></express-list>
			</el-form-item>

			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
				<el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
			</el-form-item>

  	</el-form>
  </el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import PopMixins from '@/mixins/pop-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import ExpressList from '@/components/form/ExpressList'

export default {
  name: 'inventorListPop',
  mixins: [ AxiosMixins, PopMixins ],
  data () {
		return {
      form: {
        to: '',
        company: '',
        number: '',
        mail_date: '',
        receipt_date: '',
        description: '',
        projects: [],
      },
      rules: {
      
      },
      queryData: [
        { "value": '顺丰'},
        { "value": '邮政EMS'},
        { "value": '圆通快递'},
        { "value": '申通快递'},
        { "value": '韵达快运'},
        { "value": '中通快递'},
        { "value": '汇通快递'},
        { "value": '天天快递'},
        { "value": '宅急送'},
      ],
		}
  },
  methods: {
    querySearch(queryString, cb) {
      var queryData = this.queryData;
      var results = queryString ? queryData.filter(this.createFilter(queryString)) : queryData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return _ => {
        return (_.value.indexOf(queryString.toLowerCase()) === 0);
      };
    }
  },
  components: {  ExpressList, RemoteSelect  },
  URL: '/api/expresses',
  REMINDER_TEXT: '发文信息',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>