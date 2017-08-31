<template>
<div class="main">
  <div class="app-tag">
  	<ul class="app-tag-menu">
  		<li :class="item.key == key ? 'active' : ''" v-for="item in tags" @click="change(item.key)"><div>{{ item.text }}</div></li>
  	</ul>
  	<div class="app-tag-content">
  		<template v-if="is_static">
        
        <slot 
          v-for="item in tags"
          :name="item.key"
          v-if="item.key == key"
        >
        </slot>

      </template>
      <template v-else><slot></slot></template>
	  </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'appTag',
  props: {
    'tags': {
      required: true,
      type: Array,
    },
    'is_static': {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      key_static: "",
    }
  },
  computed: {
    key () {
      if(this.is_static) {
        return this.key_static;
      }else {
        return this.$route.path.split("/").pop();  
      }
      
    }
  },
  methods: {
    change (key) {
      if(this.is_static) {
        this.key_static = key;
      }else {
        const arr = this.$route.path.split("/");
        arr.pop();
        arr.push(key); 
        this.$router.push(arr.join("/"));  
      }
    }
  },
  created () {
    if(this.is_static) {
      this.key_static = this.tags.filter(_=>_.default)[0]['key'];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-tag-menu{
  border-bottom: 1px solid #ddd;
  padding-left: 0;
}
.app-tag-menu::before,.app-tag-menu::after {
  display: table;
  content: "";
}
.app-tag-menu::after {
  clear: both;
}
.app-tag-menu>li {
    float: left;

    float: left;
    margin-bottom: -1px;

    position: relative;
    display: block 
}
.app-tag-menu>li>div {
  position: relative;
  padding: 10px 15px;
  color: #777;
  font-size: 14px;
  margin-right: 2px;

  border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.app-tag-menu>li.active>div {
    color: #555;
    cursor: default;
    background-color: #f3f5f6;
    border: 1px solid #ddd;
    border-bottom-color: transparent;

    
}
.app-tag-menu>li:not(.active)>div:hover {
    color: rgba(217,83,79,0.8);
    background-color: #eee;
    cursor: pointer;
}
</style>