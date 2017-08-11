# 1、新增用户组
requestUrl:http://www.zhiq.wang/groups;
method：POST;
request {
    name:"用户组名称",
	description:"用户组描述"
	rules:[1,2],//用户组拥有的权限 
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新用户组
requestUrl:http://www.zhiq.wang/groups/:id;  
method：PUT;
request {
    name:"用户组名称",
	description:"用户组描述",
	rules:[1,2],//用户组拥有的权限 
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、删除用户组
requestUrl:http://www.zhiq.wang/groups/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 4、用户组详情
requestUrl:http://www.zhiq.wang/groups/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    group:{ //status为1时才出现
        id:"id",
		name:"name",
		description:"description",
		rules:[{
			id:1,
			parent:"parent",
			title:"节点标题",
			checked:"1",//1表示当前用户组具有该节点权限，0表示没有权限
			children:[],//子节点
		}]
    }
}

# 5、用户组列表
requestUrl:http://www.zhiq.wang/groups;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20

    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：标题、案号、申请号、公开号、公告号
	
    sort:"field-order",//field表示字段，取值为 order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    groups:{
        current_page:"1",//当前页码
		last_page:"2",//最后页码
		per_page:"20",//每页数量 
		total:"记录总数",
		data:[{
			name:"name",
			description:"description"
		}],
    }
}

# 6、向用户组中增加用户
requestUrl:http://www.zhiq.wang/groups/:id/members;
method：PUT;
request {
    ids:[1,2]
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 7、从用户组中移除用户
requestUrl:http://www.zhiq.wang/groups/:id/memebers;
method：DELETE;
request {
    ids:[1,2]
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}




						



