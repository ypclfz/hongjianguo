<template>
  <div>
	<el-dialog :title="title" :visible.sync="dialogVisible" v-show="false" ref="dialog">
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
          style="border-radius: 5px;"
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
        <el-button v-if="popType == 'add'">添加</el-button>
        <el-button v-if="popType == 'edit'">编辑</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'popTree',
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
    }
  },
  data () {
		return {
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
    appendPop () {
      this.popType = "add";
      this.dialogPopVisible = true;
      this.$nextTick(_=>{
        this.$refs.form.resetFields();
      })
    },
    editPop (store, data) {
      this.popType = "edit";
      this.dialogPopVisible = true;
      this.$nextTick(_=>{
        this.form.name = data.name;
        this.form.description = data.description; 
      })
    },
    remove () {
      this.$confirm('删除后不可恢复, 确认删除？')
        .then(_=>{})
        .catch(_=>{});
    },
    renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            {   
              data.is_disabled ?
                <span style="float: right; margin-right: 20px" >
                  <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.appendPop(store, data)} }>新增</el-button>
                  <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.editPop(store, data)} }>编辑</el-button>
                  <el-button size="mini" on-click={ (e) => {e.stopPropagation(); this.remove(store, data)} }>删除</el-button>
                </span>
              : ''   
            } </span>
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