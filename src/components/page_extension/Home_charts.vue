<template>
	<div class="main">
    <div :id="type" style="width: 100%, height: 300px;"></div>
	</div>
</template>
<script>
import AppFilter from '@/components/common/AppFilter'
import AxiosMixins from '@/mixins/axios-mixins'
import echarts from 'echarts'


let data;
const URL = '/api/stats';
const option = {
    tooltip: {
        show: true
    },
    toolbox: {
        feature: {
            magicType: {show: true, type: [ 'bar','line']},
            restore: { show: true},
            dataView: {show: true, readOnly: false},
            
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['蒸发量','降水量','平均温度']
    },
    xAxis: 
        {

            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],

        }
    ,
    yAxis: 
        {

        }
    ,
    series: [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'bar',
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
const config = [
  ['proposal_bar', {
    title: '提案统计',
    type: 'proposal',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    group: [
      {label: '按地区分组', value: 'area', default: true },
      {label: '按类型分组', value: 'patent_type'},
    ]
  }],
  ['application_bar', {
    title: '申请统计',
    type: 'applicant',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    group: [
      {label: '按地区分组', value: 'area', default: true },
      {label: '按类型分组', value: 'patent_type'},
    ]
  }],
  ['issue_bar', {
    title: '问题统计',
    type: 'issue',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    group: [
      {label: '按地区分组', value: 'area', default: true },
      {label: '按类型分组', value: 'patent_type'},
    ]
  }],
  ['copyright_bar', {
    title: '版权统计',
    type: 'copyright',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    group: [
      {label: '按地区分组', value: 'area', default: true },
      {label: '按类型分组', value: 'patent_type'},
    ]
  }],
]
const map = new Map(config);
export default {
  name: 'home',
  mixins: [ AxiosMixins ],
  props: ['type'],
  data () {
    return {
      config: '',
      xAxis: '',
      group: '',
      option: {},
      chart: null,
    }   
  },
  computed: {
    config () {
      const config = this.map.get(this.type);
      return config ? config : this.type;
    },
    option () {

    }
  },
  methods: {
    refreshCharts () {
      console.log(data);
    }
  },
  watch: {
    xAxis () {

    },
    group () {

    }
  },
  created () {
    this.option = {

    }
  },
  mounted () {
    this.chart = echarts.init(document.getElementById(this.type));
    this.refreshCharts();
  }
  components: { AppFilter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
