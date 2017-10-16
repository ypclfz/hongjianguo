<template>

	<transition name="slide-fade">
	<div class="app-shrink" v-show="visible">
		<div class="app-shrink-head">
			<span style="font-size: 18px; font-weight: bold;">{{ title }}</span>
			<el-button icon="close" style="float: right; border: 0; height: 40px;" @click="close" title="关闭"></el-button>
			<slot name="header"></slot>
		</div>
		<div v-loading="shrinkLoading" :element-loading-text="shrinkLoadingText">
			<div class="app-shrink-body" :style="`height: ${innerHeight - 80}px; overflow: auto;`" v-if="rendered" >
				<slot></slot>
			</div>
		</div>
	</div>
	</transition>

</template>

<script>
import $ from 'jquery'
import {mapGetters} from 'vuex'

export default {
	name: 'appShrink',
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '标题',
		}
	},
	data () {
		return {
			rendered: false,
		}
	},
	methods: {
		close () {
			this.$emit('update:visible', false);
			this.$emit('close');
		},
		fire (e) {
			const _con = $('.app-shrink');   // 设置目标区域
		  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
		    this.close();
		  }
		}
	}, 
	computed: {
		...mapGetters([
      'innerHeight',
      'shrinkLoading',
      'shrinkLoadingText',
    ]),
	},
	mounted () {
		if (this.visible) {
      this.rendered = true;
      // this.$root.$el.addEventListener('click', this.fire);
    }
	},
	watch: {
		visible (val) {
			console.log('toggle');

			if( !this.rendered && val) {
				this.rendered = true;
			}

			// window.setTimeout(_=>{
			// 	if(val) {
			// 		this.$root.$el.addEventListener('click', this.fire);
			// 	}else {
			// 		this.$root.$el.removeEventListener('click', this.fire);
			// 	}	
			// }, 0);
		}
	}
}
</script>

<style>
.app-shrink {
	position: fixed;
	bottom: 0;
	right: 0;

	padding: 10px;
	width: 926px;
	z-index: 9;

	background-color: #fff;
	box-shadow: -4px 0 2px -2px rgba(0,0,0,.0625);
}
.app-shrink-head {
	height: 40px;
	line-height: 40px;
	padding: 10px;
	border-bottom: 1px solid #e5e5e5;
}
.app-shrink-body {

}

.slide-fade-leave-active, .slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(926px);
}
</style>