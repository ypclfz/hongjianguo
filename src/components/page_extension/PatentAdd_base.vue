<template>
  <app-collapse col-title="基本信息">
		<el-form label-width="120px">
      <el-form-item label="案号">
        <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
      </el-form-item>
			<el-form-item label="标题">
				<el-input v-model="form.title" placeholder="请填写案件标题"></el-input>
			</el-form-item>
	    <el-form-item label="申请地区">
	    	<region v-model="form.area" multiple></region>
	    </el-form-item>
	    <el-form-item label="专利类型">
	      <patent-type v-model="form.type"></patent-type>
	    </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="form.abstract" placeholder="请填写专利摘要"></el-input>
      </el-form-item>
      <el-form-item label="申请方式">
        <el-select v-model="form.manner">
          <el-option
            v-for="item in options.manner"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请日">
        <el-date-picker v-model="form.apd" type="date" placeholder="请选择申请日"></el-date-picker>
      </el-form-item>
      <el-form-item label="申请号">
        <el-input v-model="form.apn" placeholder="请填写申请号"></el-input>
      </el-form-item>

      <template v-if="form.type == 1">
        <el-form-item label="公开日">
          <el-date-picker v-model="form.public_date" type="date" placeholder="请选择公开日"></el-date-picker>
        </el-form-item>
        <el-form-item label="公开号">
          <el-input v-model="form.public_number" placeholder="请填写公开号"></el-input>
        </el-form-item>
      </template>
      
      <el-form-item label="公告日">
        <el-date-picker v-model="form.issue_date" type="date" placeholder="请选择公告日"></el-date-picker>
      </el-form-item>
      <el-form-item label="公告号">
        <el-input v-model="form.issue_number" placeholder="请填写公告号"></el-input>
      </el-form-item>
      
      <el-form-item label="额外要求">
        <el-checkbox-group v-model="form.extension" v-if="extensionSet.length != 0">
          <el-checkbox 
            v-for="item in extensionSet" 
            :key="item.label"
            :label="item.label"
          >{{ item.text }}</el-checkbox>
        </el-checkbox-group>
        <span v-else>暂无可选项</span>
      </el-form-item>
      
      <template v-if="form.type == 1">
        <el-form-item label="初审合格日">
          <el-date-picker v-model="form.pre_exam_ok_date" type="date" placeholder="请选择初审合格日"></el-date-picker>
        </el-form-item>
        <el-form-item label="进入实审日">
          <el-date-picker v-model="form.sub_exam_start_date" type="date" placeholder="请选择实审日"></el-date-picker>
        </el-form-item>
      </template>

      <template v-if="pctIf">
        <el-form-item label="国际申请日">
          <el-date-picker v-model="form.pct_apd" type="date" placeholder="请选择国际申请日"></el-date-picker>
        </el-form-item>
        <el-form-item label="国际申请号">
          <el-input v-model="form.pct_no" placeholder="请填写国际申请号"></el-input>
        </el-form-item>
        <el-form-item label="国际优先权日">
          <el-date-picker v-model="form.pct_priority_date" type="date" placeholder="请选择国际优先权日"></el-date-picker>
        </el-form-item>
        <el-form-item label="国际公开日">
          <el-date-picker v-model="form.pct_public_date" type="date" placeholder="请选择国际国际公开日"></el-date-picker>
        </el-form-item>
        <el-form-item label="国际公开语言">
          <el-select v-model="form.pct_public_language" placeholder="请选择语言">
            <el-option
              v-for="item in options.language"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国际公开号">
          <el-input v-model="form.pct_public_no" placeholder="请填写国际公开号"></el-input>
        </el-form-item>
        <el-form-item label="复审委内编号">
          <el-input v-model="form.board_number" placeholder="请填写复审委内编号"></el-input>
        </el-form-item>
      </template>
	  </el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Region from '@/components/form/Region'
import Proposal from '@/components/form/Proposal'
import Upload from '@/components/form/Upload'
import PatentType from '@/components/form/PatentType'

const extensionHash = [
  { text: '是否与生物相关', label: 'is_biological', area: '', type: 1 },
  { text: '是否是分案申请', label: 'is_division', area: '', type: [] },
  { text: '是否同时提出实审请求', label: 'is_exam_request', area: 'CN', type: 1 },
  { text: '是否依赖于遗传资源', label: 'is_genetci', area: 'CN', type: [] },
  { text: '是否不丧失新颖性公开', label: 'is_leakage', area: 'CN', type: [] },
  { text: '是否请求提前公开', label: 'is_pre_public', area: '', type: 1 },
  { text: '是否要求优先权', label: 'is_priority', area: '', type: [] },
  { text: '是否保密审查', label: 'is_secure_check', area: '', type: [1,2] },
  { text: '是否有序列表', label: 'is_sequence', area: '', type: 1 },
  { text: '是否同日申请了同样的实用新型/发明', label: 'is_utility', area: '', type: [1,2] },  
] 

export default {
  name: 'patentAddBase',
  props: ['type'],
  data () {
		return {
		  form: {
        serial: '',
        title: '',
        area: [],
        type: '',
        abstract: '',
        manner: '',
        apd: '',
        apn: '',
        public_date: '',
        public_number: '',
        issue_date: '',
        issue_number: '',
        extension: [],
        pre_exam_ok_date: '',
        sub_exam_start_date: '',
        pct_apd: '',
        pct_no: '',
        pct_priority_date: '',
        pct_public_date: '',
        pct_public_language: '',
        pct_public_no: '',
        board_number: ''
      },
      options: {
        manner: [
          {label:"直接申请",value:1},
          {label:"巴黎公约",value:2},
          {label:"PCT进入国家阶段",value:3},
          {label:"外部转入", value: 4}
        ],
        language: [
          {label:"中文-Chinese",value:"CN"},
          {label:"英文-English",value:"EN"},
          {label:"法文-Franch",value:"FR"},
          {label:"德文-Germany",value:"GE"},
          {label:"日文-Japanese",value:"JP"},
          {label:"俄文-Russian",value:"RU"},
          {label:"西班牙-Spanish",value:"ES"}
        ]
      }
		}
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
    pctIf () {
      return this.form.manner == 3 ? true : false;
    }
  },
  methods: {
  	checkForm () {

  	},
  	setForm (data) {
  		for (let k in this.form) {
  			if( k == 'extension' ) {
  				const arr = [];
  				for(let k2 in data[k]) {
  					if(data[k][k2]) arr.push(k2);
  				}

  				this.form[k] = arr;
  			}else {
  				this.form[k] = data[k];
  			}
  		} 
  	},
  	handleUploadSuccess () {

  	},
  	handleUploadRemove () {

  	},
  },
  components: { AppCollapse, Region, Proposal, Upload, PatentType }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>