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
    map () {
      return this.$store.getters[this.$options.MAP_KEY];
    },
    text () {
      const v = this.value;
      const map = this.map;
      let t;
      if(this.multiple) {
        t = v.length != 0 ? v.map(d=>map.get(d).name).join("；") : '';
      }else {
        t = v ? map.get(v).name : '';
      }

      return t;
    }
  },
  methods: {
  	handleValue (val) {
  		const v = this.multiple ? [...val] : val;
  		this.$emit('input', v);
  	}
  }		
}