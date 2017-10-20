<template>  
	<el-collapse v-model="activeNames">
	  <el-collapse-item title="任务详情" name="1" :gutter="20">
	    <el-form label-width="70px" label-position="left" class="form-information">
	    	<el-row :gutter="20">
	    		<el-col :span="12">
	    			<el-form-item label="节点名称"><span class="form-item-text">{{ row.node_name }}</span></el-form-item>
	    			<el-form-item label="法定期限"><span class="form-item-text">{{ row.deadline }}</span></el-form-item>
	    		</el-col>
	    		<el-col :span="12">
	    			<el-form-item label="承办人"><span class="form-item-text">{{ row.person_in_charge_name }}</span></el-form-item>
	    			<el-form-item label="承办期限"><span class="form-item-text">{{ row.due_time }}</span></el-form-item>
	    		</el-col>
	    	</el-row>
        <el-row>
          <el-form-item label="备注"><span class="form-item-text">{{ row.remark }}</span></el-form-item>
        </el-row>
        <el-form-item label="附件">
          <table-component :tableOption="attachmentsOption" :data="row.attachments"></table-component>
        </el-form-item>
	    </el-form>
	  </el-collapse-item>
	  <el-collapse-item title="提案详情" name="2" v-if="row.category == 0">
	    <el-form label-width="70px" label-position="left" class="form-information" v-loading="loading" element-loading-text="加载提案信息中...">
	    	<el-row :gutter="20">
	    		<el-col :span="12">
            <el-form-item label="发明人"><span class="form-item-text">{{ row_p.inventors.map(_=>_.name).join(';') }}</span></el-form-item>
            <el-form-item label="技术分类"><span class="form-item-text">{{ row_p.classification.name }}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称"><span class="form-item-text">{{ row_p.products.map(_=>_.name).join(';') }}</span></el-form-item>
            <el-form-item label="标签"><span class="form-item-text">{{ row_p.tags.join(';') }}</span></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="提案人"><span class="form-item-text">{{ row_p.proposer.name }}</span></el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="备注"><span class="form-item-text">{{ row_p.remark }}</span></el-form-item>
        </el-row>
        <el-row>
	    			<el-form-item label="案件摘要"><span class="form-item-text">{{ row_p.abstract }}</span></el-form-item>
        </el-row>
	    	<el-row>
	    		<el-form-item label="附件">
						<table-component :tableOption="attachmentsOption" :data="row_p.attachments"></table-component>
	    		</el-form-item>
	    	</el-row>
	    </el-form>
	  </el-collapse-item>
	  <el-collapse-item  name="2" v-else-if="row.category == 1">
      <template slot="title">
        专利详情<el-button size="mini" type="text" style="margin-left: 10px;" @click.stop="editPatent">更多...</el-button>
      </template>
	    <el-form label-width="70px" label-position="left" class="form-information" v-loading="detailLoading" element-loading-text="加载专利信息中..." style="min-height: 300px;">
	    	<template v-if="!!detailBasePatent">
          <el-row :gutter="20">
  	    		<el-col :span="12">	    			
  	    			<el-form-item label="发明人"><span class="form-item-text">{{  detailBasePatent.inventors.map(_=>_.name).join(';') }}</span></el-form-item>
  	    			<el-form-item label="技术分类"><span class="form-item-text">{{ detailBasePatent.classification.name }}</span></el-form-item>
  	    			<el-form-item label="申请地区"><span class="form-item-text">{{ detailBasePatent.area.name }}</span></el-form-item>
              <el-form-item label="专利类型"><span class="form-item-text">{{ detailBasePatent.type.name }}</span></el-form-item>
  	    			<el-form-item label="相关提案"><span class="form-item-text">{{ detailBasePatent.proposals.map(_=>_.serial).join(';') }}</span></el-form-item>
  	    		</el-col>
  	    		<el-col :span="12">
  	    			<el-form-item label="产品名称"><span class="form-item-text">{{ detailBasePatent.products.map(_=>_.name).join(';') }}</span></el-form-item>
  	    			<el-form-item label="标签"><span class="form-item-text">{{ detailBasePatent.tags.join(';') }}</span></el-form-item>
  	    			<el-form-item label="申请日"><span class="form-item-text">{{ detailBasePatent.apd }}</span></el-form-item>
              <el-form-item label="申请号"><span class="form-item-text">{{ detailBasePatent.apn }}</span></el-form-item>
  	    			<el-form-item label="提案人"><span class="form-item-text">{{ detailBasePatent.proposer.name }}</span></el-form-item>
  	    		</el-col>
  	    	</el-row>
  	    	<el-row>
  	    		<el-form-item label="案件摘要"><span class="form-item-text">{{ detailBasePatent.abstract }}</span></el-form-item>
  	    	</el-row>
  	    	<el-row>
  	    			<el-form-item label="备注"><span class="form-item-text">{{ detailBasePatent.remark }}</span></el-form-item>
  	    	</el-row>
  	    	<el-row>
  	    		<el-form-item label="附件">
  						<table-component :tableOption="attachmentsOption" :data="detailBasePatent.attachments"></table-component>
  	    		</el-form-item>
  	    	</el-row>
        </template>
	    </el-form>
	  </el-collapse-item>
	  <el-collapse-item name="2" v-else-if="row.category == 3">
	    <template slot="title">
        版权详情<el-button size="mini" type="text" style="margin-left: 10px;" @click.stop="editCopyright">更多...</el-button>
      </template>
      <el-form label-width="70px" label-position="left" class="form-information" v-loading="detailLoading" element-loading-text="加载版权信息中..." style="min-height: 300px;">
        <template v-if="!!detailBaseCopyright" >
          <el-row :gutter="20">
            <el-col :span="12">
              
              <el-form-item label="申请人"><span class="form-item-text">{{ detailBaseCopyright.applicants.map(_=>_.name).join(';') }}</span></el-form-item>
              <el-form-item label="技术分类"><span class="form-item-text">{{ detailBaseCopyright.classification.name }}</span></el-form-item>
              <el-form-item label="申请地区"><span class="form-item-text">{{ detailBaseCopyright.area.name }}</span></el-form-item>
              <el-form-item label="版权类型"><span class="form-item-text">{{ detailBaseCopyright.type.name }}</span></el-form-item>
              <el-form-item label="IPR"><span class="form-item-text">{{ detailBaseCopyright.ipr.name }}</span></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品名称"><span class="form-item-text">{{ detailBaseCopyright.products.map(_=>_.name).join(';') }}</span></el-form-item>
              <el-form-item label="标签"><span class="form-item-text">{{ detailBaseCopyright.tags.join(';') }}</span></el-form-item>
              <el-form-item label="申请日"><span class="form-item-text">{{ detailBaseCopyright.apd }}</span></el-form-item>
              <el-form-item label="申请号"><span class="form-item-text">{{ detailBaseCopyright.apn }}</span></el-form-item>
              <el-form-item label="提案人"><span class="form-item-text">{{ detailBaseCopyright.proposer.name }}</span></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="案件摘要"><span class="form-item-text">{{ detailBaseCopyright.abstract }}</span></el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="备注"><span class="form-item-text">{{ detailBaseCopyright.remark }}</span></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="附件">
              <table-component :tableOption="attachmentsOption" :data="detailBaseCopyright.attachments"></table-component>
            </el-form-item>
          </el-row>
        </template>
      </el-form>
	  </el-collapse-item>
    <el-collapse-item name="2" v-else-if="row.category == 5" title="账单详情">
      <invoice-detail :id="row.project_id"></invoice-detail>
    </el-collapse-item>
	</el-collapse>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import InvoiceDetail from '@/components/page_extension/InvoiceCommon_detail'
