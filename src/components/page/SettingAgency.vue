<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table">
			<template slot-scope="scope" slot="is_core_partner"> 
				<el-select v-model="is_core_partner" style="width: 130px;">
					<el-option v-for="(item, index) in options.is_core_partner" :label="item.l" :value="item.v" :key=index></el-option>
				</el-select>
			</template>
		</table-component>
  	<pop ref="pop" @refresh="update"></pop>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent' 
import Pop from '@/components/page_extension/settingAgency_pop'
import AxiosMixins from '@/mixins/axios-mixins'

const URL = '/api/agencies';
export default {
  name: 'settingAgency',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  option: {
			'name': 'agency',
			'height': 'default2',
		  	'header_btn': [
		  		{'type': 'add', click: this.add},
		  		{'type': 'control'}
				],
				'header_slot': [ 'is_core_partner' ],
				'columns': [
					{ type: 'selection' },
					{ type: 'text', label: '机构名称', prop: 'name', width: '318' },
					{ type: 'text', label: '联系人', prop: 'contact', width: '84' },
					{ type: 'text', label: '地址', prop: 'address', width: '341' },
					{ type: 'text', label: '联系电话', prop: 'telephone', width: '179' },
					{ type: 'text', label: '邮箱', prop: 'email', width: '204' },
					{ type: 'text', label: '状态', prop: 'status_name', width: '80' },
					{ type: 'text', label: '核心合作伙伴', prop: 'is_core_partner_name', width: '133' },
					{ type: 'array', label: '业务范围', prop: 'scope', width: '250' },
					{ type: 'text', label: '评分', prop: 'rank', width: '180',
					  render: (h,item)=>{
					  	const rank = item/20;
					  	return h('el-rate', {
					  		attrs: {
					  			'value': rank,
					  			'disabled': true,
					  			'show-text': true,
					  			'text-color': '#f90',
					  			'text-template': `${item}`,
					  		}
					  	})
					  }
					},
					{
						type: 'action',
						width: '200',
						btns: [
							{ type: 'edit', click: this.edit },
							{ type: 'detail', click: this.detail },
							{ type: 'delete', click: this.deleteSingle },
						]
					}
				]
		  },
		  tableData: [],
		  options: {
		  	is_core_partner: [
		  		{l: '全部', v: ''},
		  		{l: '核心伙伴', v: 1},
		  		{l: '非核心伙伴', v: 0},
		  	]
		  },
		  is_core_partner: '',
		}
  },
  methods: {
  	add () {
  		this.$router.push({ name: 'UserList', params: { groupId: 5 }});
  	},
  	edit (row) {
  		this.$refs.pop.show('edit', row);
  	},
  	detail ({id}) {
	  	this.$router.push({path: '/setting/agency/detail', query: {id} })
  	},
  	deleteSingle ({id, name}) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, '提示' ,{type: 'warning'})
  			.then(_=>{  
  				const url = `${URL}/${id}`;
  				const success = _=>{ this.update() };

  				this.axiosDelete({url, success}); 
  			})
  			.catch(_=>{console.log(_)})
  		const url = `${URL}/${id}`;
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const is_core_partner = this.is_core_partner !== "" ? { is_core_partner: this.is_core_partner } : {};
  		const data = Object.assign({}, option, is_core_partner);
  		const success = _=>{ this.tableData = _.agencies };

  		this.axiosGet({url, data, success});
  	},
  	refresh () {
  		this.$refs.table.refresh();	
  	},
  	update () {
  		this.$refs.table.update();
  	}
  },
  watch: {
  	is_core_partner () {
  		this.refresh();
  	}
  },
  mounted () {
  	this.refresh();
  },
  components: { TableComponent, Pop },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>