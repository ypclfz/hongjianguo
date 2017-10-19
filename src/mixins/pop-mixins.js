export default {
	data () {
		return {
			id: '',
      type: '',
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
      const url = this.$options.URL;
      const tex = this.$options.REMINDER_TEXT;
      
      const data = this.addForm 
                    ? this.addForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      
      const success = _=>{
        this.$message({message: `添加${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'add');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }
      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPost({url, data, success, complete});
        }
      })
      
    },
    edit () {
      const url = `${this.$options.URL}/${this.id}`;
      const tex = this.$options.REMINDER_TEXT;
      
      const data = this.editForm 
                    ? this.editForm() : this.submitForm 
                      ? this.submitForm() : this.form;
      
      const success = _=>{
        this.$message({message: `编辑${tex}成功`, type: 'success'});
        this.dialogVisible = false;
        this.$emit('refresh', 'edit');
      }
      const complete = _=>{
        this.btn_disabled = false;
      }

      this.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          this.$axiosPut({url, data, success, complete});        
        }
      })

    }
	}
}