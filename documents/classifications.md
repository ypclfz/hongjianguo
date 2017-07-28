# 1、部门列表
requestUrl=http://www.zhiq.wang/branches;  
method=GET;  
request {
    id:"根节点ID"
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
            id:"1",//部门ID
            name:"name",//部门姓名
			parent:"父节点ID",//证件号码
			description:"部门描述",
        }]
    }
}


# 2、新建部门
requestUrl=http://www.zhiq.wang/branches;  
method=POST;    
request {
    name:"name",//部门名称
    parent:"父节点ID",//顶级节点取0
    description:"部门描述",//部门描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"部门ID",//
		name:"name",//部门姓名
		description:"部门描述",
		parent:"父节点ID",
	}
}  

# 3、更新部门
requestUrl=http://www.zhiq.wang/branches/:id;  
method=PUT;    
request {
    name:"name",//部门名称
    description:"部门描述",//部门描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"部门ID",//
		name:"name",//部门姓名
		description:"部门描述",
		parent:"父节点ID",
	}
}  

# 4、获取部门详情
requestUrl=http://www.zhiq.wang/branches/:id;  
method=GET;    

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"部门ID",//
		name:"name",//部门姓名
		description:"部门描述",
		parent:"父节点ID",
	}
}  

# 5、删除指定部门
requestUrl=http://www.zhiq.wang/branches/:id;  
method=DELETE;   
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  