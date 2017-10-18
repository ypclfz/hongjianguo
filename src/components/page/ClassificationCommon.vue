<template>
  <div class="main">
	  <el-tree 
	  	:data="options"
	  	:props="props"
	  	node-key="id"
	  	highlight-current
	  	:expand-on-click-node="false"
	  	:render-content="renderContent"
	  	:current-node-key="currentNodeKey"
	  	default-expand-all
	  	@current-change="handleCurrentChange"
      :style="`height: ${innerHeight - 400}px; overflow: auto; font-size: 14px;`"

	  >
	  </el-tree>
	  <app-collapse :col-title="colTitle" v-if="currentNodeKey != ''" style="margin-top: 15px; margin-bottom: 0px;">
		  <el-form ref="form" >
		  	<el-form-item label="名称" prop="name">
		  		<el-input v-model="form.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="描述" prop="description">
		  		<el-input type="textarea" v-model="form.description"></el-input>
		  	</el-form-item>
		  	<el-form-item style="margin-bottom: 0;">
		  		<el-button type="primary" @click="edit">保存</el-button>
		  	</el-form-item>
		  </el-form>
	  </app-collapse>
	  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
			<el-form ref="pop_form" prop="name" label-width="50px">
		  	<el-form-item label="名称" prop="name">
		  		<el-input v-model="pop_form.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="描述" prop="description">
		  		<el-input type="textarea" v-model="pop_form.description"></el-input>
		  	</el-form-item>
		  	<el-form-item style="margin-bottom: 0;">
		  		<el-button type="primary" @click="add">确认</el-button>
		  		<el-button @click="dialogVisible = false">取消</el-button>
		  	</el-form-item>
	  	</el-form>
	  </el-dialog>
	</div>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import AxiosMixins from '@/mixins/axios-mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'classificationCommon',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  'currentNodeKey': '',
		  'props': {
		  	label: 'name',
		  	children: 'children',
		  },
		  'form': {
		  	name: '',
		  	description: '',
		  },
		  'pop_form': {
		  	name: '',
		  	description: '',
		  },
		  'dialogVisible': false,
		  'add_id': ''
		}
  },
  methods: {
  	renderContent (h, {node, data}) {
      console.log(data);
  		return (
          <span>
            <span>
            
              <span>{node.label}</span>
              <em style="color: #20a0ff; font-style: normal;"> ({ data.projects_count })</em>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.addPop(data.id) }>新建</el-button>
              <el-button size="mini" on-click={ () => this.treeDelete(data.id) }>删除</el-button>
            </span>
          </span>);
      
  	},
  	handleCurrentChange(data) {
  		this.setCurrentNode(data.id);
  	},
  	setCurrentNode(id) {
  		this.currentNodeKey = id;
  		const f = this.optionMap.get(id);
  		if(f) {
  			this.$tool.coverObj(this.form, f);	
  		}
  	},
  	addPop (id) {
  		this.add_id = id;
  		this.dialogVisible = true;
  		if( this.$refs.pop_form ) this.$refs.pop_form.resetFields();
  	},
  	add () {
  		const url = this.url;
  		const data = Object.assign({}, this.pop_form, {parent: this.add_id});
  		const success = _=>{
  			this.$message({message: '新建成功', type: 'success'});
        this.dialogVisible = false;
  			this.refresh();
  		}

  		this.axiosPost({url, data, success});
  	},
  	edit () {
  		const url = `${this.url}/${this.currentNodeKey}`;
  		const data = this.form;
  		const success = _=>{
  			this.$message({message: '保存成功', type: 'success'});
        this.dialogVisible = false;
  			this.refresh();
  		}

  		this.axiosPut({url, data, success});
  	},
  	treeDelete (id) {
  		const d = this.optionMap.get(id);
  		this.$confirm(`删除后不可恢复，确认删除${d.name}？`, {type: 'warning'})
  			.then(_=>{
  				const url = `${this.url}/${id}`;
		  		const success = _=>{
		  			this.$message({message: '删除成功', type: 'success'});
		  			this.refresh();
		  			this.setCurrentNode('');
		  		}

		  		this.axiosDelete({url, success});
  			})
  			.catch(_=>{});
  		
  	},
  	refresh () {
  		if(this.pageType == 'classification') {
  			this.$store.dispatch('refreshClassification');
  		}else {
  			this.$store.dispatch('refreshProduct');
  		}
  	}
  },
  computed: {
    ...mapGetters([
      'innerHeight',
    ]),
  	pageType () {
  		const path = this.$route.path;
  		return /classification/.test(path) ? 'classification' : 'product';
  	},
  	options () {
  		const t = this.pageType;
  		return this.$store.getters[`${t}Data`];
  	},
  	optionMap () {
  		const t = this.pageType;
  		return this.$store.getters[`${t}Map`];
  	},
  	url () {
  		const t = this.pageType;
  		return t == 'classification' ? '/api/classifications' : '/api/products';
  	},
  	dialogTitle () {
  		const t = this.pageType;
  		return t == 'classification' ? '新增技术分类' : '新增产品';
  	},
  	colTitle () {
  		const t = this.pageType;
  		return t == 'classification' ? '技术详情' : '产品详情';
  	}
  },
  components: { AppCollapse },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>