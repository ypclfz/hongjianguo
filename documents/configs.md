# 1、配置列表
requestUrl:http://www.zhiq.wang/configs;
method：GET;

response {
    status:1,
    info:"信息提示",
    configs[{
		name:"分组名称",
		configs:[{
			name:"设置名称",
			value:"设置值",
			sort:"排序",
			description:"配置描述"
		}]
	}]
}

# 2、保存配置
requestUrl:http://www.zhiq.wang/configs;
method：POST;
request {
	name:value,//name即为列表接口中为name,value为用户输入的值
}

