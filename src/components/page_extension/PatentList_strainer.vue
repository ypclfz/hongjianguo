<template>
  <app-collapse col-title="专利查询" default-close>
  	<el-form :model="form" label-width="80px" ref="form">
  		<el-row>
				<el-col :span="12">
					<el-form-item label="专利标题" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="发明人" prop="inventors">
						<inventor-select v-model="form.inventors" multiple></inventor-select>
					</el-form-item>
					<el-form-item label="专利人" prop="proposer">
						<member v-model="form.proposer" multiple></member>
					</el-form-item>
				</el-col>
				<el-col :span="12">
						<el-form-item label="技术分类" prop="classification">
							<classification v-model="form.classification" multiple></classification>
						</el-form-item>
						<el-form-item label="产品分类" prop="product">
							<product v-model="form.product" multiple></product>
						</el-form-item>
						<el-form-item label="标签" prop="tags">
							<tag v-model="form.tags" multiple></tag>
						</el-form-item>
				</el-col>
  		</el-row>
  		<el-row>
				<el-button @click="search(form, $refs.form)">查询</el-button>
				<el-button @click="clear($refs.form)">清空</el-button>
  		</el-row>
  	</el-form>
  </app-collapse>
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import InventorSelect from '@/components/form/InventorSelect'
import Member from '@/components/form/Member'
import Classification from '@/components/form/Classification'
import Product from '@/components/form/Product'
import Tag from '@/components/form/Tag'
export default {
  name: 'patentListStrainer',
  props: ['value'],
  data () {
		return {
			form: {
				title: '',
				classification: [],
				product: [],
				proposer: [],
				branch: [],
				tags: [],
				inventors: [],
			}
		}
  },
  methods: {
  	search (f, form) { 
  		const filter = {};
  		for(let k in f) {
  			const d = f[k];
  			if( d.constructor == Array ) {
  				if(d.length != 0) filter[k] = d.join(",");
  			}else {
  				if(d != "") filter[k] = d;
  			}
  		}
  		this.$emit('input', filter);
  		this.$emit('refresh');
  	},
  	clear (form) {
  		form.resetFields();
  		this.$emit('input', {});
  		this.$emit('refresh');
  	}
  },
  components: { AppCollapse, InventorSelect, Member, Classification, Product, Tag }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
