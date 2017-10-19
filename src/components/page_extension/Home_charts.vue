<template>

  <el-card v-loading="loading" element-loading-text="加载图表数据中...">
    <div slot="header">
      <el-radio-group v-model="group" size="small" v-if="!!config.group">
        <el-radio-button  v-for="item in config.group" :label="item.value" :key="item.value">{{ item.label }}</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="xAxis" size="small" v-if="!!config.xAxis">
        <el-radio-button size="small" v-for="item in config.xAxis" :label="item.value" :key="item.value">{{ item.label }}</el-radio-button>
      </el-radio-group>
      <static-select v-if="!!config.target" :type="config.target" v-model="target" size="small" style="width: 150px;"></static-select>
      <el-date-picker
        v-model="date"
        type="daterange"
        placeholder="选择日期范围"
        size="small"
      >
      </el-date-picker>
    </div>
    <div :id="type" style="width: 100%; height: 300px;"></div>
  </el-card>
  
</template>
<script>
import AppFilter from '@/components/common/AppFilter'
import AxiosMixins from '@/mixins/axios-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import echarts from 'echarts'


let data;
const URL = '/api/stats';
const barOption = {
  title: { text: '' },
  tooltip: { show: true },
  toolbox: {
    feature: {
      magicType: {show: true, type: [ 'bar','line']},
      restore: { show: true},
      dataView: {show: true, readOnly: false},
      saveAsImage: {show: true}
    }
  },
  legend: { data:[] },
  dataZoom: [ { type: 'inside' } ],
  xAxis: { data: [] },
  yAxis: {},
  series: [],
};
const pieOption = {
    title : {
      text: '',
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
        name: '',
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

};
const config_map = [
  ['task_bar', {
    title: '任务统计',
    type: 'task',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
  }],
  ['agency_bar', {
    title: '代理所统计',
    type: 'agency',
    chart: 'bar',
    type: 'agency',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
  }],
  ['income_bar', {
    title: '收入统计',
    type: 'income',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    target: 'fee_target_income',
  }],
  ['expenditure_bar', {
    title: '支出统计',
    type: 'expenditure',
    chart: 'bar',
    xAxis: [
      {label:'年', value: 'year', default: true },
      {label:'月', value: 'month' },
      {label:'日', value: 'day' },
      {label:'周', value: 'week' },
    ],
    target: 'fee_target_expenditure',
  }],
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
    type: 'application',
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
    title: '授权统计',
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
  ['application_pie', {
    title: '申请统计',
    type: 'application',
    chart: 'pie',
    group: [
      { label: '按地区统计', value: 'area', default: true },
      { label: '按类型统计', value: 'patent_type'},
    ]
  }],
]
const map = new Map(config_map);

//---------------------------配置数据分界线---------------------------------------

export default {
  name: 'homeCharts',
  mixins: [ AxiosMixins ],
  props: ['type'],
  data () {
    let config = map.get(this.type);
    config = config ? config : this.type;
    const xAxis = getDefault('xAxis');
    const group = getDefault('group');
    return {
      xAxis,
      group,
      target: '',
      config,
      option: '',
      chart: null,
      loading: true,
      date: [],
    }

    function getDefault(key) {
      let str = "";
      if(config[key] && config[key][0]) {
        str = config[key][0]['value'];
        config[key].forEach(_=>{  
          if(_.default) {
            str = _['value'];
          }
        })
      }

      return str;
    }   
  },
  methods: {
    refreshCharts () {
      const url = URL;
      const data = {
        'type': this.config.type,
        'chart': this.config.chart,
        'xAxis': this.xAxis,
        'group': this.group,
        'target': this.target,
      };
      if(this.xAxis) {
        data.xAxis = this.xAxis;
      }
      if(this.group) {
        data.group = this.group;
      }
      if(this.date[0] && this.date[1]) {
        data.date = this.date.map(_=>this.$tool.getDate(_)).join(",");
      }
      const success = _=>{
        this.loading = false;
        this.setChart(_.data);
      }

      this.axiosGet({url, data, success});
    },
    setChart (data) {
      if(this.config.chart == 'bar') {
        this.option.legend.data = data.legend;
        this.option.xAxis.data = data.xAxis;
        this.option.series = getBarSeries();
      }else if(this.config.chart == 'pie') {
        this.option.legend.data = data.legend;
        this.option.series[0].data = data.data;
      }

      this.chart.setOption(this.option, true);

      function getBarSeries () {
        const arr = [];
        data.legend.forEach((d,i)=>{ 
          arr.push({
            name: d,
            type: 'bar',
            barMaxWidth: 50,
            barMinHeight: 10,
            data: data.data[i],
          });
        })
        return arr;
      }
    }
  },
  watch: {
    xAxis () {
      this.refreshCharts();
    },
    group () {
      this.refreshCharts();
    },
    date () {
      this.refreshCharts();
    },
    target () {
      this.refreshCharts();
    }
  },
  created () {
    const c = this.config;
    if(c.chart == 'bar') {
      this.option = this.$tool.deepCopy(barOption);
    }else if(c.chart == 'pie') {
      this.option = this.$tool.deepCopy(pieOption);
      this.option.series[0].name = this.config.title;
    }
    this.option.title.text = this.config.title;
  },
  mounted () {
    this.chart = echarts.init(document.getElementById(this.type));
    this.refreshCharts();
  },
  components: { AppFilter, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
