<template>
	<div class="main">
	</div>
</template>
<script>
import AppFilter from '@/components/common/AppFilter'
import AxiosMixins from '@/mixins/axios-mixins'


let data;
const URL = '/api/stats/lists';
export default {
  name: 'home',
  mixins: [ AxiosMixins ],
  data () {
    return {
      config: '',
    }   
  },
  methods: {
    refreshHome () {
      console.log(data);
    }
  },
  created () {
    if(data === undefined) {
      const url = URL;
      const success = _=>{ 
        data = _.data;
        this.refreshHome(); 
      };
      const complete = _=>{
        this.$store.commit('cancelLoading');
      }

      this.$store.commit('onLoading');
      this.axiosGet({url, success, complete});
    }else {
      this.refreshHome();
    }
  },
  components: { AppFilter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
