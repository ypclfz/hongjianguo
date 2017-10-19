<template>
  <div class="user-group" v-loading="loading">
	  <div class="app-collapse-header" style="line-height: 35px;">
			<span style="font-size: 14px;">用户组</span>
			<div style="float: right;">
			<el-button icon="plus" size="mini" title="添加用户组" @click="addPop"></el-button>
			<el-button icon="edit" :disabled="editDisabled" size="mini" title="编辑用户组" style="margin-left: 0;" @click="editPop"></el-button>
			<el-button icon="delete" :disabled="deleteDisabled" size="mini" title="删除用户组" style="margin-left: 0;" @click="groupDelete"></el-button>
			</div>
	  </div>
	  
		<el-tree
		  :data="groupOptions"
		  node-key="id"
		  :props="props"
		  highlight-current
		  @current-change="handleCurrentChange"
		  :current-node-key="setCurrent"
		  ref="tree"
      :render-content="renderContent"
		>
		</el-tree>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
			<el-form label-width="80px" :model="form" ref="form">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入用户组名称"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="form.description" type="textarea" placeholder="请输入用户组描述"></el-input>
				</el-form-item>
				<el-form-item style="margin-bottom: 0px;">
					<el-button type="primary" v-if="popType == 'add'" @click="add">添加</el-button>
					<el-button type="primary" v-if="popType == 'edit'" @click="edit">编辑</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
    <el-dialog :title="powerTitle" class="dialog-small" :visible.sync="dialogPowerVisible" :loading="powerLoading">
      <div style="height: 500px; overflow-y: auto; border-radius: 5px; border: 1px solid #ccc; margin-bottom: 20px;" v-loading="powerLoading" element-loading-text="加载设置中...">
      <el-form label-width="300px">
        <el-form-item v-for="item in group_rules" :label="item.name" :key="item.id">
          <app-switch type="status" v-model="item.checked" style="margin-left: 50px"></app-switch>
        </el-form-item>
      </el-form>
      </div>
      <el-button type="primary" @click="saveRules">保存设置</el-button>
    </el-dialog>
	</div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppSwitch from '@/components/form/AppSwitch'

const URL = 'api/groups';
const allUser = {name: '全部用户', description: '该用户组用于存放所有的用户，不可编辑，不可删除', id: 0};


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
			'setCurrent': '',
      'dialogVisible': false,
      'dialogPowerVisible': false,
      'loading': false,
      'powerLoading': false,
      'powerTitle': '',
      'group_rules': [],
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
  		return this.value && this.value.id != 0 && this.value.isRemovable ? false : true;
  	},
    groupOptions () {
      let g = this.$store.getters.groupOptions;
      
      if(g == undefined) {
        this.loading = true
        this.$store.commit('setGroup',[]);
        this.$store.dispatch('refreshGroup', _=>{ this.loading = false });
        g = [];
      }

      g = [{name: '全部用户', description: '该用户组用于存放所有的用户，不可编辑，不可删除', id: 0}, ...g];

      return g;
    },
    groupMap () {
      const map = this.$store.getters.groupMap;
      map.set(0, allUser);
      return map;
    },
  },
  methods: {
    saveRules() {
      const url =  `${URL}/${this.value.id}`;
      const data = {rules: this.group_rules};
      const success = _=>{
        this.$message({message: '保存权限设置成功', type: 'success'});
        this.dialogPowerVisible = false;
      }

      this.axiosPut({url, data, success});
    },
    powerPop(store, data) {
      this.dialogPowerVisible = true;
      this.powerLoading = true;
      this.powerTitle = `设置${data.name}权限`;

      const url = `${URL}/${data.id}`;
      const success = _=>{
        this.group_rules = _.group.rules;
        this.powerLoading = false;
      };
      this.axiosGet({url, success});
    },
    renderContent(h,{node, store, data}) {

      return (
          <span style="white-space: normal;">
            <span>
              <span style="font-size: 12px">{ node.label }</span>
            </span>
            <span style="float: right; margin-right: 20px;">
              {data.id !== 0 && data.id !== 1 ? <el-button size="mini" on-click={ () => this.powerPop(store, data) }>权限</el-button> : <i></i>}
            </span>
          </span>);
    },
  	handleCurrentChange (data) {
    
      if(typeof data == 'number') {
        data = this.groupMap.get(data);
      }
      
      this.setCurrent = data.id;
  		this.$emit('input', data);
  	},
  	refreshData () {
      
      const callback = _=>{
        this.loading = false
        const def = {name: '全部用户', description: '该用户组用于存放所有的用户，不可编辑，不可删除', id: 0};
        this.$nextTick(()=>{  
          if(this.value == '') {
            this.handleCurrentChange(0);
          }else {
            this.handleCurrentChange(this.value.id);
          }
        })
      }

      this.$store.dispatch('refreshGroup', callback);  		
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
  		if( !id ) {
  			this.$message({message: '不可编辑，不可删除？', type: 'error'});
  			return false;
  		}

  		this.popType = 'edit';
  		this.dialogVisible = true;
      this.$nextTick(_=>{
        this.$tool.coverObj(this.form, this.value);
      })
  		
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
  components: { AppSwitch },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>