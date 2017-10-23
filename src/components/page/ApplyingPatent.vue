<template>
  <div class="main">
  	<div class="table-header">
      <el-dropdown trigger="click" :hide-on-click="false" menu-align="start">
        <el-button type="primary">
          <i class="el-icon-menu el-icon--left" style="font-size: 13px;"></i>字段<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><el-checkbox label="字段一" v-model="tableControl.text1"></el-checkbox></el-dropdown-item>
          <el-dropdown-item><el-checkbox label="字段二" v-model="tableControl.text2"></el-checkbox></el-dropdown-item>
          <el-dropdown-item><el-checkbox label="字段三" v-model="tableControl.text3"></el-checkbox></el-dropdown-item>
          <el-dropdown-item><el-checkbox label="字段四" v-model="tableControl.text4"></el-checkbox></el-dropdown-item>
          <el-dropdown-item><el-checkbox label="字段五" v-model="tableControl.text5"></el-checkbox></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
	  	<el-input
	        placeholder="请输入需要搜索的字段..."
	        icon="search"
	        class="table-search"
	    ></el-input>
    </div>
    
	<el-table :data="pageData" stripe border @selection-change="handleselectionChange"  row-key="id">
		<el-table-column type="selection"></el-table-column>
      
		<el-table-column label="字段一" prop="text1" v-if="tableControl.text1"></el-table-column>
		<el-table-column label="字段二" prop="text2" v-if="tableControl.text2"></el-table-column>
    <el-table-column label="字段三" prop="text3" v-if="tableControl.text3"></el-table-column>
    <el-table-column label="字段四" prop="text4" v-if="tableControl.text4"></el-table-column>
		<el-table-column label="字段五" prop="text5" v-if="tableControl.text5"></el-table-column>
		<el-table-column label="操作" align="center">
			<template slot-scope="scope">
  	  	<el-button size="small" icon="view" @click="viewPatent(scope.row.id)">查看详情</el-button>
      </template>
		</el-table-column>
	</el-table>
	<el-pagination
        v-if="totalNumber > pageSize"
      	@current-change="handleCurrentChange"
      	:current-page="currentPage"
      	:page-size="pageSize"
      	layout="total,  prev, pager, next, jumper"
      	:total="totalNumber">
    </el-pagination>
  </div>
</template>

<script>
import tableConst from '@/const/tableConst'
const methods = Object.assign({},tableConst.methods, {
  viewPatent(id) {
    const d = this;
    d.$router.push({path: '/patent/applying/detail', query: {id}});
  }
});
const text1 = "测试",
  	  text2 = "测试",
  	  text3 = "测试",
      text4 = "测试",
      text5 = "测试";
export default {
  name: 'pendingTask',
  methods,
  created() {
    const d = this;

    d.totalNumber = d.tableData.length;
    d.pageData = d.getPageData(d.currentPage);
  }, 
  data () {
    const data = {
    	tableData: [
        	{text1,text2,text3,text4,text5,id: 1},
        	{text1,text2,text3,text4,text5,id: 2},
        	{text1,text2,text3,text4,text5,id: 3},
        	{text1,text2,text3,text4,text5,id: 4},
        	{text1,text2,text3,text4,text5,id: 5},
        	{text1,text2,text3,text4,text5,id: 6},
    		{text1,text2,text3,text4,text5,id: 7}
    	],
      tableControl: {
        'text1': true,
        'text2': true,
        'text3': true,
        'text4': true,
        'text5': true
      }
    };
    return Object.assign({}, tableConst.data, data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-dropdown-menu {
    border-radius: 5px;
  }
</style>