<template>
  <div>
  	<el-row v-for="(item, index) in value" :key="index">
			<el-col :span="7" style="padding-right: 5px;">
				<el-input :value="item.apn" @input="val=>{ handleInput(val, 'apn', index) }" placeholder="请填写APN"></el-input>
			</el-col>
			
			<el-col :span="7" style="padding: 0 5px;">
				<region :value="item.area" @input="val=>{ handleInput(val, 'area', index) }"></region>
			</el-col>
			
			<el-col :span="7" style="padding: 0 5px; ">
				<el-date-picker
					:value="item.date"
      		@input="val=>{ handleInput(val, 'date', index) }"
      		type="date"
      		placeholder="选择日期"
      		style="width: 100%"
      	>
    		</el-date-picker>
			</el-col>

			<el-col :span="3" style="padding-left: 5px; ">
				<el-button type="text" size="mini" @click="dataDelete(index)">删除</el-button>
			</el-col>
  	</el-row>
  	<el-row>
  		<el-button type="text" @click="add({ 'area': '', 'apn': '', 'date': '' })">添加优先权</el-button>
  	</el-row>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import Region from '@/components/form/Region'

export default {
  name: 'priorities',
  mixins: [ Multiline ],
  components: { Region },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
