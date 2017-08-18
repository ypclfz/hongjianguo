# 1、任务类型
requestUrl:http://www.zhiq.wang/taskDefs;
method：GET;
request {
	category:"案件类型"
}
response {
    status:1,
    info:"信息提示",
    members[{
		label:"代理人名称",
		value:"代理人ID",
		category:"案件类型",
		flow_id:"流程ID"
	}]
}


