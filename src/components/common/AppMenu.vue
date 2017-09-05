<template>
	      
	<el-submenu v-if="data.type == 'submenu' && !menusMap.get(data.path) ? true : false" :index="data.path">
		<template slot="title"><i :class="data.icon"></i>{{ data.text }}</template>
		<template v-if="forChildren(data)">
			<app-menu v-for="item in data.children" :key="item.path" :data="item"></app-menu>
		</template>
	</el-submenu>

	<el-menu-item v-else-if="data.type == 'item' && !menusMap.get(data.path) ? true : false" :index="data.path"><i :class="data.icon"></i>{{ data.text }}</el-menu-item>

</template>

<script>
export default {
  name: 'appMenu',
  props: ['data'],
  methods: {
  	forChildren(item) {
  		if(item.children && item.children.length != 0) {
  			return true;
  		}else {
  			return false;
  		}
  	}
  },
  computed: {
    menusMap () {
      return this.$store.getters.menusMap;
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>