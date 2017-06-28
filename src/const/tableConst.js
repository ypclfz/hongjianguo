export default {
	data: {
		pageData: [],
		totalNumber: 0,
		pageSize: 5,
		currentPage: 1,
		tableSelect: []
	},
	methods: {
		getPageData (c) {
	  		const d = this,
	  			  start = (c - 1) * d.pageSize,
	  			  end = c * d.pageSize;
	  	
  			return d.tableData.slice(start, end);
  		},
  		getSelection () {
  			return this.tableSelect;
  		},
  		handleCurrentChange(c) {
  			const d = this;

  			d.currentPage = c;
  			d.pageData = d.getPageData(c);
  		},
  		handleselectionChange(selection) {
  			const d = this;

  			d.tableSelect = selection;
  		}
	}
}
