<template>
  <div class="app-import">
		<el-table
			height="250"
			style="width: 100%"
			empty-text="暂无可导入数据"
			:data="tableData"
		> 
			<el-table-column fixed="left" label="关联案号" width="100" prop="project_id"></el-table-column>
			
			<template v-for="(col, index) in columns">
				<template v-if="col.type == 'text'">
	        <template v-if="col.render ? true : false">
	          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''">
	            <template scope="scope">
	              <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
	            </template>
	          </el-table-column>
	        </template>
	        <template v-else>
	          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''"></el-table-column>
	        </template>
	      </template>

	      <template v-else-if="col.type == 'array'">
	        <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''">
	          <template scope="scope">
	            <el-tag v-for="(item, i) in arrayRender(scope['row'],col)" style="margin-left: 5px;" close-transition :key="i">{{ item }}</el-tag>
	          </template>
	        </el-table-column>
	      </template>
			</template>

			<el-table-column fixed="right" label="操作" width="150">
	      <template scope="scope">
	        <el-button  type="text" size="small" @click="designPop(scope)">指定案号</el-button>
	        <el-button type="text" size="small" @click="deleteSingle(scope)">删除</el-button>
	      </template>
    	</el-table-column>
		</el-table>
  	<el-upload
		  :action="upload_url"
		  :on-success="handleSuccess"
		  drag
		  multiple
		  style="line-height: 48px;"
		>
		 	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</el-upload>

		<el-button style="margin-top: 20px;" type="primary" @click="importData">导入当前数据</el-button>
		
		<el-dialog title="指定案件号" :visible.sync="dialogVisible" :modal-append-to-body="false" :modal="false">
			<el-form label-width="100px">
				<el-form-item label="案件">
					<remote-select type="project" v-model="project_id"></remote-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="design" type="primary">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'

const config = [
	['patent', {
		action: 'getPatents',
		url: '/patents/import',
		category: 1,
	}],
	['copyright', {
		action: 'getCopyrights',
		url: '/copyrights/import',
		category: 3,
	}],
	['patent_notice', {
		action: 'getPatentNotices',
		url: '/notices/import',
		category: 1,
	}],
	['copyright_notice', {
		action: 'getCopyrightNotices',
		url: '/notices/import',
		category: 3,
	}]
]
const map = new Map(config);

export default {
  name: 'appImport',
  mixins: [ AxiosMixins ],
  props: {
  	'columns': {
  		type: Array,
  		default () {return []},
  	},
  	'type': null,
  },
  data () {
		return {
		  fileList: [],
		  tableData: [],
		  project_id: '',
		  dialogVisible: false,
		  $index: null,
		}
  },
  computed: {
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
  	design() {
  		const o = this.$tool.deepCopy(this.tableData[this.$index]);
  		o.project_id = this.project_id;

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

  		const url = this.config.url;
  		const data = this.tableData;
  		const success = _=>{ this.$emit('importSuccess') };

  		this.axiosPost({url, data, success});
  	},
  	handleSuccess (a,b,c) {
  		if(a.status) {
  			this.tableData.push(...a.data.list);
  		}else {
  			this.$message({message: this.info, type: 'warning'});
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
        return this.render(h, this.scope.row[this.prop], this.scope.row, this.prop);
      },
      props: {
        'render': null, 
        'scope': null, 
        'prop': {
          type: String,
          default: '',        
        }
      }
    },
    RemoteSelect, 	 	
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>