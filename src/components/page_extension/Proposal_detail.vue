<template>
	<el-tabs v-model="activeName">
    <el-tab-pane label="详细信息" name="first">
			<el-form label-width="70px" label-position="left" class="form-information" v-loading="loading" element-loading-text="加载提案信息中..." style="padding: 0 20px;">
	    	<el-row :gutter="20">
	    		<el-col :span="12">
            <el-form-item label="发明人"><span class="form-item-text">{{ row.inventors.map(_=>_.name).join(';') }}</span></el-form-item>
            <el-form-item label="技术分类"><span class="form-item-text">{{ row.classification.name }}</span></el-form-item>
            <el-form-item label="创建时间"><span class="form-item-text">{{ row.create_time }}</span></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称"><span class="form-item-text">{{ row.products.map(_=>_.name).join(';') }}</span></el-form-item>
            <el-form-item label="标签"><span class="form-item-text">{{ row.tags.join(';') }}</span></el-form-item>
            <el-form-item label="更新时间"><span class="form-item-text">{{ row.update_time }}</span></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="提案人"><span class="form-item-text">{{ row.proposer.name }}</span></el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="备注"><span class="form-item-text">{{ row.remark }}</span></el-form-item>
        </el-row>
        <el-row>
	    			<el-form-item label="案件摘要"><span class="form-item-text">{{ row.abstract }}</span></el-form-item>
        </el-row>
	    	<el-row>
	    		<el-form-item label="附件">
						<table-component style="margin: 10px 0;" :tableOption="attachmentsOption" :data="row.attachments"></table-component>
	    		</el-form-item>
	    	</el-row>
	    	<el-row>
	    		<el-form-item label="相关专利">
	    			<table-component style="margin: 10px 0;" :tableOption="patentsOption" :data="row.patents"></table-component>
	    		</el-form-item>
	    	</el-row>
	    </el-form>
    </el-tab-pane>
    <el-tab-pane label="提案流程" name="second" >
    	<div v-loading="loading" style="padding: 0 20px;">
			<el-steps :space="100" direction="vertical">
			  <el-step 
			  	v-for="(item, index) in row.tasks" 
			  	:key="item.id" 
			  	:status="item.status ? 'success' : 'finish'"
			  	:icon="item.status ? '' : 'loading'"
			  	:title="item.node_name"
			  	:description="`承办人：${item.person_in_charge_name}；开始时间：${item.start_time}；完成时间：${item.end_time}；备注：${item.remark}`" 
			  ></el-step>
			</el-steps>
			</div>
			<!-- <el-steps :space="100" direction="vertical" v-loading="loading" element-loading-text="加载提案流程中...">
        <el-step v-for="(item, index) in row.tasks" :key="item.id" :icon="item.status ? '' : 'loading'" :status="item.status ? 'success' : 'finish'" :title="item.node_name" :description="`承办人：${item.person_in_charge_name}；开始时间：${item.start_time}；完成时间：${item.end_time}；备注：${item.remark}`"></el-step>
			</el-steps> -->
    </el-tab-pane>
  </el-tabs>
	    
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
const URL = '/api/tasks';

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'id' ],
  data () {
  	return {
  		row: {
  			proposer: '',
  			create_time: '',
  			update_time: '',
  			title: '',
  			abstract: '',
  			inventors: [],
  			branch: '',
  			classification: '',
  			products: [],
  			tags: [],
  			remark: '',
  			attachments: [],
  			patents: [],
  			tasks: [],
  		},
  		loading: false,
  		activeName: 'first',
  		attachmentsOption: {
        'is_header': false,
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
      patentsOption: {
        'is_header': false,
        'is_pagination': false,
        'is_border': false,
        'columns': [
          { type: 'text', label: '案号', prop: 'serial' },
          { type: 'text', label: '标题', prop: 'title' },
          { type: 'text', label: '当前节点', prop: 'progress_name' },
          { 
            type: 'action',
            btns: [
              {type: 'detail', click: ({id})=>{this.$router.push(`/patent/list/detail/${id}`)}}
            ]  
          }
        ]
      },
  	}
  },
  methods: {
  	refreshProposal () {
  		const url = `/api/proposals/${this.id}`;
  		const success = _=>{
  			this.$tool.coverObj(this.row, _.proposal);
  		}

  		this.loading = true;
  		this.axiosGet({url, success}).then(_=>{ this.loading = false });
  	}
  },
  watch: {
  	id () {
  		this.refreshProposal();
  	}
  },
  created () {
  	this.refreshProposal();
  },
  components: {
  	TableComponent,
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>