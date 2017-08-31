<template>
  <div class="sad-statistics">
  	<el-card>
			<el-form>
				<el-form-item></el-form-item>
				<el-form-item></el-form-item>
			</el-form>
  	</el-card>
  	<el-card style="margin-top: 20px;">
			<div id="main" style="width: 100%; height: 300px;" ></div>
  	</el-card>
  	<el-card style="margin-top: 20px;">
  	</el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

const option = {
  title: { text: '国内案件评分统计' },
  tooltip: { show: true },
  legend: { data: ['代理所', '平均'] },
  xAxis: { data: [] },
  series: [ 
  	{ name: '代理所', type: 'bar', data: [] }, 
  	{ name: '平均', type: 'bar', data: [] }, 
  ]
};

const option2 = {
  title: { text: '国外案件评分统计' },
  tooltip: { show: true },
  legend: { data: ['代理所', '平均'] },
  xAxis: { data: [] },
  series: [ 
  	{ name: '代理所', type: 'bar', data: [] }, 
  	{ name: '平均', type: 'bar', data: [] }, 
  ]
};

export default {
  name: 'settingAgencyDetailStatistics',
  props: [ 'data' ],
  data () {
  	return {
  		myChart: null,
  		myChart2: null,
  	} 
  },
  mounted () {
  	this.myChart = echarts.init(document.getElementById('main'));
  	this.myChart2 = echarts.init(document.getElementById('main2'));
  	option['series'][0]['data'] = this.data.a;
  	option['series'][1]['data'] = this.data.b;
  	option2['series'][0]['data'] = this.data.c;
  	option2['series'][1]['data'] = this.data.d;
  	this.myChart.setOption(option);
  	this.myChart2.setOption(option2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
