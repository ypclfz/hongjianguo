<template>
  <div class="main">
  	
  		 <el-row>
				<el-col :span="8">
					<el-tree
						:data="branchData"
						:props="props"
						default-expand-all
						highlight-current
						:expand-on-click-node="false"
						@node-click="nodeClick"
					>
					</el-tree>
				</el-col>
  		 	<el-col :span="16" style="padding-left: 20px;">
		  		<el-form label-width="100px">
		  			<el-form-item label="部门名称">
		  			{{ name ? name : '暂未选择' }}
		  			</el-form-item>
		  			<el-form-item label="部门描述">
		  			{{ description ? description : '暂无描述' }}
		  			</el-form-item>
		  			<el-form-item label="默认IPR">
		  				<static-select type="ipr" v-model="ipr"></static-select>
		  			</el-form-item>
		  			<el-form-item label="部门提案审核人">
		  				<remote-select type="inventor" v-model="reviewer" default></remote-select>
		  			</el-form-item>
		  			<el-form-item label="">
		  				<el-button type="primary" @click="save">保存设置</el-button>
		  			</el-form-item>
		  		</el-form>
		  		
	  		</el-col>
  		</el-row> 	
  </div>
</template>

<script>
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'

const url = '/api/branches';
export default {
  name: 'branch',
  data () {
		return {
			id: '',
			name: '',
			description: '',
		  ipr: '',
		  reviewer: '',
		  props: {
		  	label: 'name',
		  	children: 'children'
		  }
		}
  },
  methods: {
  	save () {
  		const id = this.id;

  		if( !id ) {
  			this.$alert('请选择需要设置的部门！', {type: 'warn', closeOnClickModal: true});
  			return false;
  		}

  		const setting = (url, params, func)=>{
  			if(params) {
  				this.$axios.put(url, params).then(func);
  			}else {
  				this.$axios.delete(url).then(func);
  			}
  		}
  		// const old = branchMap.get(id);
  		// const old_ipr = old.ipr.uid;
  		// const old_reviewer = old.reviewer.uid;
  		const ipr = this.ipr ? { ipr: this.ipr } : '';
  		const reviewer = this.reviewer ? { reviewer: this.reviewer } : '';

  		setting(`${url}/${id}/ipr`, ipr, setting(`${url}/${id}/reviewer`, reviewer, ()=>{
  			this.$alert('设置成功！', {type: 'success', closeOnClickModal: true});
  			this.$store.dispatch('refreshBranch');
  		}));

  		
  	},
  	nodeClick (a) {
  		this.id = a.id;
  		this.name = a.name;
  		this.description = a.description;
  		this.ipr = a.ipr.id;
  		this.reviewer = a.reviewer;
  	}
  },
  computed: {
  	branchData () {
  		return this.$store.getters.branchData;
  	},
  	branchMap () {

  	},
  	iprOptions () {
  		const arr = [...this.$store.getters.iprOptions];
  		arr.unshift({name: '未选择', id: ''});
  		return arr;
  	},
  },
  components: { RemoteSelect, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>