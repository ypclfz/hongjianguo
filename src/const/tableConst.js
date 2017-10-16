export default {
	data: {
		pageData: [],
		pageSize: 5,
    pagesizes: [10, 20, 40, 100, 10000],
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
