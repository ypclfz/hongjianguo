export default {
  methods: {
  	axiosGet ({url='', params={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')}}) {
      this.$axios
        .get(url, { params })
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    },
    axiosPost ({ url='', query={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')} }) {
      this.$axios
        .post(url, query)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    },
    axiosPut ({ url='', query={}, success=()=>{}, error=(d)=>{this.$alert(d.info)}, catchFunc=(err)=>{console.log(err); this.$alert('网络错误')} }) {
      this.$axios
        .put(url, query)
        .then(response=>{
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    }
  }
}