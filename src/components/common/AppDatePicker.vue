<template>
  <div class="app-date-picker" style="display: inline-block;">
        <el-date-picker type="date" placeholder="起始日期" :size=size :style="sizeFormate.get(size)" v-model="startTime" :picker-options="startOption"></el-date-picker>
        <span>-</span>
        <el-date-picker type="date" placeholder="结束日期" :size=size :style="sizeFormate.get(size)" v-model="endTime" :picker-options="endOption"></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'appDatePicker',
  props: ['size'],
  data () {
  	const sizeFormate = new Map();
  	const d = this;
  	sizeFormate.set('mini', 'width: 110px;');
		return {
			sizeFormate,
			startTime: '',
			endTime: '',
		  startOption: {
	      disabledDate (time) {
	        let flag;

	        if(d.endTime == "") {
	          flag = time.getTime() < Date.now();  
	        }else {
	          flag = time.getTime() < d.endTime.getTime() + 8.64e7; 
	        }
	        return !flag;
	      }
	    },
	    endOption: {
	      disabledDate (time) {
	        let flag;

	        if(d.startTime == "") {
	          flag = time.getTime() < Date.now();
	        }else {
	          flag = time.getTime() < Date.now() && time.getTime() > d.startTime.getTime() - 8.64e7;
	        }

	        return !flag;
	      }
	    },
		}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
