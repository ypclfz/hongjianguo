<template>
  <div>
  	<inventor v-for="(item, index) in value" :key="index" style="margin-bottom: 5px" :value="value[index]" @input="(val)=>{handleInput({val, index})}" is-delete @deleteInventor="dataDelete(index)" :disabled="disabled"></inventor>

    <el-row>
      <el-button type='text' @click="add({'share': '', 'id': ''})" v-if="!disabled">添加发明人</el-button>
    </el-row>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import Inventor from '@/components/form/Inventor'

export default {
  name: 'inventors',
  mixins: [ Multiline ],
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
