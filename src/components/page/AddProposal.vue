<template>
  	<div class="main">
  		<el-row>
	  		<el-col :span="18">
		  		<el-form label-width="100px" :rules="formRules" :model="formData" ref="form">
						<el-form-item label="案件名称" prop="title">
							<el-input v-model="formData.title" placeholder="请输入案件名称">
              </el-input>
						</el-form-item>
						<el-form-item label="案件摘要" prop="abstract">
							<el-input type="textarea" v-model="formData.abstract" placeholder="请输入案件摘要"></el-input>
						</el-form-item>
						
						<el-form-item label="发明人" prop="inventors">

              <el-row v-for="(item, index) in formData.inventors" :key="index" style="margin-bottom:5px;">
                <el-col :span="12">
                  <el-select placeholder="请选择发明人" v-model="item.id">
                    <el-option 
                      v-for="item in option.inventors" 
                      :key="item.label" 
                      :label="item.label" 
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-autocomplete placeholder="贡献率" :fetch-suggestions="handleFetch" v-model="item.percent" style="width: 100%">
                    <template slot="append">%</template>
                  </el-autocomplete>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-button size="small" v-if="index != 0" @click="deleteInventor(index)">删除</el-button>
                </el-col>
              </el-row>

              <el-row>
                <el-button type='text' @click="addInventor">添加发明人</el-button>
              </el-row>

						</el-form-item>

            <el-form-item label="提案人" prop="proposer">
              <el-select v-model="formData.proposer">
                <el-option 
                      v-for="item in option.proposer" 
                      :key="item.label" 
                      :label="item.label" 
                      :value="item.value">
                </el-option>
              ></el-select> 
            </el-form-item>
            <el-form-item label="技术分类">
              <el-input readonly @focus="treeShow" :value="tecText"></el-input>
            </el-form-item>
						<el-form-item label="标签" prop="tags">
							<el-select  multiple filterable allow-create placeholder="请选择标签" v-model="formData.tags">
		            <el-option
		              v-for="item in lbOptions"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value">
		            </el-option>
		          </el-select>
						</el-form-item>
						<el-form-item label="附件" prop="attachments">
							
                <el-upload
					        class="upload-demo"
                  drag
                  :on-success="handleUploadSuccess"
                  :on-remove="handleUploadRemove"
					        action="http://www.zhiq.wang/file/upload"
					        multiple
                >
  						        <i class="el-icon-upload"></i>
  						        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--   						        <div class="el-upload__tip" slot="tip">备注：提案人请主要上传如下相关附件<br>1、技术交底书：专利必须上传此文件。从本发明的技术领域、背景技术、所解决的技术问题、技术方案介绍、有益效果等方面来介绍本发明；此类文件命名：技术交底书名称+技术交底书，如：一种手机装置技术交底书.doc<br>2、技术附图：揭露本发明技术的电子图档文件；此类文件命名： 技术附图名称+技术附图，如：一种手机摄像装置的技术附图.doc<br>3、签名文件：签名文件，授权书，宣誓书,主要是美国案需要使用<br>4、其他文件：其他与发明相关的技术文件或者证明文件</div> -->
  					     </el-upload>
               
						</el-form-item>
						<el-form-item>
						   <el-button type="primary" @click="createProposal">提交审核</el-button>
               <el-button>暂存</el-button>
               <el-button @click="cancelEdit" v-if="page_type == 'add' ? false : true">取消</el-button>
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
  	</div>
</template>

<script>
const url = 'http://www.zhiq.wang/proposal/save';
const tagUrl = 'http://www.zhiq.wang/tag/lists';
const fileDelete = 'http://www.zhiq.wang/file/delete';

//https://jsonplaceholder.typicode.com/posts/
export default {
  name: 'addProposal',
  methods: {
  	createProposal: function() {
  		const d = this;
  		d.$refs.form.validate((valid)=>{
  			if(valid) {
          d.$http.post(url, d.formData).then((data)=>{console.log(data); this.$router.push('/proposal/list')}, (error)=>{console.log(error)});
  			}else {
  				d.$alert("请正确填写提案字段", {type: 'error', closeOnClickModal: true});
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
    handleUploadSuccess (p, f) {
      if(p.status) {
        f.customId = p.file.uid;
        this.formData.attachments.push(p.file.uid);
      }else {
        this.$alert(p.info);
      }
    },
    handleUploadRemove (f) {
      const id = f.customId;

      this.$http.post(fileDelete, { id });

      const arr = this.formData.attachments;
      for(let i = 0; i < arr.length; i++) {
        if(arr[i] == id) {
          arr.splice(i,1);
          break;
        }
      }
    },
    cancelEdit() {
      this.$router.push('/proposal/list');
    },
    handleFetch (val, cb) {
      cb([
        {value: '10'},
        {value: '20'},
        {value: '30'},
        {value: '40'},
        {value: '50'},
        {value: '60'},
        {value: '70'},
        {value: '80'},
        {value: '90'},
        {value: '100'},
      ])
    },
    addInventor () {
      this.formData.inventors.push({id: '', percent: ''});
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
    }
  },
  data () {
    return {
      page_type: 'add',
      formData: {
        title: '',
        abstract: '',
        proposer: '',
        inventors: [
          { id: '', percent: '' },
        ],
        tags: [],
        attachments: [],
        class: '',   
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
              if( !d.id || !d.percent ) {
                msg = '请完整填写发明人字段';
                break;
              }
            }

            if( !msg ) {
              for(let d of b) {
                let n;
                let flag = !!( reg.test(d.percent) && (n = Number.parseInt(d.percent)) && n >= 10 && n <= 100 && (number += n) );
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
            }

            
          },
        },
        'proposer': {required: true, message: '技术联系人不能为空', trigger: 'change'},
        'attachments': {type: 'array', required: true, message: '附件不能为空', trigger: 'change'}
      	
      },
      option: {
        'inventors': [
          { label: '发明人一', value: '1'},
          { label: '发明人二', value: '2'},
          { label: '发明人三', value: '3'},
        ],
        'proposer': [
          { label: '提案人一', value: '1' },
          { label: '提案人二', value: '2' },
          { label: '提案人三', value: '3' },
        ]
      },
      inventors: [
        { label: '红坚果', value: 1 }
      ],
      lbOptions: [
      ],
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

    this.$http.get(tagUrl).then(
      data=>{
        const body = data.body;
        const option = [];  
        if(body.status) {
          for(let d of body.tags) {
            option.push({label: d.tag, value: d.tag});
          }

          this.lbOptions.push(...option);
        }
      }, 
      error=>{console.log(error)});

    if(this.$route.path == '/proposal/list/edit'){
      this.formData = this.$route.query;
      this.page_type = 'edit';
    }
  },
  watch: {
    $route () {
      if(this.$route.path == '/proposal/add') {
        this.formData.title = '';
        this.formData.abstract = '';
        this.formData.proposer = '';
        this.formData.inventors = [];
        this.formData.tags = [];
        this.formData.attachments = [];

        this.page_type = 'add';
      }
    }
  }

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
