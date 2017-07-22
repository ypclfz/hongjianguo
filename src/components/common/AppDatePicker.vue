<template>
  <div class="app-date-picker" style="display: inline-block;">
        <el-date-picker type="date" placeholder="起始日期" :size=size :style="sizeFormate.get(size)" :value="date[0]" @input="startUpdate" :picker-options="startOption"></el-date-picker>
        <span>-</span>
        <el-date-picker type="date" placeholder="结束日期" :size=size :style="sizeFormate.get(size)" :value="date[1]"  @input="endUpdate" :picker-options="endOption"></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'appDatePicker',
  props: ['size', 'value'],
  methods: {
		startUpdate (val) {
			this.startTime = val;
			const s = this.startTime ? this.startTime.getTime() : '';
			const e = this.endTime ? this.endTime.getTime() : ''; 
			const arr = [s, e];
			console.log('startUpdate');
			this.$emit("input", arr);
    },
    endUpdate (val) {
    	this.endTime = val;
			const s = this.startTime ? this.startTime.getTime() : '';
			const e = this.endTime ? this.endTime.getTime() : '';
    	const arr = [s, e];
    	console.log('endUpdate');
    	this.$emit("input", arr);
    }
  },
  computed: {
  	date () {
  		const v = this.value;
  		return !v || v[0] == undefined || v[1] == undefined 
  					 	? ['', '']
  						: [...v];
  	}
  },
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
