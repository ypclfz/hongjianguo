# 1、产品列表
requestUrl=http://www.zhiq.wang/products;  
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
            id:"1",//产品ID
            name:"name",//产品姓名
			parent:"父节点ID",//证件号码
			description:"产品描述",
        }]
    }
}

# 2、新建产品
requestUrl=http://www.zhiq.wang/products;  
method=POST;    
request {
    name:"name",//产品名称
    parent:"父节点ID",//顶级节点取0
    description:"产品描述",//产品描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"产品ID",//
		name:"name",//产品姓名
		description:"产品描述",
		parent:"父节点ID",
	}
}  

# 3、更新产品
requestUrl=http://www.zhiq.wang/products/:id;  
method=PUT;    
request {
    name:"name",//产品名称
    description:"产品描述",//产品描述
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"产品ID",//
		name:"name",//产品姓名
		description:"产品描述",
		parent:"父节点ID",
	}
}  

# 4、获取产品详情
requestUrl=http://www.zhiq.wang/products/:id;  
method=GET;    

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	Branch:{
		id:"产品ID",//
		name:"name",//产品姓名
		description:"产品描述",
		parent:"父节点ID",
		level:"分类层级",
		projects_count:"分类下的案件数量"
	}
}  

# 5、删除指定产品
requestUrl=http://www.zhiq.wang/products/:id;  
method=DELETE;   
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  