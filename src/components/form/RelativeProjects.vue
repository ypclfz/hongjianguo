<template>
  <div>
  	<el-row v-for="(item,index) in value" :key="index" style="margin-bottom: 5px">
  		<el-col :span="6" style="padding-right: 5px">
  			<el-select placeholder="案件类型" :value="item.type" @input="val=>{ handleInput(val, 'type', index) }">
			    <el-option 
			    	v-for="item in options"
			    	:key="item.value"
			    	:label="item.label"
			    	:value="item.value"
			    ></el-option>
			  </el-select>
  		</el-col>
  		<el-col :span="16" style="padding: 0 5px">
  			<remote-select type="patent" :value="item.id" @input="val=>{ handleInput(val, 'id', index) }"></remote-select>
  		</el-col>
  		<el-col :span="2" style="padding-left: 5px">
  			<el-button type="text" size="mini" @click="dataDelete(index)">删除</el-button>
  		</el-col>
		</el-row>
		<el-button type="text" @click="add({'id': '', 'type': ''})">添加相关案件</el-button>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import RemoteSelect from '@/components/form/RemoteSelect'

export default {
  name: 'relativeProjects',
  mixins: [ Multiline ],
	data () {
		return {
			options: [
				{ label: '要求优先权', value: 1 },
				{ label: '分案申请', value: 2 },
				{ label: '部分连续案', value: 3 },
				{ label: '同套发明与新型', value: 4 },
				{ label: '不同地区同族', value: 5 },
				{ label: '要求同日送件', value: 6 },
			]
		}
	},
	watch: {
		value (val) {
			if(val[0] && val[0]['name']) {
				let arr;
				arr = val.map(_=>{ return {id: { id: _.id, name: _.name }, type: _.type} });
				this.$nextTick(_=>{ this.$emit('input', arr); });				
			}
		}
	},
	components: { RemoteSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
