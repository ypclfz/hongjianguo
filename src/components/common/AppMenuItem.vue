<template>
	      
	<el-submenu v-if="dd.type == 'submenu' && !menusMap.get(dd.path) ? true : false" :index="dd.path">
		<template slot="title"><i :class="dd.icon"></i>{{ dd.text }}</template>
		<template v-if="forChildren(dd)">
			<app-menu-item v-for="item in dd.children" :key="item.path" :dd="item"></app-menu-item>
		</template>
	</el-submenu>

	<el-menu-item v-else-if="dd.type == 'item' && !menusMap.get(dd.path) ? true : false" :index="dd.path"><i :class="dd.icon"></i>{{ dd.text }}<span v-if="dd.path == '/task/pending' ">({{ pendingTaskCount }})</span></el-menu-item>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'appMenuItem',
  props: ['dd'],
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
    ...mapGetters([
      'menusMap',
      'pendingTaskCount',
      // ...
    ])
  }
}
</script>