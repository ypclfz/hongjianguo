<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    :placeholder="config.placeholder"
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
import formSelect from '@/mixins/form-select'

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
  }],
  ['patent_type', {
    placeholder: '请选择专利类型',
    options: [
      { name: '发明专利', id: 1 },
      { name: '实用新型', id: 2 },
      { name: '外观设计', id: 3 },
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
    options: 'fileTypeOptions',
  }]
];
const map = new Map(config);

export default {
  name: 'staticSelect',
  mixins: [formSelect],
  props: ['type'],
  computed: {
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	},
    options () {
      let op = this.config.options;
      op = op instanceof Array ? op : this.$store.getters[op];
      return op;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>