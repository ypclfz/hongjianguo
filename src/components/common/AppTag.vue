<template>
  <div class="app-tag">
  	<ul class="app-tag-menu">
  		<li :class="item.key == key ? 'active' : ''" v-for="item in tags" @click="key = item.key"><div>{{ item.text }}</div></li>
  	</ul>
  	<div class="app-tag-content">
  		<slot v-for="item in tags" v-if="key == item.key" :name="item.key">
  		</slot>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'appTag',
  props: ['tags'],
  data () {
    const d = this; 
    let key = '';
    for(let t of d.tags) {
      if(t["active"]) {
        key = t["key"];
      }
    }
    key = key ? key : d.tags["key"]; 

    return {
      key,
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