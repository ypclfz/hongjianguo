# 1、文件上传
接口URL:http://www.zhiq.wang/file/upload;  
接口调用方式：post; 
返回值: json {"status":1,"file":{"id":7,"name":"2455-01.jpg","savename":"0d904891719bad13c33c4f90dcbc4992.jpg","savepath":"20170623\/","ext":"jpg","mime":"image\/jpeg","size":"37KB","md5":"f1e6c4ceedb1ced9ec0113795304c9d1","sha1":"e4aab57d53e611cac9d04b5e35474e131a601137","location":0,"create_time":"2017-06-23 11:05:12","userspace":0,"id":1,"url":"\/public\/uploads\/20170623\/0d904891719bad13c33c4f90dcbc4992.jpg","downloadUrl":"\/file\/download\/id\/7","uploadUser":"红坚果"}}

# 2、文件下载
接口URL http://www.zhiq.wang/file/download  
附加参数  
@param integer id 文件ID  
@param integer pid(可选） 提案或专利ID  

# 3、文件删除
接口URL http://www.zhiq.wang/file/delete  
附加参数  
@param integer/array[integer] id 文件ID或ID数组  

