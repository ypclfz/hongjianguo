export default {
	props: {
		'value': Array
	},
	methods: {
		handleInput (val, key, index) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr[index][key] = val;
  		this.$emit('input', arr);
  	},
  	delete (index) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr.splice(index, 1);
  		this.$emit('input', arr);
  	},
  	add (obj) {
  		const arr = this.$tool.deepCopy(this.value);
  		arr.put(obj);
  		this.$emit('input', arr);
  	}
  }
}