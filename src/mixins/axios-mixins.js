const complete_default = function () {};

export default {
  methods: {
  	axiosGet ({url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}}, complete=()=>{}) {
      this.$axios
        .get(url, { params: data })
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
          complete(d);
        })
        .catch(error=>{catchFunc(error); complete(error);});
    },
    axiosPost ({ url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}, complete=()=>{} }) {
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