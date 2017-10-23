 <template>
  	<div class="main">
  		<el-row>
	  		<el-col :span="18">
		  		<el-form label-width="92px" :rules="formRules" :model="formData" ref="form">
            
            <el-form-item label="提案人">{{ proposer_name }}</el-form-item>
            
            
            <el-form-item label="创建时间" v-if="pageType == 'detail'">
              {{ create_time }}
            </el-form-item>
            <el-form-item label="更新时间" v-if="pageType == 'detail'">
              {{ update_time }}
            </el-form-item>
            <el-form-item label="案件名称" prop="title">
              <span v-if="pageType == 'detail'" class="form-detail-item">{{ formData.title }}</span>
              <el-input v-model="formData.title" placeholder="请输入案件名称" v-else>
              </el-input>
            </el-form-item>
            <el-form-item label="提案简介" prop="abstract">
              <span v-if="pageType == 'detail'" class="form-detail-item">{{ formData.abstract }}</span>
              <el-input type="textarea" v-model="formData.abstract" placeholder="请输入案件摘要" v-else></el-input>
            </el-form-item>
            
            <el-form-item label="发明人" prop="inventors">
              <inventors v-model="formData.inventors" :disabled="pageType == 'detail'"></inventors>
            </el-form-item>

            <el-form-item label="证件号码(第一发明人)" prop="identity">
              <el-input v-model="formData.identity" placeholder="请填写第一发明人证件号码"></el-input>
            </el-form-item>

            <el-form-item label="技术分类" prop="classification">
              <classification v-model="formData.classification" :disabled="pageType == 'detail'"></classification>
            </el-form-item>
            <el-form-item label="产品名称" prop="products">
              <product v-model="formData.products" multiple :disabled="pageType == 'detail'"></product>
            </el-form-item>
						<el-form-item label="标签" prop="tags">
							<static-select type='tag' v-model="formData.tags" :disabled="pageType == 'detail'" multiple></static-select>
						</el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" :disabled="pageType == 'detail'"></el-input>
            </el-form-item>
						<el-form-item label="附件" prop="attachments" v-if="pageType != 'detail'">
               <upload v-model="formData.attachments" :file-list="attachments" ref="upload"></upload>
						</el-form-item>
            <el-form-item label="附件" v-else>
              <table-component :data="attachmentsData" :tableOption="tableOption"></table-component>
            </el-form-item>
            <el-form-item label="相关专利" v-if="pageType == 'detail'">
              <table-component :data="patent" :tableOption="patentOption"></table-component>
            </el-form-item>
						<el-form-item  v-if="pageType != 'detail'">
						   <el-button @click="submit" type="primary" :disabled="btn_disabled">提交</el-button>
               <el-button @click="save()" :disabled="btn_disabled">暂存</el-button>
						   <el-button @click="cancel" :disabled="btn_disabled">取消</el-button>
						</el-form-item>
			  	</el-form>
		  	</el-col>
		  	<el-col :span="6" style="padding-left: 40px;">
          <template v-if="pageType=='detail'">
  					<h3 style="margin-top: 0;">提案流程</h3>
  					<el-steps :space="100" direction="vertical">
              <el-step v-for="(item, index) in tasks" :key="item.id" :icon="item.status ? '' : 'loading'" :status="item.status ? 'success' : 'finish'" :title="item.node_name" :description="`承办人：${item.person_in_charge_name}；开始时间：${item.start_time}；完成时间：${item.end_time}；备注：${item.remark}`"></el-step>
  					</el-steps>
          </template>
          <template v-else>
            <h3 style="margin-top: 40px;">提案模板</h3>
            <ul class="proposal-model">
              <li><i class="iconfont icon-docx"></i><a href="/files/204 ">交底书模板.doc</a></li>
              <!-- <li><i class="iconfont icon-docx"></i><a href="javascript:void(0)">技术交底书范例(软件类).doc</a></li>
              <li><i class="iconfont icon-ppt"></i><a href="javascript:void(0)">15分钟如何写一个专利底稿.pptx</a></li> -->
            </ul>
          </template>
		  	</el-col>
	  	</el-row>
      <el-dialog title="提交任务" :visible.sync="dialogVisible">
        <task-finish 
           
          :id="update_id"          
          @submitSuccess="handleSubmitSuccess"
          @cancel="dialogVisible=false"
          ref="task"
        >
        </task-finish>
      </el-dialog>
  	</div>
