<template>
	<el-row>
    <el-col :span="16" style="padding-right:5px">
      <remote-select type="member" :value="id" ref="member" :static-map="inventorInstall" @input="handleInventor" :disabled="disabled"></remote-select>
    </el-col>
    <el-col :span="6" style="padding:0 5px">
      <el-autocomplete placeholder="贡献率" :fetch-suggestions="handleFetch"  style="width: 100%" readonly :value="share + ''" @input="handlePercent" :disabled="disabled">
        <template slot="append">%</template>
      </el-autocomplete>
    </el-col>
    <el-col :span="2" style="padding-left:5px">
      <el-button size="small" type="text" v-if="isDelete && !disabled" @click="deleteInventor">删除</el-button>
    </el-col>
  </el-row>  
</template>

<script>
import InventorSelect from '@/components/form/InventorSelect'
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
export default {
  name: 'inventor',
  mixins: [ AxiosMixins ], 
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
      loading: false,
      inventorInstall: [],
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
        {value: 100},
        {value: 90},
        {value: 80},
        {value: 70},
        {value: 60},
        {value: 50},
        {value: 40},
        {value: 30},
        {value: 20},
        {value: 10},
      ])
    },
    deleteInventor () {
    	this.$emit('deleteInventor');
    },
    handleInventor (val) {
    	const selected = this.$refs.member.map.get(val);
      console.log(selected);
      const id = selected && selected.id ? selected.id : '';
      const identity = selected && selected.identity ? selected.identity : '';
    	const share = this.share;
        
    	this.$emit('input', { id, share, identity });
    },
    handlePercent (val) {
    	const id = this.id;
    	const identity = this.identity;
      const share = val;
    	this.$emit('input', { id, share, identity });
    },
  },
  created () {
    const v = this.value;
    if(v.name) {
      this.inventorInstall.push(v);
    }
  },
  watch: {
    value (v) {
      if(v.name) {
        this.inventorInstall.push(v);
      }
    }
  },
  components: { InventorSelect, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
