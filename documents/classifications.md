# 1、分类列表
requestUrl=http://www.zhiq.wang/classifications;  
method=GET;  
request {
    id:"根节点ID" ,//可选
}

response {
    status:1,
    info:"信息提示",
    data:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//分类ID
            name:"name",//分类姓名
			parent:"父节点ID",//证件号码
			description:"分类描述",
			
        }]
    }
}


# 2、新建分类
requestUrl=http://www.zhiq.wang/classifications;  
method=POST;    
request {
    name:"name",//分类名称
    parent:"父节点ID",//顶级节点取0
    description:"分类描述",//分类描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"分类ID",//
		name:"name",//分类姓名
		description:"分类描述",
		parent:"父节点ID",
	}
}  

# 3、更新分类
requestUrl=http://www.zhiq.wang/classifications/:id;  
method=PUT;    
request {
    name:"name",//分类名称
    description:"分类描述",//分类描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"分类ID",//
		name:"name",//分类姓名
		description:"分类描述",
		parent:"父节点ID",
	}
}  

# 4、获取分类详情
requestUrl=http://www.zhiq.wang/classifications/:id;  
method=GET;    

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"分类ID",//
		name:"name",//分类姓名
		description:"分类描述",
		parent:"父节点ID",
		level:"分类层级",
		projects_count:"分类下的案件数量"
	}
}  

# 5、删除指定分类
requestUrl=http://www.zhiq.wang/classifications/:id;  
method=DELETE;   
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  