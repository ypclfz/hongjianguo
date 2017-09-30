<template>
	<el-dialog title="文件上传" :visible.sync="dialogVisible" class="dialog-medium">  
		<el-table
			height="250"
			style="width: 100%"
			empty-text="暂无可上传数据"
			:data="tableData"
		>
			<el-table-column label="关联案件" prop="project">
        <template scope="scope">
          <remote-select :type="config.type" v-model="scope.row.project" single></remote-select>
        </template>
      </el-table-column>
      <el-table-column label="文件名称" prop="name"></el-table-column>
			<el-table-column label="文件类型" prop="type">
        <template scope="scope">
          <static-select type="file_type" v-model="scope.row.type"></static-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button icon="delete" size="mini" type="text" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
				
			
		</el-table>
  	<el-upload
		  :action="upload_url"
		  :on-success="handleSuccess"
		  drag
		  multiple
		  style="line-height: 40px;"
      :show-file-list="false"
		>
		 	<div class="el-upload__text"><em>单个或多个文件上传</em></div>
		</el-upload>
    <el-upload
      :action="`${upload_url}Zip`"
      :on-success="handleSuccess"
      drag
      multiple
      style="line-height: 40px;"
      :show-file-list="false"
    >
      <div class="el-upload__text"><em>压缩包上传</em></div>
    </el-upload>

		<el-button style="margin-top: 20px;" type="primary" @click="importData">确认上传</el-button>
		
<!-- 		<el-dialog title="指定案件号" :visible.sync="dialogVisibleIn" :modal-append-to-body="false" :modal="false">
			<el-form label-width="100px">
				<el-form-item label="案件">
					<remote-select :type="config.type" v-model="project_id"></remote-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="design" type="primary">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog> -->
	</el-dialog>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

const config = [
	['patent', {
		action: 'getPatentDocuments',
		url: '/patents/documents',
		type: 'patent',
	}],
	['copyright', {
		action: 'getCopyrightDocuments',
		url: '/copyrights/documents',
		type: 'copyright',
	}]
]
const map = new Map(config);

export default {
  name: 'fileUpload',
  mixins: [ AxiosMixins ],
  props: {
  	'type': null,
  },
  data () {
		return {
		  fileList: [],
		  tableData: [],
      file: [],
		  dialogVisible: false,
		  dialogVisibleIn: false,
		  project_id: '',
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
  	show () {
  		this.project_id = "";
  		this.dialogVisible = true;
  	},
  	design() {
  		const o = this.$tool.deepCopy(this.tableData[this.$index]);
  		o.project_id = this.project_id;

  		this.tableData.splice(this.$index, 1, o);
  		this.dialogVisible = false;
  	},
  	designPop (scope) {
  		this.$index = scope.$index;
  		this.dialogVisibleIn = true;
  	},
  	deleteSingle (scope) {
  		this.tableData.splice(scope.$index, 1);
  	},
  	importData () {
  		console.log(this.tableData);
      if(this.tableData.length == 0) {
  			this.$message({message: '上传数据不能为空', type: 'warning'});
  			return;
  		}

      for(let d of this.tableData) {
        if( !d.project || !d.type ) {
          return this.$message({message: '关联案件与文件类型不能为空', type: 'warning'});
        }
      }

  		const url = this.config.url;
  		const data = {file: this.file, list: this.tableData};
  		const success = _=>{
  			this.dialogVisible = false;
  			this.$message({message: '上传文件成功', type: 'success'});
  			this.$emit('uploadSuccess'); 
  		};

  		this.axiosPost({url, data, success});
  	},
  	handleSuccess (a,b,c) {
  		if(a.status) {
  			this.tableData.push(...a.data.list);
        this.file.push(a.data.file);
  		}else {
  			this.$message({message: a.info, type: 'warning'});
  		}
  	},
  	arrayRender (row, col) {
    	const arr = row[col.prop];
    	return col.render ? col.render(arr) : arr;
  	},
    handleDelete (index) {
      this.tableData.splice(index, 1);
    }
  },
  components: { 
    RemoteSelect,
    StaticSelect, 	
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>