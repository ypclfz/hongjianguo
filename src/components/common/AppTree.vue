<template>
  <div class="app-tree">
  	<div class="app-tree-header" style="background-color: #ccc; padding: 10px 0; overflow: hidden;">
      <!-- <span style="padding-left: 10px;
				position: relative;
				font-size: 16px;
				color: #58B7FF;
				font-weight: bold;
				top: 3px;">部门
			</span> -->
      <el-dropdown  @command="handleCommand" trigger="click" menu-align="start" style="margin-left: 10px; margin-top: 4px;" class="tree-dropdown">
        <el-button type="text" >{{ title }}<i class="el-icon-caret-bottom el-icon--right" style="font-size: 12px;"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="部门">部门</el-dropdown-item>
          <el-dropdown-item command="技术分类">技术分类</el-dropdown-item>
          <el-dropdown-item command="产品型号">产品型号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: right;padding-right: 5px">
        <el-button icon="plus" size="mini" @click="add"></el-button>
        <el-button icon="edit" size="mini" @click="edit"></el-button>
        <el-button icon="delete" size="mini" @click="remove"></el-button> 
      </div>
    </div>
    <el-input
      class="tree-search"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      :data="data"
      :props="props"
      :highlight-current="true"
      :expand-on-click-node="false"
      ref="tree"
      :filter-node-method="filterNode"
      :render-content="renderContent"
      @current-change="handleChange"
    >    
    </el-tree>
    <el-dialog :title="popTitle" :visible.sync="treeFormVisible" size="small">
		  <el-form :model="form" label-position="left">
		    <el-form-item label="部门名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off" placeholder="请输入部门名称..."></el-input>
		    </el-form-item>
		    <el-form-item label="部门描述" :label-width="formLabelWidth">
		      <el-input v-model="form.description" placeholder="请输入部门描述..." type="textarea"></el-input>
		    </el-form-item>
		    <el-form-item :label-width="formLabelWidth" style="margin-bottom: 0;">
		    	<el-button type="primary">确定</el-button>
		    	<el-button>取消</el-button>
		    </el-form-item>
		  </el-form>
		</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'appTree',
  props: ["option"],
  data () {
  	const d = this;
  	const {data, props} = d.option;
		return {
	  	filterText: '',
	  	popTitle: '',
	  	treeFormVisible: false,
	  	currentNode: null,
	  	data,
	  	props,
      title: '部门',
	  	form: {
	  		name: '',
	  		description: ''
	  	},
	  	formLabelWidth: '80px'
		}
  },
  methods: {
    handleCommand (c) {
      this.title = c;
    },
  	handleChange (d) {
  		this.currentNode = d;
  	},
  	add () {
  		this.popTitle = '添加部门';
  		this.form.name = '';
  		this.form.description = '';
  		this.treeFormVisible = true;
  	},
  	edit () {
  		if( !this.currentNode ) {this.$alert('请选择需要编辑的部门！',{'type': 'warning','closeOnClickModal': true}); return; };
  		
  		this.popTitle = '编辑部门';
  		this.form.name = this.currentNode.label;
  		this.form.description = this.currentNode.description ? this.currentNode.description : ''; 
  		this.treeFormVisible = true;
  	},
  	remove () {
  		if( !this.currentNode ) {this.$alert('请选择需要删除的部门！', {'type': 'warning', 'closeOnClickModal': true}); return;};

  		this.$confirm(`确认删除${this.currentNode.label}?`,{'type': 'info'}).then(()=>{console.log("删除")}).catch(()=>{console.log("取消")});
  	},
  	filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    renderContent(h, { node, data, store }) {	
      return h('span',{
        on: {
          dragover: (e)=>{ e.preventDefault(); },
          drop: (e)=>{ e.preventDefault();this.$alert(`${this.$store.getters.getDragId}移动到${data.label}`); },
        }
      },[
      	h('i', {
      		'class': {
      			'iconfont': true,
      			'icon-bumen': (() => data.type === 'department')(),
      			'icon-people': (() => data.type === 'staff')(),
      		}
      	}),
      	h('span', data.label)
      ])
    }
  },
  watch: {
  	filterText(val) {
  		this.$refs.tree.filter(val);
  	}
  }
}
</script>
<style>
.el-tree-node .icon-people {
	position: relative;
	top: -3px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tree-dropdown .el-button { padding: 0; }
.app-tree-header .el-button+.el-button {
  margin-left: 0;
}

.el-tree {
  border-top: 0;
}
</style>