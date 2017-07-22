<template>
  	<div class="main">
  		<el-row>
	  		<el-col :span="18">
		  		<el-form label-width="100px" :rules="formRules" :model="formData" ref="form">
            <el-form-item label="创建时间" v-if="type == 'detail'">
              {{ formData.create_time }}
            </el-form-item>
            <el-form-item label="更新时间" v-if="type == 'detail'">
              {{ formData.update_time }}
            </el-form-item>
						<el-form-item label="案件名称" prop="title">
							<el-input v-model="formData.title" placeholder="请输入案件名称" :disabled="type == 'detail'">
              </el-input>
						</el-form-item>
						<el-form-item label="案件摘要" prop="abstract">
							<el-input type="textarea" v-model="formData.abstract" placeholder="请输入案件摘要" :disabled="type == 'detail'"></el-input>
						</el-form-item>
						
						<el-form-item label="发明人" prop="inventors">

              <inventors v-model="formData.inventors" @addInventor="addInventor" @deleteInventor="deleteInventor" :disabled="type == 'detail'"></inventors>

						</el-form-item>

            <el-form-item label="提案人" prop="proposer">
              <proposer v-model="formData.proposer"></proposer>
            </el-form-item>
            <el-form-item label="技术分类">
              <el-input readonly @focus="treeShow" :value="tecText" :disabled="type == 'detail'"  ></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input v-model="formData.product" :disabled="type == 'detail'"></el-input>
            </el-form-item>
						<el-form-item label="标签" prop="tags">
							<el-select  multiple filterable allow-create placeholder="请选择标签" v-model="formData.tags" :disabled="type == 'detail'">
		            <el-option
		              v-for="item in tagOptions"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value">
		            </el-option>
		          </el-select>
						</el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" :disabled="type == 'detail'"></el-input>
            </el-form-item>
						<el-form-item label="附件" prop="attachments" v-if="type != 'detail'">
               <upload v-model="formData.attachments"></upload>
						</el-form-item>
            <el-form-item label="附件" v-else>
              <table-component :data="attachmentsData" :tableOption="tableOption"></table-component>
            </el-form-item>
						<el-form-item  v-if="type != 'detail'">
						   <el-button type="primary" @click="createProposal">提交</el-button>
               <el-button @click="addProposal">保存</el-button>
<!-- 						   <el-button>取消</el-button> -->
						</el-form-item>
			  	</el-form>
		  	</el-col>
		  	<el-col :span="6" style="padding-left: 40px;">
					<h3 style="margin-top: 0;">提案流程</h3>
					<el-steps :space="100" direction="vertical" :active="0">
					  <el-step title="发明人提案"></el-step>
					  <el-step title="部门经理审核"></el-step>
					  <el-step title="IPR审核"></el-step>
					  <el-step title="委案"></el-step>
					</el-steps>
          <h3 style="margin-top: 40px;">提案模板</h3>
          <ul class="proposal-model" >
            <li><i class="iconfont icon-docx"></i><a href="#">技术交底书范例(结构类).docx</a></li>
            <li><i class="iconfont icon-docx"></i><a href="#">技术交底书范例(软件类).doc</a></li>
            <li><i class="iconfont icon-ppt"></i><a href="#">15分钟如何写一个专利底稿.pptx</a></li>
          </ul>
		  	</el-col>
	  	</el-row> 
      <el-dialog title="选择技术分类" :visible.sync="dialogVisible">
        <el-tree
          :data="treeData.data"
          :props="treeData.props"
          show-checkbox
          default-expand-all
          check-strictly
          node-key="id"
          ref="tree"
          @check-change='treeChange'
          style="border-radius: 5px;"
        >
        </el-tree>
        <div style="margin-top: 15px;">
          <el-button type="primary" @click="treeSave">保存</el-button>
          <el-button @click="treeCancel">取消</el-button>
        </div>
      </el-dialog>
      <pc-submit ref="submit"></pc-submit>
  	</div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import PcSubmit from '@/components/page_extension/ProposalCommon_submit'
import Inventors from '@/components/form/Inventors'
import Proposer from '@/components/form/Proposer'
import Upload from '@/components/form/Upload'


