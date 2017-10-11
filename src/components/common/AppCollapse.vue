<template>
	<div class="app-collapse" style="width: 100%">
		<div class="app-collapse-header" :style="headerStyle" @click="toggle" :title="show ? '点击收缩' : '点击展开'">
			<h3 class="app-collapse-title">{{ colTitle }}</h3>
			<div class="app-collapse-control">
				<i :class="toggleClass"></i>
			</div>
		</div>
    <transition 
      name="fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
    	<div class="app-collapse-content" v-show="show">
    		<div v-if="rendered" class="app-collapse-content-inner" ><slot style="margin-top: 20px;"></slot></div>
    	</div>
    </transition>
	</div>
</template>

<script>
export default {
  name: 'appCollapse',
  props: {
    'colTitle': {
      type: String,
      default: '',
    },
    'defaultClose': {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    beforeEnter (el) {
      el.removeAttribute('style');
      el.style.height = '0px';
      el.style.overflow = 'hidden'; 
    },
    enter (el) {
      if(el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      }
    },
    afterEnter(el) {
      el.removeAttribute('style');
    },
    beforeLeave (el) {     
      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';  
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0;
      }
    },
    afterLeave(el) {
      el.removeAttribute('style');
      el.style.display = 'none';
    },
    toggle () {
      this.show = !this.show;
      this.toggleClass = this.toggleClass == 'el-icon-plus' ? 'el-icon-minus' : 'el-icon-plus';
    }
  },
  data () {
    return {
      rendered: false,
      toggleClass: this.defaultClose ? 'el-icon-plus' : 'el-icon-minus',
      show: !this.defaultClose,
      content_height: 'auto',
      headerStyle: '',
      height: '',
    }
  },
  mounted () { 
    const content = this.$el.querySelector(".app-collapse-content");
    
    this.height = content.clientHeight;
  },
  created () {
    if(this.show) {
      this.rendered = true;
    }
  },
  watch: {
    show (val) {
      if(val && !this.rendered) {
        this.rendered = true;
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*.app-collapse * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none !important;
}*/
.app-collapse {
	position: relative;
    margin-bottom: 10px;
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
    cursor: pointer;
    overflow: hidden;
}
.app-collapse-title {
    font-size: 14px;
    font-weight: normal;
    float: left;
    margin: 0;
    margin-right: 10px;
    padding: 8px 0;
    /*min-height: 42px*/
}
.app-collapse-content {
	border: 1px solid #e4e9eb;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
 
}
.app-collapse-content-inner {
  padding: 10px 15px;
}
.app-collapse-control {
	  width: auto;
    float: right;
    position: absolute;
    right: 10px;
    top: 0;

    padding: 10px 5px;
    /*cursor: pointer;*/
}
.app-collapse-header:hover .app-collapse-control i{
	opacity: 1;
} 
/*.app-collapse-header:hover .app-collapse-control:hover i {
	opacity: 1;
}*/
/*.app-collapse-control i:hover {
	opacity: 1;
}*/
.app-collapse-control i{
	
	font-size: 12px;
	font-weight: bold;
	/*-webkit-transition: -webkit-transform 0.4s ease !important;*/
    transition: all 0.4s ease !important;
    opacity: .5;
}

.fade-enter-active, .fade-leave-active {
  transition: height .5s;
}
</style>