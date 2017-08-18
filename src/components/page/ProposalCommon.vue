 <template>
  	<div class="main">
  		<el-row>
	  		<el-col :span="18">
		  		<el-form label-width="100px" :rules="formRules" :model="formData" ref="form">
            
            <el-form-item label="提案人">{{ user.username }}</el-form-item>
            
            
            <el-form-item label="创建时间" v-if="pageType == 'detail'">
              {{ create_time }}
            </el-form-item>
            <el-form-item label="更新时间" v-if="pageType == 'detail'">
              {{ update_time }}
            </el-form-item>
            <el-form-item label="案件名称" prop="title">
              <el-input v-model="formData.title" placeholder="请输入案件名称" :disabled="pageType == 'detail'">
              </el-input>
            </el-form-item>
            <el-form-item label="案件摘要" prop="abstract">
              <el-input type="textarea" v-model="formData.abstract" placeholder="请输入案件摘要" :disabled="pageType == 'detail'"></el-input>
            </el-form-item>
            
            <el-form-item label="发明人" prop="inventors">

              <inventors v-model="formData.inventors" @addInventor="addInventor" @deleteInventor="deleteInventor" :disabled="pageType == 'detail'"></inventors>

            </el-form-item>


            <el-form-item label="技术分类" prop="classification">
              <classification v-model="formData.classification" :disabled="pageType == 'detail'"></classification>
            </el-form-item>
            <el-form-item label="产品名称" prop="products">
              <product v-model="formData.products" multiple :disabled="pageType == 'detail'"></product>
            </el-form-item>
						<el-form-item label="标签" prop="tags">
							<el-select  multiple filterable allow-create placeholder="请选择标签" v-model="formData.tags" :disabled="pageType == 'detail'">
		            <el-option
		              v-for="item in tagOptions"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value">
		            </el-option>
		          </el-select>
						</el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" :disabled="pageType == 'detail'"></el-input>
            </el-form-item>
						<el-form-item label="附件" prop="attachments" v-if="pageType != 'detail'">
               <upload v-model="formData.attachments" :file-list="attachments"></upload>
						</el-form-item>
            <el-form-item label="附件" v-else>
              <table-component :data="attachmentsData" :tableOption="tableOption"></table-component>
            </el-form-item>
						<el-form-item  v-if="pageType != 'detail'">
						   <el-button @click="submit()" type="primary" :disabled="btn_disabled">提交</el-button>
               <el-button @click="save()" :disabled="btn_disabled">暂存</el-button>
						   <el-button @click="cancel" :disabled="btn_disabled">取消</el-button>
						</el-form-item>
			  	</el-form>
		  	</el-col>
		  	<el-col :span="6" style="padding-left: 40px;">
					<h3 style="margin-top: 0;">提案流程</h3>
					<el-steps :space="100" direction="vertical" :active="0">
					  <el-step title="发明人提案"></el-step>
					  <!-- <el-step title="部门经理审核"></el-step> -->
					  <el-step title="IPR审核"></el-step>
					  <el-step title="提出申请"></el-step>
					</el-steps>
          <h3 style="margin-top: 40px;">提案模板</h3>
          <ul class="proposal-model" >
            <li><i class="iconfont icon-docx"></i><a href="javascript:void(0)">技术交底书范例(结构类).docx</a></li>
            <li><i class="iconfont icon-docx"></i><a href="javascript:void(0)">技术交底书范例(软件类).doc</a></li>
            <li><i class="iconfont icon-ppt"></i><a href="javascript:void(0)">15分钟如何写一个专利底稿.pptx</a></li>
          </ul>
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


const typeMap = new Map([['/proposal/add', 'add'], ['/proposal/edit', 'edit'], ['/proposal/detail', 'detail']]);
const URL = '/api/proposals';


//https://jsonplaceholder.typicode.com/posts/
export default {
  name: 'proposalCommon',
  mixins: [axiosMixins],
  methods: {
    handleSubmitSuccess () {
      this.$router.push('/task/finish');
    },
    save ( callback=_=>{this.$router.push('/proposal/list')} ) {
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
          this.$message({message: '请正确填写提案字段', type: 'error'});
        }
      });

          
    },
    submit () {      
      this.save(d=>{
        this.pageType = 'edit';
        this.id = d.proposal_id;
        this.update_id = d.task_id;
        this.dialogVisible = true;
        this.$nextTick(_=>{
          this.$refs.task.clear();
        })
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
    addInventor () {
      this.formData.inventors.push({id: '', share: ''});
      this.$refs.form.validateField('inventors');
    },
    deleteInventor (index) {
      this.formData.inventors.splice(index, 1);
      this.$refs.form.validateField('inventors');
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
          
          data.inventors = inventors.map((d)=>{return {id: d.id, share: d.share}});
          data.proposer = proposer.id;

          if(t == 'detail') {
            this.create_time = data.create_time;
            this.update_time = data.update_time;
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
        this.id = "";
        this.$refs.form.resetFields();
        this.classificationText = this.productText = '';
      }
    }
  },
  data () {
    return {
      id: '',
      pageType: '',
      formData:  { 
        title: '',
        abstract: '',
        proposer: '',
        remark: '',
        inventors: [
          { id: '', share: '' },
        ],
        tags: [],
        attachments: [],
        classification: '',
        products: [], 
      },
      attachments: [],
      create_time: '',
      update_time: '',
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
            let msg = '';
            let number = 0;
            const reg = /^[1-9][0-9]*$/;
            
            for(let d of b) {
              if( !d.id || !d.share ) {
                msg = '请完整填写发明人字段';
                break;
              }
            }

            if( !msg ) {
              for(let d of b) {
                let n;
                let flag = !!( reg.test(d.share) && (n = Number.parseInt(d.share)) && n >= 10 && n <= 100 && (number += n) );
                if( !flag ) { 
                  msg = '贡献率应为10-100的数字';
                  break;
                }
              }
            }

            if( !msg ) {
              if(number !== 100) {
                msg = '各发明人的贡献率之和应为100';
              }
            }

            if(msg) {
              c(msg);              
            }else {
              c();
            }            
          },
        },
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
              {type: 'download', click: ({downloadUr})=>{window.open(downloadUr)}},
            ],
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
    if(this.pageType == 'add') {
      this.formData.proposer = this.user.id;
    } 
  },
  mounted () {
    this.refreshCommon();
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    },
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
    $route () {
      this.refreshCommon();
    }
  },
  components: { PopTree, TableComponent, Inventors, PcSubmit, Upload, Member, Classification, Product, TaskFinish },

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
