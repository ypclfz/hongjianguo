<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    :placeholder="config.placeholder"
    filterable
    :size="size"
    :allow-create="config.allowCreate !== undefined ? config.allowCreate : false"
    :default-first-option="config.defaultFirstOption !== undefined ? config.defaultFirstOption : false"
    clearable
  >
  	<el-option
  		v-for="item in options"
  		:key="item.id"
  		:label="item.name"
  		:value="item.id"
  	>
  	</el-option>
  </el-select>
</template>


<script>



const config = [
  ['agency_scope', {
    placeholder: '请选择代理机构业务范围',
    options: [
      { name: '国内新申请', id: '国内新申请'},
      { name: '国外新申请', id: '国外新申请'},
      { name: '国内无效诉讼', id: '国内无效诉讼'},
      { name: '国外无效诉讼', id: '国外无效诉讼'},
      { name: '分析', id: '分析'},
    ]
  }],
  ['ipr', {
    placeholder: '请选择IPR',
    options: 'iprOptions',
    refresh: 'refreshIpr',
  }],
  ['patent_type', {
    placeholder: '请选择专利类型',
    options: [
      { name: '发明专利', id: 1 },
      { name: '实用新型', id: 2 },
      { name: '外观设计', id: 3 },
      { name: '发明+新型', id: 4 },
    ]
  }],
  ['agency_type', {
    placeholder: '请选择代理类型',
    options: [
      {id:1, name:"申请及OA阶段"},
      {id:2, name:"OA阶段"},
      {id:3, name:"复审阶段"},
      {id:4, name:"无效阶段"},
      {id:5, name:"被无效答复"},
      {id:6,name:"分析"}
    ]
  }],
  ['file_type', {
    placeholder: '请选择文件类型',
    url: '/api/fileTypes',
  }],
  ['group', {
    placeholder: '请选择用户组',
    options: 'groupOptions',
  }],
  ['mail', {
    placeholder: '请输入邮箱地址',
    url: '/api/mailAddress',
    allowCreate: true,
    defaultFirstOption: true,
  }],
  ['tag', {
    placeholder: '请输入或选择标签',
    options: 'tagOptions',
    // set: 'setTags',
    refresh: 'refreshTags',
    allowCreate: true,
    defaultFirstOption: true,
  }],
  ['area', {
    placeholder: '请选择地区',
    options: 'areaData',
  }],
  ['flow_node', {
    placeholder: '请选择流程节点',
    options: 'flowNodesData',
    // set: 'setFlowNodes',
    refresh: 'refreshFlowNodes',
  }],
  ['fee_code', {
    placeholder: '请选择费用代码',
    options: 'feeCodeOptions',
    refresh: 'refreshFeeCode',
  }],
  ['fee_target_income', {
    placeholder: '请选择收入对象',
    url: '/api/feeTargets',
    params: {
      debit: 1,
    },
  }],
  ['fee_target_expenditure', {
    placeholder: '请选择支出对象',
    url: '/api/feeTargets',
    params: {
      debit: 0,
    }
  }]
];
const map = new Map(config);
const dataMap = {
  'mail': {data: null},
  'fee_target_income': {data: null},
  'fee_target_expenditure': {data: null},
  'file_type': {data: null},
};

//-----------------------------配置数据分界线-----------------------------------------------

import formSelect from '@/mixins/form-select'
import AxiosMixins from '@/mixins/axios-mixins'

export default {
  name: 'staticSelect',
  mixins: [formSelect, AxiosMixins],
  data () {

    const o = dataMap[this.type] ? dataMap[this.type] : null;
    return {
      cacheData: o,
    }
  },
  props: ['type'],
  computed: {
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	},
    options () {
      let op = this.config.options;
      if(op === undefined) {
        op = this.cacheData.data;
        if(op === null) {
          op = [];
          if(this.config.url) {
            const url = this.config.url;
            const data = this.config.params ? this.config.params : {};
            const success = _=>{
              if(_.list[0]['label']) {
                _.list = _.list.map(_=>{return {id: _.value, name: _.label} })
              }

              this.cacheData.data = _.list;
            };

            this.cacheData.data = [];
            this.axiosGet({url,data, success});
          }
        }
      }else if( typeof op == 'string'){
        op = this.$store.getters[op];
        if(op === undefined) {
          op = [];
          if(this.config.refresh) this.$store.dispatch(this.config.refresh);
        }
      }

      return op;
    },
    map () {
      const map = new Map ();
      this.options.forEach(_=>{map.set(_.id, _)});

      return map;
    }
  },
  methods: {
    getSelected () {
      const arr = [];
      if(this.multiple) {
        this.value.forEach(_=>{
          const val = this.map.get(_)
          if(val) arr.push(val);
        })
      }else {
        const val = this.map.get(this.value);
        if(val) arr.push(val);
      }

      return arr;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>