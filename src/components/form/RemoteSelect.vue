<template>
	<el-select
	  :value="value2"
	  @input="handleInput"
	  filterable
	  remote
	  :placeholder="PLACEHOLDER"
	  :disabled="disabled"
	  :remote-method="remoteMethod"
	  :loading="loading"
	  :multiple="!single"
	  :multiple-limit="multiple ? 0 : 1"
	  ref="select"
	  @visible-change.once="initialization"
	>
		<el-option
			v-for="item in option_in"
			:key="item.id"
			:label="item.name"
			:value="item.id"
		>
		</el-option>
	</el-select>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/mixins/remote-select'

const map = new Map([
	['member', {
		URL: '/api/members',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入用户关键词',
	}],
	['applicant', {
		URL: '/api/applicants',
		DATA_KEY: 'applicants',
		PLACEHOLDER: '请输入申请人关键词',
	}],
	['inventor', {
		URL: '/api/inventors',
		DATA_KEY: 'data',
		PLACEHOLDER: '请输入发明人关键词',
	}],
	['agent', {
		URL: '/api/agents',
		DATA_KEY: 'members',
		PLACEHOLDER: '请输入代理人关键词',
	}],
	['agency', {
		URL: '/api/agencies',
		DATA_KEY: 'agencies',
		PLACEHOLDER: '请输入代理机构关键词',
	}],
	['project', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入案件关键词',
	}],
	['proposal', {
		URL: '/api/proposals',
		DATA_KEY: 'proposals',
		PLACEHOLDER: '请输入提案关键词',
	}],
	['patent', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入专利关键词',
		PARAMS: { category: 1 },
	}],
	['copyright', {
		URL: '/api/projects',
		DATA_KEY: 'projects',
		PLACEHOLDER: '请输入版权关键词',
		PARAMS: { category: 3 },
	}],
  ['bill', {
    URL: '/api/invoices',
    DATA_KEY: 'invoices',
    PLACEHOLDER: '请输入请款单关键词',
    PARAMS: { debit: 1 },
  }],
  ['pay', {
    URL: '/api/invoices',
    DATA_KEY: 'invoices',
    PLACEHOLDER: '请输入付款单关键词',
    PARAMS: { debit: 0 },
  }]
]);

export default {
  name: 'remoteSelect',
  mixins: [ AxiosMixins, RemoteSelect ],
  props: {
  	'type': [String, Object],
    'para': {
      type: Object,
      default () {return {}},
    },
    'single': {
      type: Boolean,
      default: false,
    },
    'staticMap': {
      type: Array,
      default () { return [] },
    }
  },
  data () {
  	return { 
  		selected: [],
  		static_map: [],
  	};
  },
  methods: {
  	initialization () {
      this.remoteMethod('');       
  	},	
  	getSelected () {
  		return this.selected;
  	},
    refreshSelected (val) {
      val = this.single ? [val] : val;

      if(this.staticMap.length > 0) {
        this.static_map = this.staticMap;
      }

      if( val[0] && val[0] instanceof Object ) {
        
        this.static_map = val;
        const arr = val.map(_=>_.id);
        if(this.multiple) {
          this.$emit('input', arr);
        }else {
          this.$emit('input', arr[0])
        }

      }else {
        //selected通过map映射
        const arr = [];
        val.forEach(_=>{
          const v = this.map.get(_);
          if(v) {
            arr.push(v);
          }
        });

        this.selected = arr;
      }
    },
    remoteMethod (keyword) {
     
      const s = { keyword, listOnly: '1' };
      const os = this.PARAMS;
      const key = this.DATA_KEY;
      const url = this.URL;
      const data = os ? Object.assign({}, s, os) : s;
      const success = _=>{
        this.loading = false;
        _[key] = _[key].map(_=>{
          if(!_.name) _.name = _.label;
          if(!_.id) _.id = _.value;
          return _;
        });
        this.options = _[key];
      }

      this.loading = true;
      this.axiosGet({url, data, success});
    },
    clear (flag = true) {
      this.selected = [];
      this.static_map = [];
      this.multiple ? this.$emit('input', []) : this.$emit('input', '');
      if(flag) {
        this.remoteMethod(''); 
        
      }
    }
  },
  computed: {
  	choose () {
  		if(typeof this.type == 'string') {
  			return map.get(this.type);	
  		}else {
  			return this.type;
  		}		
  	},
  	URL () {
  		return this.choose.URL;
  	},
  	DATA_KEY () {
  		return this.choose.DATA_KEY;
  	},
  	PLACEHOLDER () {
  		return this.choose.PLACEHOLDER;
  	},
  	PARAMS () {
      let obj = {};

      if(this.para) {
        Object.assign(obj, this.para);
      }
      if(this.choose.PARAMS) {
        Object.assign(obj, this.choose.PARAMS);
      }

  		return obj;
  	},
  	option_in () {
  		//由于一部分的val可能是通过object传入,单纯的options只含有动态部分
  		//所以取selected和options的并集,取得selected的静态部分选项
  		const arr = [ ...this.selected, ...this.options ];
      // console.log(this.selected, this.options, arr);
  		// console.log(arr);
  		return this.$tool.singleObject(arr,'id');
  	},
  	map () {
  		//map分为静态和动态俩部分，静态部分由value类型为Object时提供，之后将value转换为数值类型
  		const map = new Map();
  		this.static_map.forEach(_=>map.set(_.id, _));
  		this.options.forEach(_=>map.set(_.id, _));
  		return map;
  	}
  },
  watch: {
  	value2 (val) {
      // console.log('-------------val');
      // console.log(val);
      // console.log('-------------val');
      //value类型为对象时，添加静态映射，并将其值转为id
      this.refreshSelected(val);
  	}
  },
  created () {
    this.refreshSelected(this.value2);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>