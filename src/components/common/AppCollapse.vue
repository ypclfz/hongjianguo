<template>
	<div class="app-collapse" style="width: 100%">
		<div class="app-collapse-header" :style="headerStyle">
			<h3 class="app-collapse-title">{{ colTitle }}</h3>
			<div class="app-collapse-control" @click="show = !show">
				<i :class="toggleClass"></i>
			</div>
		</div>
    <transition 
      name="fade"
      @enter="enter"
      @leave="leave"
      @after-leave="afterLeave"
    >
    	<div class="app-collapse-content" v-show="show">
    		<slot style="margin-top: 20px;"></slot>
    	</div>
    </transition>
	</div>
</template>

<script>
export default {
  name: 'appCollapse',
  props: ['col-title'],
  methods: {
    enter(el) {
      const d = this;
      d.toggleClass = 'el-icon-minus';
      d.headerStyle = "";
        
      setTimeout(function() {el.style.height = d["original_height"] + "px"}, 0);
    },
    leave(el) {
      const d = this;
      d.toggleClass = 'el-icon-plus';

      el.style.height = "0px";
    },
    afterLeave() {
      const d = this;
      d.headerStyle = "border-radius: 4px;"
    }
  },
  data () {
    return {
      toggleClass: 'el-icon-minus',
      show: true,
      original_height: 0,
      content_height: 'auto',
      headerStyle: ''
    }
  },
  mounted () {
    const d = this; 
    const content = d.$el.querySelector(".app-collapse-content");
    
    d["original_height"] = content.clientHeight;
    content.style.height = d["original_height"] + "px";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-collapse * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none !important;
}
.app-collapse {
	position: relative;
    margin-bottom: 25px;
    border-radius: 4px;
    border: 0;
    box-shadow: none;
}
.app-collapse-header {
	padding: 0 15px;
    min-height: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #e4e9eb;
    color: #768399;
    overflow: hidden;
}
.app-collapse-title {
    font-size: 18px;
    font-weight: normal;
    float: left;
    margin: 0;
    margin-right: 10px;
    padding: 12px 0;
    min-height: 42px
}
.app-collapse-content {
	border: 1px solid #e4e9eb;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;

}
.app-collapse-control {
	width: auto;
    float: right;
    position: absolute;
    right: 10px;
    top: 0;

    padding: 10px 5px;
    cursor: pointer;
}
.app-collapse-header:hover .app-collapse-control i{
	opacity: .5;
} 
.app-collapse-header:hover .app-collapse-control:hover i {
	opacity: 1;
}
/*.app-collapse-control i:hover {
	opacity: 1;
}*/
.app-collapse-control i{
	
	font-size: 12px;
	font-weight: bold;
	/*-webkit-transition: -webkit-transform 0.4s ease !important;*/
    transition: all 0.4s ease !important;
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: height .5s;
  overflow: hidden;
}
</style>