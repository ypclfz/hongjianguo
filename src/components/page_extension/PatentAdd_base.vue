<template>
  <app-collapse col-title="基本信息">
		<el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="案号">
        <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
      </el-form-item>
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title" placeholder="请填写案件标题" ></el-input>
			</el-form-item>
	    <el-form-item label="申请地区" prop="area" :rules="{ type: type=='add' ? 'array' : 'string',required: true, message: '地区不能为空', trigger: 'change'}">
	    	<region 
          v-model="form.area" 
          :multiple="type == 'add'"
        ></region>
	    </el-form-item>
	    <el-form-item label="专利类型" prop="type">
	      <static-select type="patent_type" v-model="form.type"></static-select>
	    </el-form-item>
      <el-form-item label="申请人">
        <remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
      </el-form-item >
      <el-form-item label="发明人" prop="inventors">
        <inventors v-model="form.inventors"></inventors>
      </el-form-item>
      <el-form-item label="优先权">
        <priorities v-model="form.priorities"></priorities>
      </el-form-item>
      <el-form-item label="额外要求">
        <el-checkbox-group v-model="form.extension" v-if="extensionSet.length != 0" id="extension">
          <el-checkbox 
            v-for="item in extensionSet" 
            :key="item.label"
            :label="item.label"
          >{{ item.text }}</el-checkbox>
        </el-checkbox-group>
        <span v-else>暂无可选项</span>
      </el-form-item>     
	  </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Region from '@/components/form/Region'
import Proposal from '@/components/form/Proposal'
import PatentType from '@/components/form/PatentType'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import Priorities from '@/components/form/Priorities'
import Inventors from '@/components/form/Inventors'
import { checkInventors } from '@/const/validator.js'

const extensionHash = [
  { text: '是否同时提出实审请求', label: 'is_exam_request', area: 'CN', type: 1 },
  { text: '是否请求提前公开', label: 'is_pre_public', area: '', type: 1 },
  { text: '是否保密审查', label: 'is_secure_check', area: '', type: [1,2] },
  { text: '是否同日申请了同样的实用新型/发明', label: 'is_utility', area: '', type: [1,2] },  
  { text: '是否是分案申请', label: 'is_division', area: '', type: [] },
  { text: '是否与生物相关', label: 'is_biological', area: '', type: 1 },
  { text: '是否有序列表', label: 'is_sequence', area: '', type: 1 },
  { text: '是否依赖于遗传资源', label: 'is_genetci', area: 'CN', type: [] },
  { text: '是否不丧失新颖性公开', label: 'is_leakage', area: 'CN', type: [] },
  { text: '是否要求优先权', label: 'is_priority', area: '', type: [] },
] 

export default {
  name: 'patentAddBase',
  props: ['type'],
  data () {
		return {
		  form: {
        serial: '',
        title: '',
        area: this.type == 'add' ? [] : '',
        type: '',
        applicants: [],
        inventors: [],
        priorities: [],
        extension: [],       
      },
      
      rules: {
        'title': { required: true, message: '标题不能为空', trigger: 'blur' },        
        'type': { type: 'number', required: true, message: '专利类型不能为空', trigger: 'change' },
        'inventors': {
          type: 'array',
          trigger: 'change',
          validator: (a,b,c)=>{
            this.$nextTick(_=>{
              checkInventors(a, this.form.inventors, c, false);
            })       
          },
        },
      },
		};
  },
  computed: {
  	extensionSet () {
  		const area = this.type == 'add' ? this.form.area.join(',') : this.form.area;
  		const type = this.form.type;
  		const arr = [];
  		extensionHash.forEach(d=>{
  			const areaReg = new RegExp(d.area);
  			const typeArr = d.type instanceof Array ? d.type : [d.type];
  			if ( areaReg.test(area) ) {
          if(typeArr.length == 0) {
            arr.push({ text: d.text, label: d.label });
          }else {
            for (let t of typeArr) {
              if(t == type) {
                arr.push({ text: d.text, label: d.label });
                break;
              }
            }  
          }
  			}
  		})
  		return arr;
  	},
  },
  methods: {
  	checkForm (callback) {
      let flag = true;
      this.$refs.form.validate(_=>{
        flag = _;
        callback(flag);
      });
  	},
  	setForm (data) {
  		for (let k in this.form) {
  			if( k == 'extension' ) {
  				const arr = [];
  				for(let d of data[k]) {
  					if(d['value']) arr.push(d['label']);
  				}

  				this.form[k] = arr;
  			}else if(k == 'area' || k == 'type') {
          this.form[k] = data[k]['id'];
        }else {
  				this.form[k] = data[k];
  			}
  		} 
  	},
    submitForm () {
      return this.$tool.shallowCopy(this.form, { 'date': true });
    },
  	handleUploadSuccess () {

  	},
  	handleUploadRemove () {

  	},
  },
  components: { 
    AppCollapse, 
    Region, 
    Proposal, 
    PatentType, 
    StaticSelect,
    RemoteSelect,
    Priorities,
    Inventors,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#extension .el-checkbox {
  margin-left: 0px;
  margin-right: 10px;
}
</style>