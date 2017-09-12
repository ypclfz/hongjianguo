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
		},
    url () {
      return this.$options.URL ? this.$options.URL : '';
    }
	},
	methods: {
		show ( type='add', data ) {
  		this.type = type;
      this.dialogVisible = true;
     	
     	this.$nextTick(_=>{
     		
        this.$refs.form.resetFields();  
      	
	      if(type == 'edit') {
          if(data instanceof Object) {
            const copy = this.$tool.deepCopy(data);
            this.id = copy.id; 
            this.setForm ? this.setForm(data) : this.$tool.coverObj(this.form, copy);  
          }else if(data instanceof String || data instanceof Number) {
            data -= 0;
          }
	        
	      }
     	});
  	},
  	add () {
      this.btn_disabled = true;
      const url = this.$options.URL;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.submitForm ? this.submitForm() : this.form;
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
      const url = `${this.url}/${this.id}`;
      const tex = this.$options.REMINDER_TEXT;
      const data = this.submitForm ? this.submitForm() : this.form;
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