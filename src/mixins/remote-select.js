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
  computed: {
    value2 () {
      if(!this.multiple) {
        return this.value == "" ? [] : [ this.value ];
      }else {
        return this.value;
      }
    }
  },
  methods: {
  	handleInput (val) {
      if(!this.multiple) {
        this.$emit('input', val[0] ? val[0] : '');  
      }else {
        this.$emit('input', val);
      }
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
  watch: {
    value2 (val) {
      if( !this.multiple && val.length == 1) {
        this.$refs.select.visible = false;
      }
    }
  },
  created () {
  	this.remoteMethod('');
  },
}