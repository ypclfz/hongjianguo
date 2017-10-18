<template>
  <app-collapse col-title="分类信息">
      <el-form label-width="120px">
				<el-form-item label="产品分类">
					<product v-model="form.products" multiple></product>
				</el-form-item>
				<el-form-item label="技术分类">
					<classification v-model="form.classification"></classification>
				</el-form-item>
				<el-form-item label="标签">
          <static-select type="tag" v-model="form.tags" multiple></static-select>
				</el-form-item>
				<el-form-item label="主国际分类号">
					<el-input v-model="form.main_ipc" placeholder="请填写主国际分类号"></el-input>
				</el-form-item>
      </el-form>
    </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Product from '@/components/form/Product'
import Classification from '@/components/form/Classification'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'patentAddClassification',
  data () {
		return {
			form: {
				products: [],
				classification: '',
				tags: [],
				main_ipc: '',
			}
    }
  },
  methods: {
  	setForm (data) {
      for(let k in this.form) {
        if(k == 'products') {
          this.form[k] = data[k].map(_=>_.id);
        }else if(k == 'classification') {
          this.form[k] = data[k].id;
        }else {
          this.form[k] = data[k];
        }
      }
  	},
    submitForm () {
      return this.form;
    },
    checkForm (callback) {
      callback(true);
    },
  },
  components: { AppCollapse, Product, Classification, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>