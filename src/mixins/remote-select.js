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
      const key = this.DATA_KEY;
      const url = this.URL;
      const data = os ? Object.assign({}, s, os) : s;
      const success = _=>{
        this.loading = false;
        this.options = _[key];
      }

      this.loading = true;
      this.axiosGet({url, data, success});
  	}
  },
  created () {
  	this.remoteMethod('');
  },
}