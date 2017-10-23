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
    ref="select"
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
    handle (data) {
      return data.list.map(_=>{return {id: _.value, name: _.label}});
    },
    allowCreate: true,
    defaultFirstOption: true,
  }],
  ['tag', {
    placeholder: '请输入或选择标签',
    url: '/api/tags',
    handle (data) {
      return data.tags.map(_=>{return {id: _.tag, name: _.tag}});
    },
    allowCreate: true,
    defaultFirstOption: true,
  }],
  ['area', {
    placeholder: '请选择地区',
    options: 'areaData',
  }],
  ['flow_node', {
    placeholder: '请选择流程节点',
    url: '/api/flownodes',
    handle: _=>_.flownodes,
    // set: 'setFlowNodes',
    // refresh: 'refreshFlowNodes',
  }],
  ['fee_code', {
    placeholder: '请选择费用代码',
    url: '/api/feeCodes',
    handle (data) {
      return data.codes;
    }
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
  }],
  ['progress', {
    placeholder: '请选择当前进度',
    url: '/api/progress',
  }],
  ['branch', {
    placeholder: '请选择部门',
    options: 'branchOptions',
  }]
];

const map = new Map(config);
const dataMap = new Map([
  ['mail', {data: null}],
  ['fee_target_income', {data: null}],
  ['fee_target_expenditure', {data: null}],
  ['file_type', {data: null}],
  ['fee_code', {data: null}],
  ['tag', {data: null}],
  ['flow_node', {data: null}],
  ['progress',{data: null}]
]);

//-----------------------------配置数据分界线-----------------------------------------------

import AxiosMixins from '@/mixins/axios-mixins'

export default {
  name: 'staticSelect',
  mixins: [ AxiosMixins ],
  props: {
    'value': null,
    'multiple': {
      type: Boolean,
      default: false,
    },
    'disabled': {
      type: Boolean,
      default: false,
    },
    'size': {
      type: String,
    },
    'type': null,
  },
  data () {

    let o = dataMap.get(this.type);
    o = o ? o : null;
    
    return {
      cacheData: o,
      options: [],
    }
  },
  computed: {
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	},
    map () {
      const map = new Map ();
      this.options.forEach(_=>{map.set(_.id, _)});

      return map;
    },
    options_vuex () {
      let op = null;
      if( typeof this.config.options === 'string') {
        op = this.$store.getters[this.config.options];
      }

      return op;
    }
  },
  watch: {
    options_vuex (val) {
      this.options = val;
    },
    value (val) {
      this.$refs.select.visible = false;
    }
  },
  methods: {
    handleInput (val) {
      this.$emit('input', val);
    },
    getSelected () {
      const arr = [];
    
      let cv = this.multiple ? this.value : [ this.value ];
      
      cv.forEach(_=>{
        const val = this.map.get(_);
        if(val) {
          arr.push(val);
        }else {
          arr.push({id: _, name: _});
        }
      })

      return arr;
    },
    setOptions () {
      let op = this.config.options;
      

      if(op instanceof Array) {
        
        //存储在配置项的下拉框数据直接使用
        this.options = op;

      }else if(typeof op === 'string') {
        op = this.options_vuex;
        //存储在vuex中的数据,op代表getters的名字,
        //当数据不止在Select而是在全局中有多处被使用,或者数据在使用过程中需要保持动态更新,使用vuex存储
        if(op === undefined) {
          if(this.config.refresh) {
            this.$store.dispatch(this.config.refresh);  
          }
        }else {
          this.options = op;
        }

      }else if(op === undefined && this.cacheData) {
        
        //初始化缓存数据,这里利用了对象的索引特性,所以在回掉函数改变cacheData之后,同类型组件的options都会改变
        //但是这会导致同一类型的组件的options实际上共用一个数组
        //如果需要每个组件的options数组私有,可使用拷贝函数与watch
        if(this.cacheData.data == null) {
          this.cacheData.data = [];
          if(this.config.url) {
            const url = this.config.url;
            const data = this.config.params ? this.config.params : {};
            const success = _=>{
              const handle = this.config.handle;
              const r = handle ? handle(_) : _.list;

              this.cacheData.data.push(...r);
            }

            this.axiosGet({url, data, success});
          }
        }
        this.options = this.cacheData.data;
      }

    }
  },
  created () {
    this.setOptions();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>