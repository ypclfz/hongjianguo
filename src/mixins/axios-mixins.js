export default {
  methods: {
  	axiosGet ({url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}}) {
      this.$axios
        .get(url, { params: data })
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    },
    axiosPost ({ url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')} }) {
      this.$axios
        .post(url, data)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    },
    axiosPut ({ url='', data={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')} }) {
      this.$axios
        .put(url, data)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
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