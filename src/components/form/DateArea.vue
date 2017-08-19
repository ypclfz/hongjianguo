<template>
  <div class="app-date-picker" style="display: inline-block; width: 100%;">
        <el-date-picker type="date" placeholder="起始日期" :size=size :style="sizeFormate.get(size)" :value="date[0]" @input="_=>{ update(_,'start') }" :picker-options="startOption"></el-date-picker>
        <span>-</span>
        <el-date-picker type="date" placeholder="结束日期" :size=size :style="sizeFormate.get(size)" :value="date[1]"  @input="_=>{ update(_, 'end') }" :picker-options="endOption"></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'dateArea',
  props: {
  	'value': {
  		type: Array,
  		default () {
  			return ['', ''];
  		}
  	},
  	'size': String
  },
  methods: {
    update( val, key ) {
      const arr = [];
      if(key == 'start') this.startTime = val;
      if(key == 'end') this.endTime = val;
      arr[0] = key == 'start' ? this.$tool.getDate(val) : this.date[0];
      arr[1] = key == 'end' ? this.$tool.getDate(val) : this.date[1];

      this.$emit('input', arr);
    },
  },
  computed: {
  	date () {
  		const v = this.value;
  		const arr = [];
  		arr[0] = v[0] === undefined ? '' : v[0];
  		arr[1] = v[1] === undefined ? '' : v[1];

  		return arr;
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
	        let flag = true;

	        // if(d.endTime == "") {
	        //   flag = time.getTime() < Date.now();  
	        // }else {
          if(d.endTime != "") { 
	          flag = time.getTime() < d.endTime.getTime() + 8.64e7;
          } 
	        // }
	        return !flag;
	      }
	    },
	    endOption: {
	      disabledDate (time) {
	        let flag = true;

          if(d.startTime != "") { 
	          flag = time.getTime() > d.startTime.getTime() - 8.64e7;
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
