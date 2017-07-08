<template>
  <div class="main">
	  <table-component :tableOption="option" :data="tableData"></table-component>
    <filter @freshData="freshData" ref="filter"></filter>
    <edit @freshData="freshData" ref="edit"></edit>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Filter from '@/components/page_extension/FeePayment_filter'
import Edit from '@/components/page_extension/FeePayment_edit'
import 

export default {
  name: 'feePayment',
  data () {
  	return {
  	  option: {
        'header_btn': [
          { type: 'filter', click: ()=>{ this.filterPopUp } },
          { type: 'delete', click: ()=>{ this.deleteSelection } },
        ],
        'columns': [
          { type: 'selection' },
          { type: 'text', label: '编号' },
          { type: 'text', label: '收款人' },
          { type: 'text', label: '金额' },
          { type: 'text', label: '货币' },
          { type: 'text', label: '汇率' },
          { type: 'text', label: '支付期限' },
          { type: 'text', label: '支付时间' },
          { type: 'text', label: '开票日期' },
          { type: 'text', label: '发票号码' },
          { type: 'text', label: '快递单号' },
          { type: 'text', label: '备注' },
          {
            type: 'action',
            btns: [
              { type: 'edit', click: this.editPopUp },
              { type: 'detail', click: this.detailPopUp },
              { label: '邮件', icon: 'emil', btn_type: 'text', click: this.email },
              { label: '确费', icon: '', btn_type: 'text', click: this.confirm },
              { label: '专利缴费单', icon: 'information', btn_type: 'text', click: this.patent },
            ]
          }
        ],
      },
  	  tableData: [],
  	}
  },
  methods: {
    filterPopUp () {
      this.$refs.filter.show();
    },
    editPopUp (col) {
      this.$refs.edit.show(col);
    },
    detailPopUp () {
      this.$refs.detail.show(col);
    },
    deleteSelection () {

    },
    email (col) {

    },
    confirm (col) {

    },
    patent (col) {
      
    } 
  },
  components: { TableComponent }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>