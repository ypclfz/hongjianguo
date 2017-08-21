const complete_default = function () {};
const status = 0; //这里进行地址代理控制, 为1时去掉/api, 为0时保留
export default {
  methods: {
  	axiosGet ({url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}, complete=_=>{} }) {
      url = status ? url.replace(/\/api/, '') : url;
      this.$axios
        .get(url, { params: data })
        .then(response=>{
          const d = response.data;
          d.status > 0 ? success(d) : error(d);
      
          complete(d);
        })
        .catch(error=>{catchFunc(error); complete(error);});
    },
    axiosPost ({ url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}, complete=()=>{} }) {
      url = status ? url.replace(/\/api/, '') : url;
      this.$axios
        .post(url, data)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
          complete(d);
        })
        .catch(error=>{catchFunc(error); complete(error);});
    },
    axiosPut ({ url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$message({message: '网络错误', type: 'error'})}, complete=()=>{} }) {
      url = status ? url.replace(/\/api/, '') : url;
      this.$axios
        .put(url, data)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
          complete(d);
        })
        .catch((d)=>{catchFunc(d); complete(d)});
    },
    axiosDelete({ url='', data={}, success=()=>{}, error=d=>{this.$alert(d.info)}, catchFunc=err=>{console.log(err); this.$alert('网络错误');} }) {
      url = status ? url.replace(/\/api/, '') : url;
      this.$axios
        .delete(url, { params: data })
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    }
  }
}