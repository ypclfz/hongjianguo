<template>
  <div class="main">
		<app-collapse v-for="(item,index) in configs" :col-title="item.name" :key="index">
			<el-form label-width="200px">
				<el-form-item v-for="f_item in item.configs" :label="f_item.label" :key="f_item.name"><el-input :placeholder="f_item.description" v-model="f_item.config_value"></el-input></el-form-item>
			</el-form>
		</app-collapse>
		<el-button type="primary" @click="save">保存设置</el-button>
  </div>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/configs'

export default {
  name: 'settingSystem',
  mixins: [ AxiosMixins ],
  data () {
  	return {
  		configs: [],	
  	}
  },
  methods: {
  	save () {
  		const url = URL;
  		const data = this.configs;
  		const success = _=>{this.$message({message: '保存系统设置成功', type: 'success'})};

  		this.axiosPost({url, data, success});
  	}
  },
  created () {
  	const url = URL;
  	const success = _=>{ this.configs = _.configs };

  	this.axiosGet({url, success});
  },
  components: { AppCollapse },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>