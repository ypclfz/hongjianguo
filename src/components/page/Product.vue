<template>
  <div class="main">
  	<div class="row">
  		<el-row :gutter="20">
		  	<el-col :span="14">
		  			<el-form label-width="80px" ref="form" :model="currentNode" :rules="rules">
		  				<el-form-item label="技术名称" prop="name">
		  					<el-input v-model="currentNode.name" :disabled="currentNode.id == ''"	></el-input>
		  				</el-form-item>
		  				<el-form-item label="技术描述" prop="description">
		  					<el-input type="textarea" v-model="currentNode.description" :disabled="currentNode.id == ''"></el-input>
		  				</el-form-item>
		  				<el-form-item>
		  					<el-button type="primary" @click="save" :disabled="currentNode.id == ''">保存</el-button>
		  				</el-form-item>
		  			</el-form>
		  		</el-col>
		  		<el-col :span="10">
		  			<el-input
		  				style="margin-bottom: 20px;"
						  placeholder="输入关键字进行查询技术分类树节点"
						  v-model="filterText">
						</el-input>
		  			<el-tree 
		  				:props="{label: 'neme', children: 'children'}" 
		  				:data="productData" 
		  				:render-content="renderContent" 
		  				node-key="id"
		  				highlight-current 
		  				@current-change="currentChange"
		  				:expand-on-click-node="false"
		  				:current-node-key="currentNode.id"
		  				:default-expanded-keys="expand"
		  				:filter-node-method="filterNode"
		  				ref="tree"
		  			>
		  			</el-tree>
		  		</el-col> 		
  	</el-row>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
	return {
	  
	}
  },
  computed () {
  	productData () {
  		if(this.$store.getters.productData) {
  			return this.$store.getters.productData;	
  		}else {
  			return [];
  		}
  		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
