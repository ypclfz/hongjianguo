<template>
  <el-switch
    :value="value"
    @input="handleInput"

    :on-color="config.onColor"
    :off-color="config.offColor"
    :on-text="config.onText"
    :off-text="config.offText"
    :on-value="config.onValue"
    :off-value="config.offValue"
  >
  </el-switch>
</template>

<script>
const config = [
	['status', {
		onColor: '#13ce66',
		offColor: '#ff4949',
		onText: '启用',
		offText: '禁用',
		onValue: 1,
		offValue: 0,
	}],
	['is', {
		onColor: '#13ce66',
		offColor: '#ff4949',
		onText: '是',
		offText: '否',
		onValue: 1,
		offValue: 0,
	}]
];
const map = new Map(config);

export default {
  name: 'appSwitch',
  props: [ 'value', 'type' ],
 	computed: {
 		config () {
 			const config = map.get(this.type);
 			return config ? config : this.type;
 		}
 	},
 	methods: {
 		handleInput(val) {
 			this.$emit('input', val);
 		}
 	} 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>