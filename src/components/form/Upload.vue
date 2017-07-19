	<template>
	  <el-upload
      class="upload-demo"
      drag
      :on-success="handleUploadSuccess"
      :on-remove="handleUploadRemove"
      action="http://www.zhiq.wang/file/upload"
      multiple
    >
			<i class="el-icon-upload"></i>
  		<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
	</template>

	<script>
	export default {
	  name: 'upload',
	  props: {
	  	'value': {
	  		type: Array,
	  		default: [],
	  	}
	  },
	  data () {
			return {}
	  },
	  methods: {
	  	handleUploadSuccess (p, f) {
	      if(p.status) {
	      	const copy = [...this.value];
	      	const uid = p.file.uid;
	      	
	      	f.customId = uid;
	      	copy.push(uid);
	      	this.$emit('input', copy);
	      }else {
	        this.$alert(p.info);
	      }
	    },
	    handleUploadRemove (f) {
	      // const id = f.customId;

	      // this.$http.post(fileDelete, { id });

	      // const arr = this.formData.attachments;
	      // for(let i = 0; i < arr.length; i++) {
	      //   if(arr[i] == id) {
	      //     arr.splice(i,1);
	      //     break;
	      //   }
	      // }
	    },
	  }
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>