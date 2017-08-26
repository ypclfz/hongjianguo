<template>
  <el-form>
  	<el-form label-width="80px">
  		<el-form-item label="姓名："><el-input></el-input></el-form-item>
  		<el-form-item label="手机："><el-input></el-input></el-form-item>
  		<el-form-item label="邮箱："><el-input></el-input></el-form-item>
  		<el-form-item label="地址："><el-input></el-input></el-form-item>
  		<el-form-item label="QQ："><el-input></el-input></el-form-item>
  		<el-form-item><el-button @click="save">保存</el-button></el-form-item>
  	</el-form>
  </el-form>
</template>

<script>
export default {
  name: 'settingIndividualBase',
  data () {
  	return {
  	  msg: 'Welcome to Your Vue.js App'
  	}
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    save () {}
  },
  created () {
    if(this.user) {
      console.log(this.user);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
