export default {
	props: ['value'],
	methods: {
		search (form) {
			const copy = {};
			for (let k in form) {
				const d = form[k];
				if(d instanceof Array) {
					if(d[0]) {
						if(d[0] instanceof Date) {
  							copy[k] = d.map(_=>this.$tool.getDate(_)).join(",")
	  					}else {
	  						copy[k] = d.join(",")
	  					}	
					}
					
				}else if( d instanceof Date ){
					copy[k] = this.$tool.getDate(d);
				}else{
					if(d != '') copy[k] = d;
				}
			}
			this.$emit('input', copy);
			this.$emit('refresh');
		},
		clear (form_ref) {
			form_ref.resetFields();
			this.$emit('input', {});
			this.$emit('refresh');
		}
	}
} 