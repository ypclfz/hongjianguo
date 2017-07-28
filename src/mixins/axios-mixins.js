export default {
  methods: {
  	axiosGet ({url, params, success}) {
      this.$axios
        .get(url, { params })
        .then(response=>{
          const d = response.data;
          !d.status 
            ? this.$alert('请求数据失败！') 
            : success 
              ? success(d) 
              : '';
        })
        .catch(error=>{
          console.log(error);
          this.$alert('网络错误！');
        })
    }	
  }
}