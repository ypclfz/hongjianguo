<template>
  <div class="main">
  	<el-row :gutter="20">
  	<el-col :span="14">
  			<el-form label-width="80px" ref="form" :model="currentNode" :rules="rules">
  				<el-form-item label="技术名称" prop="name">
  					<el-input v-model="currentNode.name" :disabled="currentNode.id == ''"	></el-input>
  				</el-form-item>
  				<el-form-item label="技术描述" prop="description">
  					<el-input type="textarea" v-model="currentNode.description" :disabled="currentNode.id == ''"></el-input>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" @click="save" :disabled="currentNode.id == ''">保存</el-button>
  				</el-form-item>
  			</el-form>
  		</el-col>
  		<el-col :span="10">
  			<el-input
  				style="margin-bottom: 20px;"
				  placeholder="输入关键字进行查询技术分类树节点"
				  v-model="filterText">
				</el-input>
  			<el-tree 
  				:props="testTree.props" 
  				:data="testTree.data" 
  				:render-content="renderContent" 
  				node-key="id"
  				highlight-current 
  				@current-change="currentChange"
  				:expand-on-click-node="false"
  				:current-node-key="currentNode.id"
  				:default-expanded-keys="expand"
  				:filter-node-method="filterNode"
  				ref="tree"
  			>
  			</el-tree>
  		</el-col>
  		
  	</el-row>
  </div>
</template>

<script>

export default {
  name: 'technology',
  data () {
		return {
		  currentNode: {
		  	id: '',
		  	name: '',
		  	description: '',
		  },
		  rules: {
		  	'name': { required: true, message: '技术分类名称不能为空' }
		  },
		  filterText: '',
		  expand: [],
		  description: '',
		  testTree: {
		  },
		}
  },
  methods: {
  	append (node) {
  		const d = node.data;
  		if( !d.children ) this.$set(d, 'children', []);
  		const l = d.children.length;
  		const id_f = d.id;
  		const id_s = `${d.id}-${l+1}`;
  		const data = { id: id_s, name: '新建技术', description: '' };

  		d.children.push(data);
  		this.expand.push(id_f);
  		this.currentChange(data);

  	},
  	remove (node) {
  		const d = node.data;
  		const p = node.parent;
  		const index = d.id.split('-').pop() - 1;
  		const cn = this.currentNode;
  		
  		if(p.data.children) {
  			p.data.children.splice(index, 1);
  		}else {
  			p.data.splice(index, 1);	
  		}

  		if( d.id == cn.id ) this.$tool.clearObj(cn);
  		
  	},
  	save () {
  		const id = this.currentNode.id;

  		if( !id ) {
  			this.$alert('请选择需要修改的技术分类');
  			return false;
  		}

  		this.$refs.form.validate(valid=>{
  			if(valid) {
  				const {arr, index} = this.$tool.searchTree(this.testTree.data, id);
		  		const obj = arr[index];

		  		obj.name = this.currentNode.name;
		  		obj.description = this.currentNode.description;
  			}else {
  				this.$alert('请正确填写字段');
  			}
  		});  		
  	},
  	renderContent(h, { node }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.append(node)} }>添加</el-button>
            <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.remove(node)} }>移除</el-button>
          </span>
        </span>
      );
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    currentChange (data) {
    	this.$tool.coverObj(this.currentNode, data);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>