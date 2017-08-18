<template>
  <div class="user-group" v-loading="loading">
	  <div class="app-collapse-header" style="line-height: 46px;">
			<span style="font-size: 18px;">用户组</span>
			<div style="float: right;">
			<el-button icon="plus" size="mini" title="添加用户组" @click="addPop"></el-button>
			<el-button icon="edit" :disabled="editDisabled" size="mini" title="编辑用户组" style="margin-left: 0;" @click="editPop"></el-button>
			<el-button icon="delete" :disabled="deleteDisabled" size="mini" title="删除用户组" style="margin-left: 0;" @click="groupDelete"></el-button>
			</div>
	  </div>
	  
		  <el-tree
		  :data="data"
		  node-key="id"
		  :props="props"
		  highlight-current
		  @current-change="handleCurrentChange"
		  :current-node-key="setCurrent"
		  ref="tree"
			>
		</el-tree>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible"
	>
			<el-form label-width="80px" :model="form" ref="form">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入用户组名称"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="form.description" type="textarea" placeholder="请输入用户组描述"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-if="popType == 'add'" @click="add">添加</el-button>
					<el-button type="primary" v-if="popType == 'edit'" @click="edit">编辑</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'

const URL = 'api/groups';


export default {
  name: 'userListGroup',
  mixins: [ AxiosMixins ],
  props: {
  	'value': {
  		required: true,
  		type: [String, Object, Number]
  	}
  },
  data () {
		return {
			'data': [],
			'props': {
				label: 'name',
				children: 'cildren',
			},
			'form': {
				name: '',
				description: '',
			},
			'popType': '',
			'current_node': '',
			'dialogVisible': false,
			'setCurrent': '',
      'loading': false,
		}
  },
  computed: {
  	dialogTitle () {
  		return this.popType == 'add' ? '新建用户组' : '编辑用户组';
  	},
  	editDisabled () {
  		return this.value && this.value.id != 0 ? false : true;
  	},
  	deleteDisabled () {
  		return this.value && this.value.id != 0 ? false : true;
  	},
    groupMap () {
      return this.$store.getters.groupMap;
    }
  },
  methods: {
  	handleCurrentChange (data) {
  		this.setCurrent = data.id;
  		this.$emit('input', data);
  	},
  	refreshData () {
      this.loading = true;
  		// this.$store.dispatch('', );
  		const url = URL;
  		const def = {name: '全部用户', description: '该用户组用于存放所有的用户，不可编辑，不可删除', id: 0};
  		const success = _=>{ 
  			_.groups.unshift(def);
  			this.data = _.groups;
  			this.$nextTick(()=>{
  				
  				if(this.value == '') {
  					this.handleCurrentChange(def);
  				}else {
  					this.handleCurrentChange(this.$refs.tree.store.getNode(this.value.id).data);
  				}
  			})
  		};

      const complete = _=>{
        this.loading = false;
      }

  		this.axiosGet({url, success, complete});
  	},	
  	addPop () {
  		this.popType = 'add';
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			this.$refs.form.resetFields();
  		});
  	},
  	editPop () {
  		const id = this.value.id;
  		console.log(id);
  		if( !id ) {
  			this.$message({message: '不可编辑，不可删除？', type: 'error'});
  			return false;
  		}

  		this.popType = 'edit';
  		this.dialogVisible = true;
  		this.$tool.coverObj(this.form, this.value);
  	},
  	cancel () {
  		this.dialogVisible = false;
  	},
  	add () {
  		const url = URL;
  		const data = this.form;
  		const success = ()=>{
  			this.$message({message: '添加用户组成功', type: 'success'});
  			this.dialogVisible = false; 
  			this.refreshData();
  		};

  		this.axiosPost({url, data, success});
  	},
  	edit () {
  		
  		const url = `${URL}/${this.value.id}`;
  		const data = this.form;
  		const success = ()=>{
  			this.$message({message: '编辑用户组成功', type: 'success'});
  			this.dialogVisible = false;
		  	this.refreshData();
  		}

  		this.axiosPut({url, data, success});
  	},
  	groupDelete () {
  		const id = this.value.id;
  		if( !id ) {
  			this.$message({message: '不可编辑，不可删除？', type: 'error'});
  			return false;
  		}

      const name = this.groupMap.get(id).name;
  		this.$confirm(`删除后不可恢复，确认删除用户组‘${name}’？`)
  			.then(_=>{
  				const url = `${URL}/${id}`;
		  		const success = ()=>{
		  			this.$message({message: '删除用户组成功', type: 'success'});
		  			this.$emit('input', '');
		  			this.refreshData();
		  		}

		  		this.axiosDelete({url, success});

  			})
  			.catch(_=>{})
  	}
  },
  created () {
  	this.refreshData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>