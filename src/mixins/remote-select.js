export default {
	props: {
  	'value': [Number, String, Array],
  	'disabled': {
  		type: Boolean,
  		default: false,
  	},
  	'multiple': {
  		type: Boolean,
  		default: false,
  	}
  },
  data () {
		return {
			options: [],
			loading: false,
		}
  },
  methods: {
  	handleInput (val) {
  		this.$emit('input', val);
  	},
  	remoteMethod (keyword) {
     
  		const s = { keyword, listOnly: '1' };
      const os = this.PARAMS;
      const params = os ? Object.assign({}, s, os) : s; 
  		const url = this.URL;
      const key = this.DATA_KEY;

  		this.loading = true;
  		this.$axios.get(url, { params }).then(response=>{
  			this.loading = false;
  			this.options = response.data[key];
  		});
  	}
  },
  created () {
  	this.remoteMethod('');
  },
}