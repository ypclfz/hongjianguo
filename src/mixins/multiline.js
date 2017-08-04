export default {
	props: {
		'value': Array,
    'disabled': {
      type: Boolean,
      default: false,
    }
	},
	methods: {
		handleInput (val, key, index) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr[index][key] = val;
  		this.$emit('input', arr);
  	},
  	dataDelete (index) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr.splice(index, 1);
  		this.$emit('input', arr);
  	},
  	add (obj) {
  		const arr = this.$tool.deepCopy(this.value);
      console.log(arr);
  		arr.push(obj);
  		this.$emit('input', arr);
  	}
  }
}