<template>
  <div>
	<el-dialog :title="title" :visible.sync="dialogVisible" v-show="false" ref="dialog" :modal="false">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          :data="data"
          :props="props"
          show-checkbox
          default-expand-all
          :filter-node-method="filterNode"
          check-strictly
          node-key="id"
          ref="tree"
          @check-change='treeChange'
          style="border-radius: 5px; height: 250px; overflow: auto;"
          :render-content="action ? renderContent : undefined"
          :expand-on-click-node="false"
          @node-click="handleClick"
        >
        </el-tree>
        <div style="margin-top: 15px;">
          <el-button type="primary" @click="treeSave">保存</el-button>
          <el-button @click="treeCancel">取消</el-button>
        </div>
  </el-dialog>
  <el-dialog :title="popTitle" :visible.sync="dialogPopVisible">
    <el-form :model="form" ref="form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px; margin-top: 10px;">
        <el-button v-if="popType == 'add'" @click="add">添加</el-button>
        <el-button v-if="popType == 'edit'" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>
<script>
import AxiosMinxins from '@/mixins/axios-mixins'

export default {
  name: 'popTree',
  mixins: [ AxiosMinxins ],
  props: {
  	'title': {
  		type: String,
  		default: '请选择树节点',
  	},
  	'data': {
  		type: Array,
  		default () {
  			return [];
  		},
  	},
  	'props': {
  		type: Object,
  		default () {
  			return {
  				label: 'label',
  				children: 'children',
  			}
  		}
  	}, 
  	'value': [String, Number, Array],
  	'multiple': {
  		type: Boolean,
  		default: false,
  	},
    'action': {
      type: Boolean,
      default: false,
    },
    'url': {
      type: String,
      default: '',
    }
  },
  data () {
		return {
      id: '',
		  dialogVisible: false,
      dialogPopVisible: false,
      filterText: '',
      popType: '',
      form: {
        name: '',
        description: '',
      }
		}
  },
  computed: {
    popTitle () {
      return this.popType == 'edit' ? '编辑' : '添加' ;
    }
  },
  mounted () {
  	// this.$refs.dialog.rendered = true;
  },
  methods: {
    handleClick (a,b,c) {
      this.$refs.tree.setChecked(a.id, !b.checked);
    },
  	show () {
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			const value = this.multiple ? this.value : [this.value]; 
    		this.$refs.tree.setCheckedKeys(value);
    	});
  	},
  	treeChange (a, b) {
  		const m = this.multiple;
  		if(!m && b) {
    		this.$refs.tree.setCheckedKeys([a.id]);
  		}
  	},
  	treeSave () {
      const arr = this.$refs.tree.getCheckedNodes();

      const ids = [];
      const labels = [];
      for(let d of arr) {
      	ids.push(d['id']);
      }

      if( this.multiple ) {
      	this.$emit('update:value', ids);
      }else {	
      	this.$emit('update:value', ids[0]);
      }

      this.dialogVisible = false;
  	},
  	treeCancel () {
  		this.dialogVisible = false;
  	},
    filterNode(value, data) {      
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    appendPop (store,data) {
      this.popType = "add";
      this.dialogPopVisible = true;
      this.id = data.id;
      this.$nextTick(_=>{
        this.$refs.form.resetFields();
      })
    },
    editPop (store, data) {
      this.popType = "edit";
      this.dialogPopVisible = true;
      
      this.id = data.id;
      this.form.name = data.name;
      this.form.description = data.description; 
    },
    add () {
      const url = this.url;
      const data = Object.assign({}, this.form, {parent: this.id});
      const success = _=>{ 
        this.dialogPopVisible = false;
        this.$message({message: '新增成功', type: 'success'});
        this.$emit('refresh', 'add');
      };

      this.axiosPost({url, data, success});
    },
    edit () {
      const url = `${this.url}/${this.id}`;
      const data = this.form;
      const success = _=>{ 
        this.dialogPopVisible = false;
        this.$message({message: '编辑成功', type: 'success'});
        this.$emit('refresh', 'edit'); 
      };

      this.axiosPut({url, data, success});
    },
    remove (store, data) {
      this.$confirm(`删除后不可恢复, 确认删除${data.name}？`)
        .then(_=>{
          const url = `${this.url}/${data.id}`;
          const success = _=>{ 
            this.$message({message: '删除成功', type: 'success'});
            this.$emit('refresh', 'remove');
          };

          this.axiosDelete({url, success});
        })
        .catch(_=>{});
    },
    renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span><span style="color: rgb(32, 160, 255);"> ({data.projects_count})</span>
            </span>
               
                <span style="float: right; margin-right: 20px" >
                  { data.is_children ? <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.appendPop(store, data)} }>新增</el-button> : '' }
                  { data.is_editable ? <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.editPop(store, data)} }>编辑</el-button> : '' }
                  { data.is_removable ? <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.remove(store, data)} }>删除</el-button> : '' }
                </span>   
            </span>
            );
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>