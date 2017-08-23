export default {
	data () {
		return {
			type: '',
			id: '',
      		btn_disabled: false,
		  	dialogVisible: false,
		}
	},
	computed: {
		title () {
			const t = this.type;
			const tex = this.$options.REMINDER_TEXT;

			return t == 'add' ? `新增${tex}` : `编辑${tex}`;
		}
	},
	methods: {
		show ( type='add', data ) {
  		this.type = type;
      this.dialogVisible = true;
     	
     	this.$nextTick(_=>{
     		if(type == 'add') {
          this.$refs.form.resetFields();  
      	}

	      if(type == 'edit') {
	        const copy = this.$tool.deepCopy(data);
	        this.id = copy.id; 
	        this.$tool.coverObj(this.form, copy);
	      }
     	});
  	},
  	add () {
      this.btn_disabled = true;
      const url = this.$options.URL;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.form;
      const success = _=>{
        this.$message({message: `添加${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'add');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }

      this.axiosPost({url, data, success, complete});
    },
    edit () {
      this.btn_disabled = true;
      const url = `${this.$options.URL}/${this.id}`;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.form;
      const success = _=>{
        this.$message({message: `编辑${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'edit');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }

      this.axiosPut({url, data, success, complete});
    }
	}
}