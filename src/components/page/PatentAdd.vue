<template>
  <div class="main">
    <pa-base ref="base" :type="pop_type"></pa-base>
    <person ref="person"></person>
    <case ref="case"></case>
    <div style="margin-bottom: 20px;">
      <el-button @click="add" v-if="pop_type == 'add'">添加</el-button>
      <el-button @click="edit" v-else>编辑</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
const map = new Map([
  ['base', '请正确填写基本信息！'],
  ['person', '请正确填写人员与分类信息！'],
  ['case', '请正确填写委案信息！'],
]);

const URL = '/api/patents';

import AxiosMixins from '@/mixins/axios-mixins'
import PaBase from '@/components/page_extension/PatentAdd_base'
import Person from '@/components/page_extension/PatentAdd_person'
import Case from '@/components/page_extension/PatentAdd_case'
export default {
  name: 'patentAdd',
  data () {
    return {
      id: '',
      pop_type: '',
    }
  },
  mixins: [ AxiosMixins ],
  methods: {
    add () {
      const keys = map.keys();
      const url = URL;
      const data = Object.assign( ...keys.map(d=>this.$refs[d].form) );
      const success = d=>{ this.$router.push('/paten/list') };
      this.axiosGet({url, data, success});

    },
    edit () {
      const keys = map.keys();
      const url = `${URL}/${id}`;
      const data = Object.assign( ...keys.map(d=>this.$refs[d].form) );
      const success = d=>{ this.$alert(d.info).then(()=>{this.$store.dispatch('refreshDetailData')}); }
      this.axiosPut({url, data, success});
    },
    refreshForm (val) {      
      if( this.type='edit' && val) {
        const keys = map.keys();
        const copy = this.$tool.deepCopy(val);
        this.id = copy.id;
        for( let d of keys ){
          this.$refs[d].setForm(copy);
        }
      }
    }
  },
  computed: {
    detail () {
      return this.$store.getters.detailBase;
    } 
  },
  watch: {
    'detail': {
      handler: function(val) {
        this.refreshForm(val);
      }
    }   
  },
  created () {
    const path = this.$route.path;
    this.pop_type = /detail/.test(path) ? 'edit' : 'add';
  },
  mounted () {
    this.refreshForm(this.detail);
  },
  components: { PaBase, Person, Case }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-form {
  padding-top: 22px;
}
.el-form-item {
  padding: 0 15px;
}
</style>