</template>

<script>
import axiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import PopTree from '@/components/common/PopTree'
import PcSubmit from '@/components/page_extension/ProposalCommon_submit'
import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import Inventors from '@/components/form/Inventors'
import Proposer from '@/components/form/Proposer'
import Member from '@/components/form/Member'
import Upload from '@/components/form/Upload'
import TaskFinish from '@/components/common/TaskFinish'
import StaticSelect from '@/components/form/StaticSelect'
import { checkInventors } from '@/const/validator.js'
import { mapGetters } from 'vuex'


const typeMap = new Map([['/proposal/add', 'add'], ['/proposal/edit', 'edit'], ['/proposal/detail', 'detail']]);
const URL = '/api/proposals';


//https://jsonplaceholder.typicode.com/posts/
export default {
  name: 'proposalCommon',
  mixins: [axiosMixins],
  methods: {
    handleSubmitSuccess () {
      this.$router.push('/proposal/list');
    },
    save ( callback=_=>{this.$message({message: '编辑成功', type: 'success'}); this.$router.push('/proposal/list')} ) {
      
      if(this.pageType == 'add' && !this.formData.proposer) {
        this.formData.proposer = this.userid;
      }

      this.$refs.form.validate(valid=>{
        
        if(valid) {
          this.btn_disabled = true;
          const flag = this.pageType == 'add';
          const url = flag ? URL : `${URL}/${this.id}`;
          const success = callback;
          const data = this.formData;
          const complete = _=>{ this.btn_disabled = false };
          flag ? this.axiosPost({url, data, success, complete}) : this.axiosPut({url, data, success, complete});
        }else {
          this.$message({message: '请正确填写提案字段', type: 'warning'});
        }
      });         
    },
    submit () {      
      this.save(d=>{
          if(this.pageType != 'edit') {
            this.pageType = 'edit';
            this.id = d.proposal_id;  
          }
          
          this.update_id = d.task_id;
          this.dialogVisible = true;//触发组件内部的created和mounted函数,因为id不会变化,理论上只会触发一次任务完成面板请求

          // //这里调用为提案编写的任务完成接口，主要目的是填充当前备注与附件
          const remark = this.formData.remark;
          const attachments = this.$refs.upload.getFileList();
          // console.log(remark, attachments);
          this.$nextTick(_=>{
            this.$refs.task.proposalFinish({remark, attachments});  
          });

      });        
    },
    cancel () {
      this.$router.push('/proposal/list');
    },
  	createProposal () {
  		const d = this;
  		d.$refs.form.validate((valid)=>{
        if(valid) {
          d.$refs.submit.show();
  			}
  		});
  	},
    refreshCommon () {
      const t = this.pageType;
      
      if( t == 'detail' || t== 'edit' ) {
        const id = this.$route.query.id;
        this.id = id;
        
        this.$store.commit('onLoading');
        this.$axios.get(`${URL}/${id}`).then(response=>{
          this.$store.commit('cancelLoading');
          const data = response.data.proposal;
          const { inventors, proposer, classification, products, attachments } = data;
           
          data.inventors = inventors.map((d)=>{return {id: d.id, share: d.share, name: d.name}});
          data.proposer = proposer.id;
          this.proposer_name = proposer.name;

          if(t == 'detail') {
            this.create_time = data.create_time;
            this.update_time = data.update_time;
            this.tasks = data.tasks;
            this.patent = data.patents;
            this.status = data.status;
          }
          
          if(classification) {
            data.classification = classification.id;
            this.classificationText = classification.name;
          }

          if(products.length != 0) {
            const {name, id} = this.$tool.splitObj(products, ['name', 'id']);
            data.products = id;
            this.productText = name.join('；');
          }

          if( attachments.length != 0) {
            this.attachments = attachments;
            data.attachments = attachments.map(d=>d.id);
          }
          
          this.$tool.coverObj(this.formData, data);
        });
      }else {
        this.proposer_name = this.username;
        if(this.userid && this.username) {
          this.formData.inventors = [{ id: this.userid, name: this.username, share: '100', identity: this.useridentity }];  
        }        
      }
    }
  },
  data () {
    return {
      id: '',
      status: 0,
      pageType: '',
      tasks: [],
      patent: [],
      formData:  { 
        title: '',
        abstract: '',
        proposer: '',
        remark: '',
        inventors: [],
        tags: [],
        attachments: [],
        classification: '',
        products: [],
        identity: '',
      },
      attachments: [],
      create_time: '',
      update_time: '',
      proposer_name: '',
      formRules: {
      	'title': [
      		{required: true, message: '案件名不能为空',trigger: 'blur'},
          {pattern: /^[^~!@#$%^&*]+$/, message: '案件名不能包含非法字符', trigger: 'blur'},
          {max: 150, message: '长度不能超过150个字符', trigger: 'blur' }
      	],
        'abstract': [
          {required: true, message: '案件摘要不能为空', trigger: 'blur'},
          {max: 1000, message: '长度不能超过1000个字符', trigger: 'blur' }  
        ],
        'inventors': { 
          type: 'array',
          required: true,
          trigger: 'change', 
          validator: (a,b,c)=>{

            //这里没有使用插件的传入值,是因为在监测输入框输入事件时,值未正常更新
            //WTF 不知道什么鬼,手动传入咯
            this.$nextTick(_=>{
              checkInventors(a, this.formData.inventors, c);
            })

          },
        },
        'identity': {required: true, message: '第一发明人证件号码不能为空'},
        'attachments': {type: 'array', required: true, message: '附件不能为空', trigger: 'change'}     	
      },
      tableOption: {
        'is_search': false,
        'is_pagination': false,
        'is_border': false,
        'columns': [
          { type: 'text', label: '附件名称', prop: 'name' },
          { type: 'text', label: '附件格式', prop: 'ext' },
          { type: 'text', label: '附件大小 ', prop: 'size' },
          { 
            type: 'action', 
            label: '详情',
            btns: [
              {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
              {type: 'download', click: ({downloadUrl})=>{window.location.href = downloadUrl}},
            ],
          }
        ]
      },
      patentOption: {
        'is_search': false,
        'is_pagination': false,
        'is_border': false,
        'columns': [
          { type: 'text', label: '案号', prop: 'serial' },
          { type: 'text', label: '标题', prop: 'title' },
          { type: 'text', label: '当前节点', prop: 'progress_name' },
          { 
            type: 'action',
            btns: [
              {type: 'detail', click: ({id})=>{this.$router.push(`/patent/list/detail/${id}`)}}
            ]  
          }
        ]
      },
      classificationText: '',
      productText: '',
      props: {
        label: 'name',
        children: 'children',
      },
      btn_disabled: false,
      dialogVisible: false,
      update_id: '',
    }
  },
  created () {
    this.pageType = typeMap.get(this.$route.path);
    
  },
  mounted () {
    this.refreshCommon();
  },
  computed: {
    ...mapGetters([
      'username',
      'userid',
      'useridentity',
    ]),
    tagOptions () {
      return this.$store.getters.tagOptions;
    },
    attachmentsData () {
      const d = this.attachments;
      return { total: d.length, data: d };
    },
    classificationData () {
      return this.$store.getters.classificationData;
    },
    productData () {
      return this.$store.getters.productData;
    }
  },
  watch: {
    userid () {
      this.refreshCommon();
    },
    'formData.inventors': {
      handler(val) {
        if(val[0] && val[0]['identity']) {
          this.formData.identity = val[0]['identity'];
        }
      }
    }
  },
  components: { 
    PopTree, 
    TableComponent, 
    Inventors, 
    PcSubmit, 
    Upload, 
    Member, 
    Classification, 
    Product, 
    TaskFinish, 
    StaticSelect 
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin fileicon {
  position: relative;
  top: 3px;
  margin-right: 7px;
}
.proposal-model {
  list-style-type: decimal
}
.proposal-model li {
  font-size: 13px;
    color: #8391a5;

    margin-top: 7px;
}
.proposal-model li a {
      text-decoration: none;
    color: #8391a5;
}
.proposal-model li a:hover {
  color: #58B7FF;
}
.icon-docx {
  color: #386caf;
  @include fileicon;
}
.icon-ppt {
  color: #e9573f;
  @include fileicon;
}

</style>
