export default {
	props: {
  	'value': null,
  	'multiple': {
  		type: Boolean,
  		default: false,
  	},
  	'disabled': {
  		type: Boolean,
  		default: false,
  	}
  },
  methods: {
  	handleInput (val) {
  		this.$emit('input', val);
  	}
  }
}