<template>
  <div class="main">
  </div>
</template>

<script>
import menu from '@/const/menuConst'
export default {
  name: 'AppCrumbs',
  data () {
	return {}
  },
  computed: {
  	select_arr () {
      const d = this;
      const arr = [];
      const path = d.$route.path;
      const arr2 = path.split("/");

      for(let i = 0; i < arr2.length; i++) {
        const str = i == 0 ? "/" : arr2.slice(0, i+1 ).join("/");
        arr.push(menu.map[str]);
      }

      return arr;
    },
    screen_arr () {
      const d = this;
      const screen = d.$store.state.screen;
      const arr = [];
      for(let s of screen) {
        arr.push(s["name"] + "：" + s["items"].join("、"));
      }

      return arr;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
