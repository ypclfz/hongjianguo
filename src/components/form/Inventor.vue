<template>
	<el-row>
    <el-col :span="12" style="padding-right:5px">
      <inventor-select :value="value.id" @input="handleInventor" :disabled="disabled"></inventor-select>
    </el-col>
    <el-col :span="6" style="padding:0 5px">
      <el-autocomplete placeholder="贡献率" :fetch-suggestions="handleFetch"  style="width: 100%" readonly :value="share + ''" @input="handlePercent" :disabled="disabled">
        <template slot="append">%</template>
      </el-autocomplete>
    </el-col>
    <el-col :span="6" style="padding-left:5px">
      <el-button size="small" v-if="isDelete && !disabled" @click="deleteInventor">删除</el-button>
    </el-col>
  </el-row>  
</template>

<script>
import InventorSelect from '@/components/form/InventorSelect'
export default {
  name: 'inventor',
  props: {
  	'value': Object,
  	'isDelete': {
  		type: Boolean,
  		default: false,
  	},
    'disabled': {
      type: Boolean,
      default: false,
    }
  },
  data () {
		return {
		  option: {
		  	inventors: []
		  },
      value9: '',
      loading: false,
		}
  },
  computed: {
  	id () {
  		return this.value.id;
  	},
  	share () {
  		return this.value.share;
  	}
  },
  methods: {
  	handleFetch (val, cb) {
      cb([
        {value: 10},
        {value: 20},
        {value: 30},
        {value: 40},
        {value: 50},
        {value: 60},
        {value: 70},
        {value: 80},
        {value: 90},
        {value: 100},
      ])
    },
    querySearchAsync (keyword, cb) {
      const params = { keyword };
      this.$axios.get('/api/inventors', { params }).then(response=>{
        cb(response.data.data.data);
      })
    },
    deleteInventor () {
    	this.$emit('deleteInventor');
    },
    handleInventor (val) {
    	const id = val;
    	const share = this.share;
    	this.$emit('input', { id, share });
    },
    handlePercent (val) {
    	const id = this.id;
    	const share = val;
    	this.$emit('input', { id, share });
    },
    idSelect (a) {
      const id = a.name;
      const share = this.share;
      this.$emit('input', { id, share });
    },
    idBlur () {
      console.log('blur');
    }
  },
  components: { InventorSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