const typeMap = new Map([['/proposal/add', 'add'], ['/proposal/edit', 'edit'], ['/proposal/detail', 'detail']]);
const url = '/api/proposals';
const tagUrl = 'http://www.zhiq.wang/tag/lists';
const fileDelete = 'http://www.zhiq.wang/file/delete';
const formData = {
  title: '',
  abstract: '',
  proposer: '',
  remark: '',
  inventors: [
    { id: '', share: '' },
  ],
  tags: [],
  attachments: [],
  class: '',
  product: '', 
}
//https://jsonplaceholder.typicode.com/posts/
export default {
  name: 'proposalCommon',
  methods: {
    addProposal () {
      this.$axios
        .post('/api/proposals', this.formData)
        .then(response=>{console.log(response)})
        .catch(error=>{console.log(error)});

    },
  	createProposal () {
  		const d = this;
  		d.$refs.form.validate((valid)=>{
        if(valid) {
          d.$refs.submit.show();
  			}
  		});
  	},
    querySearch(queryString, cb) {   
      cb([
        {value: '联系人一'},
        {value: '联系人一'},
        {value: '联系人一'},
      ]);
    },
    querySearchAsync () {

    },
    cancelEdit() {
      this.$router.push('/proposal/list');
    },
    handleFetch (val, cb) {
      cb([
        { value: '10' },
        { value: '20' },
        { value: '30' },
        { value: '40' },
        { value: '50' },
        { value: '60' },
        { value: '70' },
        { value: '80' },
        { value: '90' },
        { value: '100' },
      ])
    },
    addInventor () {
      this.formData.inventors.push({id: '', share: ''});
      this.$refs.form.validateField('inventors');
    },
    deleteInventor (index) {
      this.formData.inventors.splice(index, 1);
      this.$refs.form.validateField('inventors');
    },
    treeShow () {
      
      this.dialogVisible = true;
      if(this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([this.formData.class]);
      }

    },
    treeChange (a, b) {
      if(b) {
        this.$refs.tree.setCheckedKeys([a.id]);
      }
    },
    treeSave () {
      const arr = this.$refs.tree.getCheckedNodes();
      if(arr[0]) {
        this.tecText = arr[0]['label'];
        this.formData.class = arr[0]['id'];
      }else {
        this.tecText = '';
        this.formData.class = '';
      }
      this.dialogVisible = false;
    },
    treeCancel () {
      this.dialogVisible = false;
    },
    refreshCommon () {
      console.log('aaaaaaa');
      const t = this.type;
      if( t == 'detail' || t== 'edit' ) {
        const id = this.$route.query.id;
        this.$axios.get(`${url}/${id}`).then(response=>{
          const data = response.data.proposal;
          const { inventors, proposer } = data;
          data.inventors = inventors.map((d)=>{return {id: d.id, share: d.share}});
          data.proposer = proposer.uid;
          this.formData = data;
        });
      }else {
        this.formData = this.$tool.deepCopy(formData);
      }
    }
  },
  data () {
    return {
      formData: {
          
      },
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
        'proposer': { type: 'number', required: true, message: '联系人不能为空', trigger: 'change' },
        'attachments': {type: 'array', required: true, message: '附件不能为空', trigger: 'change'}
      	
      },
      option: {
        'proposer': [
          { label: '提案人一', value: 1 },
          { label: '提案人二', value: 2 },
          { label: '提案人三', value: 3 },
        ],
        'percent': [ '10', '20', '30', '40', '50', '60', '70', '80', '90', '100' ],
      },
      inventors: [
        { label: '红坚果', value: 1 }
      ],
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
      dialogVisible: false,
      treeData: {
        'data': [
          {
            id: '1',
            label: '空调技术',
            children: [
              { id: '1-1', label: '空调制冷' },
              { id: '1-2', label: '空调制热' },
            ]
          },
          { id: '2', label: '飞机' },
        ],
        props: {
          label: 'label',
          children: 'children',
        }
      },
      tecText: '',
      test: '',
    }
  },
  created () {
    this.refreshCommon();
  },
  computed: {
    type () {
      const type = typeMap.get(this.$route.path);
      return type;
    },
    tagOptions () {
      return this.$store.getters.tagOptions;
    },
    attachmentsData () {
      const d = this.formData.attachments;
      return { total: d.length, data: d };
    }
  },
  watch: {
    $route () {
      this.refreshCommon();
    }
  },
  components: { TableComponent, Inventors, PcSubmit, Upload, Proposer },

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
