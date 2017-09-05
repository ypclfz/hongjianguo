<template>
	<div class="main">
    <el-row v-for="(row, i) in arr" :gutter="20" :key="i">
      <el-col v-for="(item, i2) in row" :span="24/row.length" :key="i2">
        <chart v-if="!!item" :type="item" style="margin: 10px 0px;"></chart>
      </el-col>
    </el-row>
	</div>
</template>
<script>
import AppFilter from '@/components/common/AppFilter'
import AxiosMixins from '@/mixins/axios-mixins'
import Chart from '@/components/page_extension/Home_charts'


let data;
const URL = '/api/stats/lists';
export default {
  name: 'home',
  mixins: [ AxiosMixins ],
  data () {
    return {
      arr: 
      [ 
        ['application_pie','proposal_bar'],
        ['copyright_bar', 'application_bar'], 
        ['issue_bar', ''],
      ],
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
  components: { AppFilter, Chart },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
