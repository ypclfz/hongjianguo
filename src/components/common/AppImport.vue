<template>
  <el-dialog :title="config.title" :visible="visible" @update:visible="handleVisible" class="dialog-medium">
  <div class="app-import">
    <a v-if="config.model ? true : false" :href="config.model">{{ config.model_name }}</a>
		<el-table
			height="250"
			style="width: 100%"
			empty-text="暂无可导入数据"
			:data="tableData"
		> 
      <el-table-column fixed="left" label="序号" width="80">
        <template slot-scope="scope"><span style="color: #20a0ff">{{ scope.$index + 1 }}</span></template>
      </el-table-column>
			<el-table-column fixed="left" label="案号" width="150" prop="serial"></el-table-column>
			
			<template v-for="(col, index) in columns">

				<template v-if="col.type == 'text'">
	        <template v-if="col.render ? true : false">
	          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''">
	            <template slot-scope="scope">
	              <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
	            </template>
	          </el-table-column>
	        </template>
	        <template v-else-if="col.render_simple ? true : false">
	          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''">
	            <template slot-scope="scope">
	              <span class="table-column-render">{{ scope.row[col.prop][col.render_simple] }}</span>
	            </template>
	          </el-table-column>
	        </template>
	        <template v-else>
	          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''"></el-table-column>
	        </template>
	      </template>

	      <template v-else-if="col.type == 'array'">
	        <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''">
	          <template slot-scope="scope">
	            <el-tag v-for="(item, i) in arrayRender(scope['row'],col)" style="margin-left: 5px;" close-transition :key="i">{{ item }}</el-tag>
	          </template>
	        </el-table-column>
	      </template>
			</template>

			<el-table-column label="操作" width="150">
	      <template slot-scope="scope">
	        <el-button  type="text" size="small" @click="designPop(scope)">指定案号</el-button>
	        <el-button type="text" size="small" @click="deleteSingle(scope)">删除</el-button>
	      </template>
    	</el-table-column>

		</el-table>
  	<el-upload
		  :action="upload_url"
		  :on-success="handleSuccess"
      :show-file-list="false"
		  drag
		  multiple
		  style="line-height: 48px;"
      ref='upload'
		>
		 	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</el-upload>

		<el-button style="margin-top: 10px;" type="primary" @click="importData" :disabled="importLoading">导入</el-button>
		
		<el-dialog title="指定案件" :visible.sync="dialogVisible" :modal-append-to-body="false" :modal="false">
			<el-form label-width="100px" label-position="top">
				<el-form-item label="案件">
					<remote-select type="project" v-model="serial" ref="project"></remote-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="design" type="primary">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
  </div>
  </el-dialog>
</template>

<script>
import RemoteSelect from '@/components/form/RemoteSelect'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

const config = [
	['patent', {
		action: 'getPatents',
    title: '导入专利',
		url: '/api/patents/import',
		category: 1,
    model: '/static/templates/patent_batch_template.xlsx',
    model_name: '专利导入模板',
	}],
	['copyright', {
		action: 'getCopyrights',
    title: '导入版权',
		url: '/copyrights/import',
		category: 3,
    model: '/static/templates/copyright_batch_template.xlsx',
    model_name: '版权导入模板',
	}],
	['patent_notice', {
		action: 'getPatentNotices',
    title: '导入专利通知书',
		url: '/notices/import',
		category: 1,
    // model: '',
	}],
	['copyright_notice', {
		action: 'getCopyrightNotices',
    title: '导入版权通知书',
		url: '/notices/import',
		category: 3,
    // model: '',
	}],
  ['feesIncome', {
    action: 'getFeesIncome',
    title: '导入应收明细',
    url: '/fees/import',
    category: '',
    model: '/static/templates/fee_template.xlsx',
    model_name: '费用模板'
  }],
  ['feesPayable', {
    action: 'getFeesPayable',
    title: '导入应付明细',
    url: '/fees/import',
    category: '',
    model: '/static/templates/fee_template.xlsx',
    model_name: '费用模板'
  }],
  ['invoicePayable', {
    action: 'getFeesPayable',
    title: '导入付款单',
    url: '/invoices/import',
    category: '',
    model: '/static/templates/fee_template.xlsx',
    model_name: '账单模板'
  }]
]
const map = new Map(config);

export default {
  name: 'appImport',
  props: {
  	'columns': {
  		type: Array,
  		default () {return []},
  	},
  	'type': null,
    'visible': Boolean,
  },
  data () {
		return {
		  fileList: [],
		  tableData: [],
		  serial: '',
		  dialogVisible: false,
		  $index: null,
		}
  },
  computed: {
    ...mapGetters([
      'importLoading',
    ]),
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	},
  	upload_url () {
  		const action = this.config.action;
  		let url = '/api/files';
  		if(action != '') {
  			url += `?action=${action}`;
  		}

  		return url;
  	}
  },
  methods: {
    ...mapMutations([
      'setImportLoading',
    ]),
    handleVisible (val) {
      this.$emit('update:visible', val);
    },
  	design() {
  		const o = this.$tool.deepCopy(this.tableData[this.$index]);
      const serial = this.$refs.project.getSelected()[0].name;

  		const reg = /\[(.*)\]/;
      o.project = { name: serial.split('-')[1], id: this.$refs.project.getSelected()[0].id };
  		o.serial = serial.match(reg)[1];

  		this.tableData.splice(this.$index, 1, o);
  		this.dialogVisible = false;
  	},
  	designPop (scope) {
  		this.$index = scope.$index;
  		this.dialogVisible = true;
  	},
  	deleteSingle (scope) {
  		this.tableData.splice(scope.$index, 1);
  	},
  	importData () {
  		if(this.tableData.length == 0) {
  			this.$message({message: '导入数据不能为空', type: 'warning'});
  			return;
  		}
      if(this.config.url === '/notices/import')
        if( this.tableData.filter(_=>_.serial == '').length != 0 ) {
          this.$message({message: '必须指定案件名称', type: 'warning'});
          return;
        }
      
  		const url = this.config.url;
  		const data = this.tableData;
  		const success = _=>{ 
        this.tableData = [];
        this.$refs.upload.clearFiles();
        this.$emit('import-success'); 
      };
      complete = _=>{
        this.setImportLoading(false);
      }

      this.setImportLoading(true);
  		this.$axiosPost({url, data, success});
  	},
  	handleSuccess (a,b,c) {
  		if(a.status) {
  			this.tableData.push(...a.data.list);
  		}else {
  			this.$message({message: a.info, type: 'warning'});
  		}
  	},
  	arrayRender (row, col) {
    	const arr = row[col.prop];
    	return col.render ? col.render(arr) : arr;
  	},
  },
  components: { 
		'TableRender': {
      render: function(h) {
        if( !this.simple ) {
          return this.render(h, this.scope.row[this.prop], this.scope.row, this.prop);
        }else {

          const str = this.render(this.scope.row[this.prop]);
          return h('span', { class: { 'table-column-render': true} }, str)
        }
      },
      props: {
        'render': null, 
        'scope': null,
        'simple': {
          type: Boolean,
          default: false,
        },
        'prop': {
          type: String,
          default: '',        
        }
      },
    },
    RemoteSelect, 	 	
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>