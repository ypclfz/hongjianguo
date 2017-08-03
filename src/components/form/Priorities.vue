<template>
  <div>
  	<el-row v-for="(item, index) in value">
			<el-col :span="6">
				<area :value="item.area" @input="val=>{ handleInput(val, 'area', index) }"></area>
			<el-col>
			
			<el-col :span="8">
				<el-input :value="item.apn" @input="val=>{ handleInput(val, 'apn', index) }"></el-input>
			<el-col>

			<el-col :span="6">
				<el-date-picker
					:value="item.date"
      		@input="val=>{ handleInput(val, 'date', index) }"
      		type="date"
      		placeholder="选择日期"
      	>
    		</el-date-picker>
			<el-col>

			<el-col :span="4">
				<el-button type="text" size="mini" @click="delete(index)">删除</el-button>
			</el-col>
  	</el-row>
  	<el-button type="text" @click="add({ 'area': '', 'apn': '', 'date': '' })">添加优先权</el-button>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import Area from '@/components/form/Area'

export default {
  name: 'priorities',
  mixins: [ Multiline ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
