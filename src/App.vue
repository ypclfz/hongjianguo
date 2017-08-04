<template>
  <div id="app">
    <nav>
      <span>LOGO</span>
    </nav>
    <div class="nav-left" :style="navL_height">
      <el-menu theme="dark" router>
        <app-menu v-for="item in menu_data" :data="item" :key="item.path"></app-menu>
      </el-menu>
    </div>
    <div class="container">
      <h1 class="container-menu"><i :class="select.icon"></i><span>{{ select.text }}</span></h1>
      <div class="container-nav">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item v-for="item in select_arr" :to="item.path" :key="item.path">
            <i :class="item.icon"></i>{{ item.text }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="screen_label.length != 0" class="container-nav-screen">
            <el-tag 
              v-for="(tag, index) in screen_label"
              :closable="true"
              :key="tag" 
              type="primary"
              :close-transition="false"
              @close="handleClose(index)"
            >
              {{ tag }}
            </el-tag>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menu from '@/const/menuConst'
import AppMenu from '@/components/common/AppMenu'
export default {
  name: 'app',
  computed: {
    select () {
      const d = this;
      let path = d.$route.path;
      const params = d.$route.params;
      path = path.split("__")[0];
      
      return menu.map[path];
    },
    select_arr () {
      const d = this;
      const arr = [];
      let path = d.$route.path;
      const params = d.$route.params;

      path = path.split("__")[0];

      const arr2 = path.split("/");

      for(let i = 0; i < arr2.length; i++) {
        const str = i == 0 ? "/" : arr2.slice(0, i+1 ).join("/");
        arr.push(menu.map[str]);
      }

      return arr;
    },
    screen_label () {
      return this.$store.getters.screen_label;
    },
    navL_height () {
      return "height:" + (window.innerHeight - 50) + "px";
    }
  },
  data () {
    return {
      
      menu_data: menu.data
    };
  },
  methods: {
    handleClose: function (index) {
      this.$store.commit('removeScreen', index);
    }
  },
  beforeCreated () {

  },
  created () {
    this.$axios.post('/api/login',{'username': 'Shawn', 'password': 'u5/vpsgWLohjhN5sd7MIZ7vSkqLC9nyma0RlWQ4oTM78HfPClnwlfvJJJxGtT7RMW6MAZog7qsdd90pd0949gIU7KR3PXYNWP1KOqu6GBWQIMrTnFktDkT+L9G6pZLZ/1i5W1W9FCmPeSFtHlQx/AaMxQh+57R/6lZqXN93gS2hwfaRuPtNyq/lQlN0bJOX1UpOzS3mXpvgcPEcmhPQUOxSZ3fJ/EvRTMY286WrnWWa+qbWjMNJt5GZkPcXCX58nzilX+LVFqekhILpOO4I1yxCNohPrPBTaNKKZr9UIaA9DEDZg80kn43cASpDGvygZp+GqLUXPjHr6o5SCn0uJyw=='})
      .then(()=>{

        this.$store.dispatch('refreshTags');
        this.$store.dispatch('refreshProduct');
        this.$store.dispatch('refreshClassification');
        this.$store.dispatch('refreshBranch');
        this.$store.dispatch('refreshIpr');
        this.$store.dispatch('refreshArea');
          
      });
    
  },
  components: { AppMenu }
}
</script>
<style lang="scss">
$nav_bgColor: #383838;
$nav_height: 50px;

$navL_bgColor: #324157;
$navL_width: 200px;

$container_padding: 25px;

$table_margin: 15px;

body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
textarea {
  height: 150px;
}
#app {
  posiion: relative;
  padding: {
    top: $nav_height;
    left: $navL_width;
  };
}
nav {
  position: fixed;
  background-color: $nav_bgColor;
  top: 0;
  left: 0;
  height: $nav_height;
  width: 100%;
  color: #fff;
  padding-left: 20px;
  line-height: $nav_height;
  z-index: 2;
}
.nav-left {
  overflow-y: auto;
  width: $navL_width;
  position: fixed;
  top: $nav_height;
  left: 0;
  background-color: $navL_bgColor;
}
.container {
  padding: 0 $container_padding
}
.nav-left .iconfont {
  position: relative;
  padding-right: 10px;
  top: 1px;
}
.container-menu {
  font-size: 24px;
  color: #acb1b8;
  height: 46px;
  line-height: 46px;
}
.container-menu .iconfont {
  
  opacity: .3;
  font-size: 42px;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
    top: -8px;
}
.container-nav {
  border-radius: 4px;
  background: #f3f5f6;
  padding: 15px;
  margin-bottom: 15px;
}
.container-nav .el-breadcrumb {
  font-size: 18px;
}
.container-nav .iconfont {
    font-size: 18px;
    padding-right: 5px;
}
.container-nav-screen .el-tag+.el-tag {
  margin-left: 10px;
}
.el-table {
  margin: $table_margin 0;
}
.table-header {
  overflow: hidden;
}
.table-search {
  width: 130px;
  float: right;
  transition: all 1s;
}
.table-search-focus  {
  width: 200px;
}
.el-pagination {
  text-align: right;
  padding-right: 40px;
}
.row {
  overflow: hidden;
}
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 220px;
}
.left .tree-search>input {
  border-radius: 0;
}
.dialog-mini .el-dialog {
  width: 300px;
}
.dialog-small .el-dialog {
  width: 600px;
}
.el-dropdown-menu__item {
  line-height: 25px;
  font-size: 14px;
  font-family: "microsoft yahei", Helvetica, Tahoma, Arial, sans-serif;
  padding: 0 20px;
}
.el-dialog {
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
  box-shadow: 0 5px 15px rgba(0,0,0,.5);
}
.el-dialog__header {
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 20px 15px;
}
.dialog-mini .el-dialog--tiny {
  width: 300px;
}
.el-dropdown-menu__item--divided:before {
  margin: 0 -20px;
}
.el-select {
  width: 100%;
}
.el-input__inner {
  height: 37px;
}
.table-header-btn .el-icon-menu::before {
  font-size: 12px;
}
</style>