<template>
  <el-select
    :value="value"
    @input="handleInput"
  	:multiple="multiple"
  	:disabled="disabled"
    placeholder="请选择费用代码"
  >
  	<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
  	>
  	</el-option>
  </el-select>
</template>

<script>
import FormSelect from '@/mixins/form-select'

export default {
  name: 'feeCode',
  mixins: [ FormSelect ],
  methods: {
  	handleInput (val) {
  		const d = this.codeMap.get(val);
  		this.$emit('input', val);
  		this.$emit('change', d);
  	}
  },
  computed: {
  	options () {
  		return this.$store.getters.feeCodeOptions;
  	},
  	codeMap () {
  		return this.$store.getters.feeCodeMap;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>