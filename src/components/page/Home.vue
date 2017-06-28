<template>
	<div class="main">
		<div>{{ msg }}</div>
  	<app-filter :data="filter_data"></app-filter>
	</div>
</template>
<script>
import AppFilter from '@/components/common/AppFilter'

export default {
  name: 'home',
  data () {
    return {
      msg: '这里是主页',
      filter_data: [
      	{
      		label: '标签',
      		key: 'tag',
      		tidy: ['标签一', '标签二', '标签三'],
      		items: ['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八'],
      		multipled: true
      	},
      	{
      		label: '时间',
      		key: 'time',
      		items: ['2017', '2016', '2015', '2014', '2013'],
      		multipled: true
      	},
      	{
      		label: '类别',
      		key: 'type',
      		items: ['类别一', '类别二', '类别三', '类别四', '类别五'],
      		multipled: true
      	}
      ]
    }
  },
  created () {
    this.$http.post('http://www.zhiq.wang/index/login',{'username': 'hongjianguo', 'password': 'hongjianguo'}).then(response => {

    
    console.log(response);

  }, response => {
    console.log(response);
  });
  },
  components: { AppFilter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
