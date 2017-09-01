<template>
	<el-select
		:value="value2"
		placeholder="请输入邮箱地址"
    @input="handleInput"
		multiple
    :multiple-limit="multiple ? 0 : 1"
   	filterable
   	allow-create
   	value-key="id"
   	default-first-option
	>
		<el-option v-for="item in option_in" :key="item.value" :label="item.label" :value="item.value"></el-option>
	</el-select>
</template>

<script>


export default {
  name: 'mail',
  props: {
    'value': null,
    'multiple': {
      type: Boolean,
      default: false,
    }
  },
  data () {
		return {
			options: [],
		}
  },
  computed: {
  	value2 () {
      let val;
      if(this.multiple) {
        val = this.value.map(_=>_.value);
      }else {
        val = [ this.value.value ];
      }
  		return val;
  	},
    option_in () {
      let arr;

      if(this.multiple) {
        arr = [...this.options, ...this.value];
      }else {
        arr = [...this.options, this.value];
      }
      return arr;
    }
  },
  methods: {
  	handleInput (val) {
      const map = new Map();
      this.options.forEach(_=>{map.set(_.value, _)});
      const arr = val.map(d=>{
        const o = map.get(d);
        return o ? o : {label: d, value: d}
      })

      if(this.multiple) {
        this.$emit('input', arr)
      }else {
        this.$emit('input', arr[0])
      }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>