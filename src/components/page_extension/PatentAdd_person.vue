<template>
  <app-collapse col-title="扩展信息">
      <el-form label-width="120px" :model="form" ref="form">
        <el-form-item label="部门">
          <branch v-model="form.branch" v-if="type == 'add'"></branch>
          <span v-else>{{ branchName ? branchName : '暂未归属某个部门' }}</span>
        </el-form-item>
      	<el-form-item label="IPR">
          <span class="form-item-text" v-if="type == 'add'">{{ user ? user.name : '暂未取得当前用户信息' }}</span>
          <static-select type="ipr" v-model="form.ipr" v-else></static-select>
      	</el-form-item>
        <el-form-item label="提案人">
          <remote-select type="member" v-model="form.proposer"></remote-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="form.abstract" placeholder="请填写专利摘要" :rows="6" class="custom-textarea"></el-input>
        </el-form-item>
        <el-form-item label="公告日">
          <el-date-picker v-model="form.issue_date" type="date" placeholder="请选择公告日"></el-date-picker>
        </el-form-item>
        <el-form-item label="公告号">
          <el-input v-model="form.issue_number" placeholder="请填写公告号"></el-input>
        </el-form-item>
        <el-form-item label="申请日">
          <el-date-picker v-model="form.apd" type="date" placeholder="请选择申请日"></el-date-picker>
        </el-form-item>
        <el-form-item label="申请号">
          <el-input v-model="form.apn" placeholder="请填写申请号"></el-input>
        </el-form-item>

        <el-form-item label="公开日">
          <el-date-picker v-model="form.public_date" type="date" placeholder="请选择公开日"></el-date-picker>
        </el-form-item>
        <el-form-item label="公开号">
          <el-input v-model="form.public_number" placeholder="请填写公开号"></el-input>
        </el-form-item>      
        <el-form-item label="初审合格日">
          <el-date-picker v-model="form.pre_exam_ok_date" type="date" placeholder="请选择初审合格日"></el-date-picker>
        </el-form-item>
        <el-form-item label="进入实审日">
          <el-date-picker v-model="form.sub_exam_start_date" type="date" placeholder="请选择实审日"></el-date-picker>
        </el-form-item>

        <el-form-item label="申请方式">
          <el-select v-model="form.manner" value-key="id">
            <el-option
              v-for="item in options.manner"
              :key="item.id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.manner.id == 3">
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
import Branch from '@/components/form/Branch'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'

import { checkInventors } from '@/const/validator.js'

export default {
  name: 'patentAddPerson',
  props: ['type'],
  data () {
		return {
			form: {
        branch: '',
			  ipr: '',
        proposer: '',
        issue_date: '',
        issue_number: '',
        abstract: '',
        date: '',
        apn: '',

        public_date: '',
        public_number: '',
        pre_exam_ok_date: '',
        sub_exam_start_date: '',

        manner: {name:"直接申请",id:1},
        pct_apd: '',
        pct_no: '',
        pct_priority_date: '',
        pct_public_date: '',
        pct_public_language: '',
        pct_public_no: '',
        board_number: '',
			},
      ipr_name: '',
      branchName: '',
      options: {
        manner: [
          {name:"直接申请",id:1},
          {name:"巴黎公约",id:2},
          {name:"PCT进入国家阶段",id:3},
          {name:"外部转入", id: 4}
        ],
        language: [
          {name:"中文-Chinese",id:"CN"},
          {name:"英文-English",id:"EN"},
          {name:"法文-Franch",id:"FR"},
          {name:"德文-Germany",id:"GE"},
          {name:"日文-Japanese",id:"JP"},
          {name:"俄文-Russian",id:"RU"},
          {name:"西班牙-Spanish",id:"ES"}
        ]
      },
		}
  },
  methods: {
    handleInventor (val) {
      this.form.inventors = val;
      this.$refs.form.validateField('inventors');
    },
  	setForm (data) {
      for(let k in this.form) {
        if( k == 'branch' ) {
          if(data[k]) {
            this.form[k] = data[k]['id'];  
            this.branchName = data[k]['name'];
          }else {
            this.form[k] = '';
            this.branchName = '';
          }
        }else if( k == 'ipr' ) {
          this.form.ipr = data[k]['id'];
          this.ipr_name = data[k]['name'];
        }else {
          this.form[k] = data[k];
        }
      }
  	},
    submitForm () {
      if(this.type == 'add') this.form.ipr = this.user.id;
      return this.$tool.shallowCopy(this.form, { 'date': true });
    },
    checkForm (callback) {
      callback(true);
    },
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    }
  },
  components: { 
    AppCollapse, 
    Branch, 
    StaticSelect, 
    RemoteSelect 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>