<template>
  <div class="main">
  	
  		 <el-row>
				<el-col :span="8">

          <div class="left-tree-header" style="padding: 0 20px; ">
            <span style="font-size: 15px; font-weight: bold;">部门</span>
            <div style="float: right;">
              <el-button icon="plus" size="mini" title="添加部门" @click="addPop"></el-button>
              <el-button icon="edit" size="mini" title="编辑部门" style="margin-left: 0;" @click="editPop"></el-button>
              <el-button icon="delete" size="mini" title="删除部门" style="margin-left: 0;" @click="branchDelete"></el-button>
            </div>
          </div>

					<el-tree
						:data="branchData"
						:props="props"
						default-expand-all
						highlight-current
						:expand-on-click-node="false"
						@node-click="nodeClick"
            :style="`height: ${innerHeight - 100}px; overflow: auto;`"
					>
					</el-tree>
				</el-col>
  		 	<el-col :span="16" style="padding-left: 20px;">
		  		<el-form label-width="120px">
		  			
            <el-form-item label="部门名称">
		  			  {{ currentNode ? currentNode.name : '' }}
		  			</el-form-item>
		  			
            <el-form-item label="部门描述">
		  			  {{ currentNode ? currentNode.description ? currentNode.description : '暂无描述' : ''}}
		  			</el-form-item>
		  			
            <el-form-item label="默认IPR">
		  				<template v-if="currentNode">
                <el-tooltip v-if="currentNode.ipr">
                  <div slot="content">{{ currentNode.ipr.name }}<br/>{{ currentNode.ipr.mobile }}<br/>{{ currentNode.ipr.email }}</div>
                  <el-tag>{{ currentNode.ipr.name }}</el-tag>
                </el-tooltip>
                <span v-else>暂未设置默认IPR</span>
              </template>
		  			</el-form-item>

		  			<el-form-item label="拥有查看权限">
		  				<template v-if="currentNode">
                <template v-if="currentNode.board">
                  <el-tooltip v-for="item in currentNode.board" :key="item.id">
                    <div slot="content">{{ item.name }}<br/>{{ item.mobile }}<br/>{{ item.email }}</div>
                    <el-tag style="margin-right: 5px">{{ currentNode.ipr.name }}</el-tag>
                  </el-tooltip>
                </template>
                <span v-else>无人拥有查看权限</span>
              </template>
		  			</el-form-item>
		  		
          </el-form>	  		
	  		</el-col>
  		</el-row>

      <pop ref="pop" @refresh="refresh" :current-id="currentNode.id"></pop> 	
  </div>
</template>

<script>
import Pop from '@/components/page_extension/Branch_pop' 
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

const url = '/api/branches';
export default {
  name: 'branch',
  data () {
		return {
		  props: {
		  	label: 'name',
		  	children: 'children'
		  },
      currentNode: '',
		}
  },
  computed: {
    ...mapGetters([
      'innerHeight',
      'branchData',
    ]),
  },
  methods: {
    ...mapActions([
      'refreshBranch',
    ]),
  	nodeClick (a) {
      this.currentNode = a;
  	},
    addPop () {
      if(!this.currentNode) {
        this.$message({message: '请选择添加部门的挂载项', type: 'warning'});
        return;
      }

      this.$refs.pop.show('add');
    },
    editPop () {
      if(!this.currentNode) {
        this.$message({message: '请选择需要编辑的部门', type: 'warning'});
        return;
      }

      const d = this.$tool.deepCopy(this.currentNode);
      d.ipr = d.ipr ? d.ipr.id : '';
      this.$refs.pop.show('edit', d);
    },
    branchDelete () {
      const c = this.currentNode;

      if(!c) {
        this.$message({message: '请选择需要删除的部门', type: 'warning'});
        return;
      }

      if(c.id == 1) {
        this.$message({message: '根节点不可删除', type: 'warning'});
        return;
      }

      this.$confirm(`删除后不可恢复，确认删除‘${c.name}’？`, '提示', {type: 'warning'})
        .then(_=>{
          const url = `${url}/${this.currentNode.id}`;
          const success = _=>{
            this.$message({message: ``})
          }
          this.$axiosDelet({
            url, 
            success,
          })
        })
        .catch(_=>{});      
    },
    refresh () {
      this.refreshBranch();
    }
  },

  components: { 
    RemoteSelect, 
    StaticSelect,
    Pop, 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>