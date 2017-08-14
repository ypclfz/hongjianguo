	<template>
	  <el-upload
      class="upload-demo"
      drag
      :on-success="handleUploadSuccess"
      :on-remove="handleUploadRemove"
      action="/api/files"
      :on-preview="onPreview"
      :file-list="fileList"
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
	  		default () {
	  			return [];
	  		},
	  	},
	  	'fileList': {
	  		type: Array,
	  		default () {
	  			return [];
	  		}
	  	}
	  },
	  data () {
		return {};
	  },
	  methods: {
	  	handleUploadSuccess (p, f) {
	      if(p.status) {
	      	const id = p.data.file.id;
	      	const copy = [...this.value];
	      	
	      	f.id = id;
	      	copy.push(id);
	      	this.$emit('input', copy);
	      }else {
	        this.$alert(p.info);
	      }
	    },
	    onPreview (file) {
	    	window.open(file.response.data.file.downloadUrl);
	    },
	    handleUploadRemove (f) {
	      const id = f.response.data.file.id;
	      const v = this.value;
	      let i = v.length;

	      while(i--) {
	      	if(v[i] == id) break;
	      }
	      const copy = [...v];
	      copy.splice(i, 1);
	      this.$emit('input', copy);

	    },
	  }
	}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style scoped lang="scss">
	</style>