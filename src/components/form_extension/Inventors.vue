<template>
  <div>
  	<inventor v-for="(item, index) in value" :key="index" style="margin-bottom: 5px" :value="value[index]" @input="(val)=>{handleInput({val, index})}" :isDelete="index != 0" @deleteInventor="handleDelete(index)"></inventor>

    <el-row>
      <el-button type='text' @click="handleAdd">添加发明人</el-button>
    </el-row>
  </div>
</template>

<script>
import Inventor from '@/components/form_extension/Inventor'

export default {
  name: 'inventors',
  props: {
  	'value': {
  		type: Array,
  		default: [{ inventor: '', percent: '' }],
  	}
  },
	data () {
		return {
		  
		}
  },
  methods: {
  	handleAdd () {
  		this.$emit('addInventor');
  	},
  	handleDelete (index) {
  		this.$emit('deleteInventor', index);
  	},
  	handleInput ({val, index}) {
  		const copy = this.$tool.deepCopy(this.value);
  		copy[index] = val;
  		this.$emit('input', copy);
  	}
  },
  components: { Inventor }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
