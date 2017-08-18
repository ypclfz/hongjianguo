# 1、代理机构列表
requestUrl:http://www.zhiq.wang/agencies;
method：GET;
request {
	agency_id:"代理机构ID"
}
response {
    status:1,
    info:"信息提示",
    members[{
		label:"代理人名称",
		value:"代理人ID"
	}]
}


