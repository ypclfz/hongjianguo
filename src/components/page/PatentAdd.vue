<template>
  <div class="main">
    <pa-base ref="base"></pa-base>
    <person ref="person"></person>
    <case ref="case"></case>
    <div style="margin-bottom: 20px;">
      <el-button @click="addPatent" v-if="">添加</el-button>
      <el-button @click="editPatent">编辑</el-button>
      <el-button @click="addPatent">{{ this.type_in == 'add' ? '添加' : '编辑' }}</el-button>
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
      type: '',
    }
  },
  mixins: [ AxiosMixins ],
  props: ['type'],
  methods: {
    save () {
      const keys = map.keys();
      const arr = keys.map(d=>this.$refs[d].form);
      const url = URL;
      const urlE = `${URL}/${id}`;
      const data = Object.assign(...arr);
      const success = d=>{ this.$alert(d.info); this.push(0) };
      type == 'add' ? this.axiosPost({url, data, success}) : this.axiosPut({urlE, data, successE});

    },
    addPatent () {
      const arr = keys.map(d=>this.$refs[d].form);
      const form = Object.assign({ id: this.id }, ...arr);
      const msg = this.addCheck();
      msg == '' 
        ? console.log(form) 
        : console.log(msg);
      
    },
    refreshForm (val) {
      if( this.type_in == 'edit' && val) {
        const copy = this.$tool.deepCopy(val);
        this.id = copy.id;
        keys.forEach((d)=>{this.$refs[d].setForm(copy)});
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
  mounted () {
    this.refreshForm(this.detail);
  },
  components: { PaBase, Person, Expand, Case }
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