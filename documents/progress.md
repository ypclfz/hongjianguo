# 1、获取案件当前状态列表
requestUrl:http://www.zhiq.wang/progress;  
method：GET; 
request {
	category:"案件类型", 1-4
}
response {
    status:1,
    progress:[{
		label:"标签",
		value:"值"
	}]
}
