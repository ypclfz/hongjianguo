export default {
	props: {
  	'value': [Number, String, Array, Object],
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
      // console.log(this.value);
      if(!this.multiple && !this.single) {
        // console.log(this.value == "" || (this.value instanceof Object && this.$tool.getObjLength(this.value) == 0 ) ? [] : [ this.value ]);
        return this.value == "" || (this.value instanceof Object && this.$tool.getObjLength(this.value) == 0 ) ? [] : [ this.value ];
      }else {
        return this.value;
      }

    }
  },
  methods: {
  	handleInput (val) {
      if(!this.multiple && !this.single) {
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
        _[key] = _[key].map(_=>{
          if(!_.name) _.name = _.label;
          if(!_.id) _.id = _.value;
          return _;
        });
        this.options = _[key];
      }

      this.loading = true;
      this.axiosGet({url, data, success});
  	}
  },
  watch: {
    value2 (val) {
      if( !this.single ) {
        console.log('watch val')
        if(this.$refs.select) {
          this.$refs.select.visible = false;
        }
      }
    }
  },
  // created () {
  // 	this.remoteMethod('');
  // },
}