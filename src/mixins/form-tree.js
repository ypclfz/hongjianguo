export default {
	props: {
  	'value': [Number, String, Array],
  	'multiple': {
  		type: Boolean,
  		default: false,
  	},
  	'disabled': {
  		type: Boolean,
  		default: false,
  	}
	},
	data () {
		return {
		  'props': {
		  	label: 'name',
		  	children: 'children',
		  },
		}
  },
  computed: {
    data () {
      return this.$store.getters[this.$options.DATA_KEY];
    },
    isDisabled () {
      if(this.data && this.data.length == 0) {
        return true
      }

      return false;
    },
    map () {
      return this.$store.getters[this.$options.MAP_KEY];
    },
    text () {
      const v = this.value;
      const map = this.map;
      let t = '';
      
      if(this.multiple) {
        if(v.length != 0 && map.size != 0) {
          t = v.map(_=>map.get(_).name).join("；");
        }
      }else {
        if(v && map.size != 0) {
          t = map.get(v).name;
        }
      }

      return t;
    }
  },
  methods: {
  	handleValue (val) {
  		const v = this.multiple ? [...val] : val;
  		this.$emit('input', v);
  	},
    refresh (type) {
      this.$store.dispatch(this.$options.REFRESH_KEY);
      if(type == 'remove') {
        
      }
    }
  }		
}