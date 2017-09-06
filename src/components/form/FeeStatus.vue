<template>
  <el-select 
  	:value="value" 
  	@input="handleInput" 
  	placeholder="请选择费用状态"
  >
  	<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
  	>
  	</el-option>
  </el-select>
</template>

<script>
import FormSelect from '@/mixins/form-select'
export default {
  name: 'feeStatus',
  mixins: [ FormSelect ],
  props: {
  	'feeType': {
  		type: null,
  		defult: null,
  	},
  	'feeAnnual': {
  		type: Boolean,
  		defult: true,
  	}
  },
  computed: {
  	options () {
  		const arr = [
  			{value: 0, label: '未付款'},
  			{value: 100, label: '已付款'},
  		];
  		const arrType = [
  			{value: 1, label: '请款单'},
  			{value: 2, label: '付款单'},
  		];
  		const arrAnnual = [
  			{value: 10, label: '年费监控中'},
  			{value: 11, label: '年费评估单'},
  			{value: 12, label: '年费不再缴纳'},
  		];
      if(this.feeType == 1) {
        arr.push(arrType[0]);
      }else if(this.feeType == 0) {
        arr.push(arrType[1])
      }
  		
  		this.feeAnnual ? arr.push(...arrAnnual) : '';

  		return arr;
  	}
  },
  watch: {
  	options () {
  		this.$emit('input', '');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>