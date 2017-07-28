<template>
  <div class="main">
  	
  		 <el-row :gutter="40">
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
  		 	<el-col :span="16">
		  		<el-form label-width="100px">
		  			<el-form-item label="部门名称">
		  			{{ name ? name : '暂未选择' }}
		  			</el-form-item>
		  			<el-form-item label="部门描述">
		  			{{ description ? description : '暂无描述' }}
		  			</el-form-item>
		  			<el-form-item label="默认IPR">
		  				<el-select v-model="ipr" placeholder="请选择IPR">
		  					<el-option
									v-for="item in iprOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
		  					>
		  					</el-option>
		  				</el-select>
		  			</el-form-item>
		  			<el-form-item label="默认Reviewer">
		  				<inventor-select v-model="reviewer" default></inventor-select>
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
import InventorSelect from '@/components/form/InventorSelect'

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
  		this.ipr = a.ipr.uid;
  		this.reviewer = a.reviewer.uid;
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
  		arr.unshift({label: '未选择', value: ''});
  		return arr;
  	},
  },
  components: { InventorSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>