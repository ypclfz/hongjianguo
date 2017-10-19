<template>
  <div class="main">
    
    <pa-base ref="base" :type="type"></pa-base>
    <person ref="person" :type="type"></person>
    <classification ref="classification"></classification>
    <agent ref="agent" v-if="type == 'edit'"></agent>
    <case ref="case"></case>
    <other ref="other" :type="type"></other>
    
    <div style="margin-bottom: 20px;">
      <el-button @click="add" type="primary" v-if="type == 'add'" :disabled="btn_disabled">添加</el-button>
      <!-- <el-button @click="edit" type="primary" v-if="type == 'edit'" :disabled="btn_disabled">编辑</el-button> -->
      <el-button @click="cancel" v-if="!shrink" :disabled="btn_disabled">取消</el-button>
    </div>
  </div>
</template>

<script>
const map = new Map([
  ['base', '请正确填写基本信息！'],
  ['person', '请正确填写扩展信息！'],
  ['classification', '请正确填写分类信息'],
  ['case', '请正确填写相关案件信息'],
  ['other', '请正确填写其他信息及附件'],
]);

const getKeys = ['base', 'person', 'classification', 'case', 'other'];
const setKeys = ['base', 'person', 'classification', 'agent', 'case', 'other'];

const URL = '/api/patents';

import AxiosMixins from '@/mixins/axios-mixins'
import AppCollapse from '@/components/common/AppCollapse'
import PaBase from '@/components/page_extension/PatentAdd_base'
import Person from '@/components/page_extension/PatentAdd_person'
import Classification from '@/components/page_extension/PatentAdd_classification'
import Agent from '@/components/page_extension/PatentAdd_agent'
import Case from '@/components/page_extension/PatentAdd_case'
import Other from '@/components/page_extension/PatentAdd_other'
export default {
  name: 'patentAdd',
  data () {
    return {
      id: '',
      pop_type: '',
      btn_disabled: false,
      shrink: false,
    }
  },
  props: ['pageType'],
  mixins: [ AxiosMixins ],
  methods: {
    add () {
      
      this.formCheck(_=>{
        const url = URL;
        const data = Object.assign( ...getKeys.map(_=>this.$refs[_].submitForm()) );
        const success = _=>{ 
          this.$message({message: '添加专利成功', type: 'success'});
          this.$router.push('/patent/list'); 
        };
        const complete = _=>{
          this.btn_disabled = false;
        }

        this.btn_disabled = true;
        this.axiosPost({url, data, success, complete});  
      })
      
    },
    edit () {
      this.formCheck(_=>{
        const url = `${URL}/${this.id}`;
        const data = Object.assign( ...getKeys.map(d=>this.$refs[d].submitForm()) );
        const success = _=>{ 
          this.$message({message: '编辑专利成功', type: 'success'});
          this.$emit('editSuccess');
          // this.$router.push('/patent/list');
        };
        const complete = _=>{
          this.btn_disabled = false;
        }

        this.btn_disabled = true;
        this.axiosPut({url, data, success, complete});  
      })
    },
    formCheck (callback) {
      let key = "";
      let flag = false;

      const check = (index)=>{
        const key = getKeys[index];
        if(key) {
          this.$refs[key].checkForm(_=>{
            if(_) {
              check(index+1);
            }else {
              this.$message({message: map.get(key), type: 'warning'})      
            }
          })  
        }else {
          callback();
        }
      }
      
      check(0);

    },
    cancel () {
      this.$router.push('/patent/list');
    },
    refreshForm (val) {
      if( this.type == 'edit' && this.$tool.getObjLength(val) != 0) {
        const copy = this.$tool.deepCopy(val);
        this.id = copy.id;
        setKeys.map(_=>this.$refs[_].setForm(copy));
      }
    }
  },
  computed: {
    detail () {
      return this.$store.getters.detailBase;
    },
    type () {
      if(this.pageType) {
        this.shrink = true;
        return this.pageType;
      }else {
        this.shrink = false;
        return this.$route.meta.type;
      }
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
  components: { PaBase, Person, Classification, Agent, Case, Other, AppCollapse }
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