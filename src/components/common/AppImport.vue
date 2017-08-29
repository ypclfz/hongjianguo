<template>
  <div class="app-import">
		<el-table
			height="250"
			style="width: 100%"
			empty-text="暂无可导入数据"
			:data="tableData"
		> 
			<el-table-column fixed="left" label="关联案号" width="100"></el-table-column>
			
			<template v-for="col in columns">
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

			<el-table-column fixed="right" label="操作" width="100">
	      <template scope="scope">
	        <el-button @click="handleClick" type="text" size="small">查看</el-button>
	        <el-button type="text" size="small">编辑</el-button>
	      </template>
    	</el-table-column>
		</el-table>
  	<el-upload
		  action="upload_url"
		  :on-success="handleSuccess"
		  drag
		  multiple
		  style="line-height: 48px;"
		>
		 	<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		</el-upload>
		<el-button type="primary" @click="importData">导入当前数据</el-button>
  </div>
</template>

<script>

export default {
  name: 'appImport',
  props: {
  	'columns': {
  		type: Array,
  		default () {return []},
  	},
  	'action': {
  		type: String,
  		default: '',
  	}
  },
  data () {
		return {
		  fileList: [],
		  tableData: [],
		}
  },
  computed: {
  	upload_url () {
  		const action = this.action;
  		let url = '/api/files';
  		if(action != '') {
  			url += `?action=${action}`;
  		}

  		return url;
  	}
  },
  methods: {
  	importData () {
  		if(this.tableData.length == 0) {
  			this.$message({message: '导入数据不能为空', type: 'warning'});
  			return;
  		}

  		this.$message({message: '导入接口开发中', type: 'warning'});
  	},
  	handleSuccess (a,b,c) {
  		console.log(a,b,c);
  	},
  	arrayRender (row, col) {
    	const arr = row[col.prop];
    	return col.render ? col.render(arr) : arr;
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
	    }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>