<template>
  <div>
  	<el-row v-for="(item,index) in value" :key="index">
  	<el-col :span="20">
			<el-input placeholder="请输入内容" :value="item.id" @input="val=>{ handleInput(val, 'id', index) }">
			  <el-select slot="prepend" placeholder="请选择案件类型" :value="item.type" @input="val=>{ handleInput(val, 'type', index) }">
			    <el-option 
			    	v-for="item in option"
			    	:key="item.value"
			    	:label="item.label"
			    	:value="item.value"
			    ></el-option>
			  </el-select>
			</el-input>
  	</el-col>
  	<el-col :span="4">
			<el-button type="text" size="mini" @click="dataDelete(index)"></el-button>
  	</el-col>
		</el-row>
		<el-button type="text" @click="add({'id': '', 'type': ''})"></el-button>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline' 

export default {
  name: 'relativeProjects',
  mixins: [ Multiline ],
	data () {
		return {
			option: [
				{ label: '要求优先权', value: 1 },
				{ label: '分案申请', value: 2 },
				{ label: '部分连续案', value: 3 },
				{ label: '要求同日送件', value: 6 },
			]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
