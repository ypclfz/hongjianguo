<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" v-show="false" ref="dialog">
        
        <el-tree
          :data="data"
          :props="props"
          show-checkbox
          default-expand-all
          check-strictly
          node-key="id"
          ref="tree"
          
          @check-change='treeChange'
          style="border-radius: 5px;"
        >
        </el-tree>
        <div style="margin-top: 15px;">
          <el-button type="primary" @click="treeSave">保存</el-button>
          <el-button @click="treeCancel">取消</el-button>
        </div>
  </el-dialog>
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
  	}
  },
  data () {
		return {
		  dialogVisible: false,
		}
  },
  mounted () {
  	// this.$refs.dialog.rendered = true;
  },
  methods: {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>