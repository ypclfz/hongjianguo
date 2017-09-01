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
      <div id="main2" style="width: 100%; height: 300px;" ></div>
  	</el-card>
    <el-card style="margin-top: 20px;">
      <div id="main3" style="width: 100%; height: 300px;" ></div>
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
  yAxis: {},
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
  yAxis: {},
  series: [ 
  	{ name: '代理所', type: 'bar', data: [] }, 
  	{ name: '平均', type: 'bar', data: [] }, 
  ]
};

const option3 = {
  title : {
        text: '未完成案件分布',
        // subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [],
    },
    series : [
        {
            name: '未完成案件数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

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
    this.myChart3 = echarts.init(document.getElementById('main3'));
  	
    option['xAxis']['data'] = option2['xAxis']['data'] = this.data.labels;
    option['series'][0]['data'] = this.data.ranking_cn;
  	option['series'][1]['data'] = this.data.ranking_cn_average;
  	option2['series'][0]['data'] = this.data.ranking_foreign;
  	option2['series'][1]['data'] = this.data.ranking_foreign_average;    
    const p = this.data.pending;
    option3.legend.data = Object.keys(p);
    option3.series[0].data = Object.entries(p).map(_=>{ return { name: _[0], value: _[1]} });

  	this.myChart.setOption(option);
  	this.myChart2.setOption(option2);
    this.myChart3.setOption(option3);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