import { mapGetters } from 'vuex'

const URL = '/api/tasks';

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'row' ],
  data () {
  	return {
  		activeNames: ['1', '2'],
  		loading: true,
  		attachmentsOption: {
        'is_search': false,
        'is_pagination': false,
        'is_border': false,
        'columns': [
          { type: 'text', label: '附件名称', prop: 'name' },
          { type: 'text', label: '附件格式', prop: 'ext' },
          { type: 'text', label: '附件大小 ', prop: 'size' },
          { 
            type: 'action', 
            label: '详情',
            btns: [
              {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
              {type: 'download', click: ({downloadUrl})=>{window.location.href = downloadUrl}},
            ],
          }
        ]
      },
  		row_p: {
  			abstract: '',
  			inventors: [],
  			classification: '',
  			products: [],
  			tags: [],
  			remark: '',
  			attachments: [],
        proposer: '',
  		},
  		row_patent: {
  			abstract: '',
  			inventors: [],
  			classification: '',
  			products: [],
  			tags: [],
  			remark: '',
  			attachments: [],
  			area: '',
  			type: '',
  			apd: '',
  			apn: '',
        proposals: [],
        ipr: '',
        proposer: '',
  		},
      row_copyright: {
        abstract: '',
        applicants: [],
        classification: '',
        products: [],
        tags: [],
        remark: '',
        attachments: [],
        area: '',
        type: '',
        apd: '',
        apn: '',
        ipr: [],
        proposer: '',
      },
  	}
  },
  computed: {
    ...mapGetters([
      'detailBasePatent',
      'detailBaseCopyright',
      'detailLoading',
    ])  
  },
  methods: {
  	refresh () {
	  	this.loading = true;
	  	if(this.row.category == 0) {
	  		this.refreshP();
	  	}else if(this.row.category == 1) {
	  		this.refreshPatent();
	  	}else if(this.row.category == 3) {
        this.refreshCopyright();
      }
  	},
  	refreshP () {
  		const url = `/api/proposals/${this.row.project_id}`;
  		const success = _=>{
  			this.$tool.coverObj(this.row_p, _.proposal);
  			this.loading = false;
  		};

  		this.axiosGet({url, success});
  	},
  	refreshPatent () {
      //这里使用全局的专利详情信息

  		// const url = `/api/patents/${this.row.project_id}`;
  		// const success = _=>{
  		// 	this.$tool.coverObj(this.row_patent, _.patent);
  		// 	this.loading = false;
  		// }

  		// this.axiosGet({url, success});
  	},
    refreshCopyright () {
      //这里使用全局的版权详情信息

      // const url = `/api/copyrights/${this.row.project_id}`;
      // const success = _=>{
      //   this.$tool.coverObj(this.row_copyright, _.copyright);
      //   this.loading = false;
      // }
      // this.axiosGet({url, success});
    },
    editPatent () {
      this.$emit('more', 'patent');
    },
    editCopyright () {
      this.$emit('more', 'copyright');
    }
  },
  created () {
  	this.refresh();
  },
  watch: {
  	row () {
  		this.refresh();
  	}
  },
  components: {
  	TableComponent,
    InvoiceDetail,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>